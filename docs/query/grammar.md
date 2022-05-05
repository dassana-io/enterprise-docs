# Grammar

```sql
SELECT [ * | [DISTINCT] [key | function] [AS alias], ... ]
  FROM schemaId [AS alias]
[WHERE expr ]
[GROUP BY key, ...]
[ORDER BY key [ASC | DESC], ...]
[OFFSET num]
[LIMIT num]

Where,

expr:
  can be one of
    key [ = | != | < | <= | > | >= ] literal
    key [NOT] BETWEEN literal AND literal
    key [NOT] IN (literal, ...)
    key [NOT] [LIKE | ILIKE] pattern
    key [NOT] [MATCHES] regexPattern
    key [NOT] IN ( query )
    key IS [NOT] NULL
    ARRAY key = ARRAY[literal, ...]
    ARRAY key CONTAINS [ANY | ALL | NONE] [ = | != | < | <= | > | >= ] literal
    ARRAY key CONTAINS [ANY | NONE] ( expr )
    expr [ AND | OR ] expr
    NOT expr
    ( expr )

function:
  function([* | arguments, ...])
    where arguments can be either a key, a literal or another function call
    special document argument is $, example JSON_QUERY($, '$.eventName'), where the JSONPath will be queried on the entire document
```
