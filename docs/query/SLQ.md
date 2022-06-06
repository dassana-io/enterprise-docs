# SLQ

**SLQ** (/slick/; **Structured Log Query**) is a SQL like language to query hierarchically structured records (documents). We only support the `SELECT` operation as data insertion is managed by [Apps](../app-store/apps)

## Reference

Since we support Arrays which is universally represented by `[]`, we use `{}` for metasymbols in our grammar to represent logical blocks. `{}?` represents an optional element and `{ | }` represents the a logical OR between sub-elements.

```sql
query
    : WITH cte {, cte}*
      { select_query | set_operation }

cte
    : alias AS ( query )

set_operation:
    ( query )
    { UNION { ALL | DISTINCT } | INTERSECT | EXCEPT } ( query )
    { { UNION { ALL | DISTINCT } | INTERSECT | EXCEPT } ( query ) }*

select_query:
    SELECT { * | {DISTINCT}? expr {AS}? alias }
    FROM { schema_expr | join_expr }
    { WHERE predicate_expr }?
    { GROUP BY expr {, expr}* }?
    { HAVING expr }?
    { ORDER BY expr {, expr}* }?
    { LIMIT integer }?

schema_expr
    : app_id
    | multi_schema_exp
    | ( query ) {AS}? alias

multi_schema_exp
    : { ALL | * }
    | [ app_id {, app_id}+ ]

join_expr:
    { {INNER}? JOIN schema_expr | { FULL | LEFT | RIGHT } {OUTER}? JOIN schema_expr } { USING field_expr | ON predicate_expr }

expr
    : literal | array | tuple
    | field_reference
    | function_expr
    | meta_references
    | ( query )
    | ( expr {, expr}* )
    | { + | - } expr
    | expr { + | - | * | / | % } expr
    | expr || expr
    | NOT expr
    | expr { AND | OR } expr
    | ( expr )

literal:
    string | boolean | integer | decimal

array:
    array[literal {, literal}*]

tuple:
    (literal {, literal}*)

field_reference:
    {table_reference:}?field_part{.field_part}*

field_part:
  { identifier | "string" }{array_index}?

string: [a-zA-Z0-9_]+

array_index:
    [{*|positive_integer}]

function:
    function_name({ * | {{DISTINCT}? function_arg {, function_arg}? }})

function_arg
    : literal
    | field_reference
    | function
    | $

predicate_expr
    : expr { = | { != | <> } | < | <= | > | => } expr
    | expr BETWEEN expr AND expr
    | expr IN (expr {, expr}*)
    | expr IN (query)
    | expr { LIKE | ILIKE } like_pattern
    | expr MATCHES regex_pattern
    | expr IS NOT NULL
    | array_predicates
    | doc_predicates
    | expr { AND | OR } expr
    | NOT expr
    | ( expr )

array_predicates
    : ARRAY field_reference { = | { != | <> } } array
    | ARRAY field_reference CONTAINS { ANY | ALL | NONE } { = | { != | <> } | < | <= | > | => } expr
    | ARRAY field_reference CONTAINS { ANY | ALL | NONE } ( predicate_expr )

doc_predicates
    : { DOC | $ } CONTAINS string
    | { DOC | $ } CONTAINS (string {, string}*)
    | { DOC | $ } { LIKE | ILIKE } like_pattern
```

## Schema

Schema is table reference in Dassana. It can either be an actual reference to the App (by app_id) or a virtual reference to an alias.

### Multi-Schema Support

SLQ unlike regular SQL allows searching multiple schemas as the same time. This is done by either using the `ALL` keyword (shorthand: `*`) reference or by providing an array of `app_id`.

Limitations:
1. Only Meta References and Normalized Fields are allowed. Normalized fields restricts apply as usual.
2. Functions only allows Meta References or Literals as args. Regular fields are not allowed.

## Literal

SLQ supports the String, Integer, Boolean and Decimal literal data types along with Arrays. Literals can also be used in Tuples for `IN` predicate.

Note: All elements in an Array must be of same type.

## Identifier

Identifiers are simple alphanumeric strings which are used as for most of the reference names.

`app_id` and `alias` use identifier pattern.

Pattern: `[a-zA-Z0-9_]+`

## Functions

The list of available function is available [here](./functions).

## Meta References

### Schema Reference

`$schema` and `$app` are references to the meta-column for the document's schema/app_id. It is useful for multi-schema queries.

Examples:

```sql
select $schema, count() from * group by $schema order by count_1 desc
```

```sql
select $schema from [aws_cloudtrail, aws_vpc_flow] where $ip = '1.1.1.1' order by $schema
```

### Time Reference

`$time` is a reference to the meta-column for timestamp associated with the document. The value depends on the App configuration and can either be the time the document was received by Dassana or extracted from within the document as per the configuration. It is useful when the document itself doesn't have a timestamp and queries requires an access to the time.

Examples:

```sql
select to_month(to_date($time)) as month, count() from netflow1 x group by month
```

### Document Reference

`$` is a reference to the meta-column for the JSON raw document as string. It is used in [Document Predicates](#document-predicates) and [JSON functions](./functions#json-functions).

Example:

```sql
select * from * where $ contains 'search-me'
```

```sql
json_query($, '$.path.to.key')
```

## Field Reference

Field references are similar column references and are used to reference fields in the document. Hierarchical fields are separated by period (.), which is the commonly used separator for nested elements.

Field references can be used almost anywhere an expression `expr` is allowed.

SQL difference: Table references are seperated by a colon ':' instead of period '.' to allow the SLQ parser to distinguish it from hierarchical separator.

References to JSON Objects are not allowed, only terminal primitive type or array is allowed. Also, fields nested withing Array of Objects cannot be selected, but can be predicated upon using [ARRAY predicates](#array-predicates)

Note: Currently `array_index` is only supported for the last `field_part`.

## Limitations

1. operands utilizing `field_reference` does not pre-validate data type, therefore it is possible that an operation may fail at execution time due to mismatched data type between the operands causing a query failure.
2. `IS NOT NULL` only allows `field_reference`
3. All queries have a limit of 100 documents.
4. All sub-queries (excpet `ARRAY CONTAINS ()`) has a limit of 1M documents.
