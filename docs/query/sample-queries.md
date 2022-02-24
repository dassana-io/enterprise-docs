# Sample Queries

## Default SQL
```sql title="Basic Filter"
select eventSource from aws_aws_cloudtrail where userIdentity.accessKeyId = 'EXAMPLE_KEY_ID'
```

```sql title="Order By"
select eventSource, eventName from aws_aws_cloudtrail order by eventName desc
```

```sql title="Count + In"
select count(*) AS c from aws_cloudtrail where eventSource in ('ec2.amazonaws.com', 'iam.amazonaws.com')
```

```sql title="Group By + Distinct Count"
select userIdentity.userName, count(distinct eventSource) as c from aws_cloudtrail ct1 group by userIdentity.userName
```

```sql title="Subquery Filter"
select eventName from aws_cloudtrail ct1 where eventSource in (select eventSource from aws_cloudtrail ct2 where userIdentity.accessKeyId = 'EXAMPLE_KEY_ID')
```

```sql title="JSON path"
SELECT requestParameters.ipPermissions.items[*].toPort, requestParameters.ipPermissions.items[*].ipRanges.items[*].cidrIp
    FROM aws_cloudtrail
    WHERE eventName = 'AuthorizeSecurityGroupIngress'
```

## Custom SQL

We added some powerups to make certain operations super easy for you to do!

### Array

```sql
SELECT eventName, requestParameters.groupId
    FROM aws_cloudtrail ct1
    WHERE ARRAY abc.xyz.items CONTAINS ALL < 3
```

```sql
SELECT eventName, requestParameters.groupId
    FROM aws_cloudtrail ct1
    WHERE ARRAY abc.xyz.items = ARRAY[1,2,3]
```

```sql 
SELECT requestParameters.groupId
    FROM aws_cloudtrail ct1
    WHERE ARRAY requestParameters.ipPermissions.items CONTAINS NONE (
        fromPort = 3306
        AND toPort = 3306
        AND ARRAY ipRanges.items CONTAINS ANY (cidrIp = '0.0.0.0/0')
    )
```

### Functions

#### `JSON_QUERY`
Returns the raw json-path extracted JSON representation, so even a singular value like $.eventVersion will be returned as ["1.08"]

```sql
SELECT JSON_QUERY($, '$.eventVersion') FROM aws_cloudtrail
```

#### `JSON_VALUE`
Returns the parsed value, here $.eventVersion will be returned as 1.08. Note this will only return primitives and not JSON Objects or Arrays.

```sql
SELECT JSON_VALUE($, '$.eventVersion') FROM aws_cloudtrail
```

#### `JSON_EXISTS`
Returns 1 (true) or 0 (false) if the path exists

```sql
SELECT JSON_EXISTS($, '$.requestParameters.ipPermissions.items[*].toPort') FROM aws_cloudtrail
```