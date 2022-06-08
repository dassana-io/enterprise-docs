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

## Limitations

1. operands utilizing `field_reference` does not pre-validate data type, therefore it is possible that an operation may fail at execution time due to mismatched data type between the operands causing a query failure.
2. `IS NOT NULL` only allows `field_reference`
3. All queries have a limit of 100 documents.
4. All sub-queries (excpet `ARRAY CONTAINS ()`) has a limit of 1M documents.

## Schema

Schema is table reference in Dassana. It can either be an actual reference to the App (by app_id) or a virtual reference to an alias.

### Multi-Schema Support

SLQ unlike regular SQL allows searching multiple schemas as the same time. This is done by either using the `ALL` keyword (shorthand: `*`) reference or by providing an array of `app_id`.

Limitations:
1. Only Meta References and Normalized Fields are allowed. Normalized fields restrictions apply as usual.
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

`$` is a reference to the meta-column for the JSON raw document as string. It is only allowed in [JSON functions](./functions#json-functions). Additionally there are [Document Predicates](#document-predicates) which allow free-text like searches on the entire document.

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

## Document Predicates

Document predicate allows free-text like searches on the raw document content.

### DOC CONTAINS

`CONTAINS` predicate returns documents which contains any of the input strings. The search strings must be minimum 3 characters long.

Full Syntax: `DOC CONTAINS ANY ('string', 'string')`

`$` can be used as a shorthand for `DOC` and `ANY` is optional.

Examples:
```sql
DOC CONTAINS 'abc'

$ contains 'abc'

$ contains ('abc', 'xyz')
```

### DOC LIKE/ILIKE

`LIKE` (`ILIKE` for case-insensitive) predicate allows like patten matching search on the raw document content. The pattern must have minimum of 3 non-wildcard characters.

Full Syntax: `DOC [I]LIKE '%patten%'`

`$` can be used as a shorthand for `DOC`. `ILIKE` for case-insentitive search.

Examples:
```sql
DOC LIKE '%ABC?xyz%'

$ like '%ABC?xyz%'

$ ilike '%abc?xyz%'
```

## Array Predicates

Array predicates allows searching documents based on the contents of one of the arrays.

### Array Equality

Equality test for arrays.

This predicate can only be used for a terminal fields whose value is of type Array.

```sql
Document: { "my": { "array": [ "a", "b", "c" ] } }

ARRAY my.array = [ 'a', 'b', 'c' ]  -- TRUE

ARRAY my.array != [ 'a', 'b', 'c' ]  -- FALSE

ARRAY my.array = [ 'b', 'c' ]  -- FALSE
```

### Array Contains Value

Using this predicate elements of an Array can be tested individually against and operator and value operand. The predicate also allows for testing if any, all or none of the elements match the condition.

This predicate can only be used for a terminal fields whose value is of type Array.

Full Syntax:
```sql
ARRAY field_expr CONTAINS quantifier operator value

quantifier: { ANY | ALL | NONE }
operator: { = | { != | <> } | < | <= | > | => }
```

```sql
Document: { "my": { "a1": [ "a", "b", "c" ], "a2": [ "y", "y" ], "a3": [ 1, 2 ] } }

ARRAY my.a1 CONTAINS ANY = 'a'  -- TRUE
ARRAY my.a1 CONTAINS ALL = 'a' -- FALSE
ARRAY my.a1 CONTAINS NONE = 'z' -- TRUE
ARRAY my.a1 CONTAINS ANY = 'z'  -- FALSE

ARRAY my.a2 CONTAINS ANY = 'y' -- TRUE
ARRAY my.a2 CONTAINS ALL = 'y' -- TRUE
ARRAY my.a2 CONTAINS NONE = 'y' -- FALSE

ARRAY my.a3 CONTAINS ANY < 2 -- TRUE
ARRAY my.a3 CONTAINS ALL < 2 -- FALSE
ARRAY my.a3 CONTAINS ALL <= 2 -- TRUE
```

### Array sub-query

Using this predicate object elements of an Array can be tested individually against a subquery which allows for predicates restricted to object child elements. The predicate also allows for testing if any, all or none of the elements match the condition.

This predicate can only be used for a non-terminal fields whose value is of type Array and have elements of type Object.

`predicate_expr` subquery supports all predicates expressions except for `doc_predicates`.

Full Syntax:
```sql
ARRAY field_expr CONTAINS quantifier ( predicate_expr )

quantifier: { ANY | ALL | NONE }
operator: { = | { != | <> } | < | <= | > | => }
```

```sql
Document: { "arr": [ { "c1": "a", "c2": 1 }, { "c1": "b", "c2": 2 }, { "c1": "a", "c2": 3 } ] }

ARRAY arr CONTAINS ANY ( c1 = 'a' AND c2 = 1 )  -- TRUE
ARRAY arr CONTAINS ANY ( c1 = 'a' AND c2 = 2 )  -- FALSE
ARRAY arr CONTAINS ANY ( c1 = 'a' AND c2 IN (1, 3) )  -- TRUE

ARRAY arr CONTAINS ANY ( c1 = 'b' AND c2 = 2 )  -- TRUE
ARRAY arr CONTAINS ANY ( c1 = 'b' AND c2 IN (1, 3) )  -- FALSE
ARRAY arr CONTAINS ANY ( c1 = 'b' AND c2 IN (1, 2, 3) )  -- TRUE

ARRAY arr CONTAINS ALL ( c2 <= 3 )  -- TRUE
ARRAY arr CONTAINS ALL ( c1 = 'a' )  -- FALSE

ARRAY arr CONTAINS NONE ( c2 < 1 )  -- TRUE
ARRAY arr CONTAINS NONE ( c2 = 1 )  -- FALSE
```