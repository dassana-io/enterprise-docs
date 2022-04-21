# Sample Queries

## Basic Filter
```json title="Data"
{
    "userIdentity": {
        "accessKeyId": "123456789",
    },
    "eventSource": "ec2.amazonaws.com",
}
```

```sql title="Query"
select eventSource from aws_cloudtrail where userIdentity.accessKeyId = 'EXAMPLE_KEY_ID'
```

```csv title="Result"
| Time | eventSource       |
|------|-------------------|
| ...  | ec2.amazonaws.com |
```

## Order by
```json title="Data"
{
    "eventSource": "ec2.amazonaws.com",
    "eventName": "AuthorizeSecurityGroupIngress",
}
{
    "eventSource": "ec2.amazonaws.com",
    "eventName": "StartInstances",
}
```

```sql title="Query"
select eventSource, eventName from aws_cloudtrail order by eventName desc
```

```csv title="Result"
| Time | eventSource       | eventName                     |
|------|-------------------|-------------------------------|
| ...  | ec2.amazonaws.com | StartInstances                |
| ...  | ec2.amazonaws.com | AuthorizeSecurityGroupIngress |
```

## Count + In
```json title="Data"
{
    "eventSource": "ec2.amazonaws.com",
    "eventName": "AuthorizeSecurityGroupIngress",
}
{
    "eventSource": "s3.amazonaws.com",
    "eventName": "PutObject",
}
{
    "eventSource": "sts.amazonaws.com",
    "eventName": "AssumeRole",
}
```

```sql title="Query"
select count(*) AS c from aws_cloudtrail where eventSource in ('ec2.amazonaws.com', 'iam.amazonaws.com')
```

```csv title="Result"
| c   |
|-----|
| 2   |
```

## Group By + Distinct Count
```json title="Data"
{
    "userIdentity": {
        "userName": "Kaushik",
    },
    "eventSource": "ec2.amazonaws.com",
}
{
    "userIdentity": {
        "userName": "Kaushik",
    },
    "eventSource": "ec2.amazonaws.com",
}
{
    "userIdentity": {
        "userName": "Jun",
    },
    "eventSource": "ec2.amazonaws.com",
}
{
    "userIdentity": {
        "userName": "Jun",
    },
    "eventSource": "s3.amazonaws.com",
}
```

```sql title="Query"
select userIdentity.userName, count(distinct eventSource) as c from aws_cloudtrail ct1 group by userIdentity.userName
```

```csv title="Result"
| userIdentity.userName | c |
|-----------------------|---|
| Kaushik               | 1 |
| Jun                   | 2 |
```

## Subquery Filter
```json title="Data in aws_cloudtrail"
{
    "userIdentity": {
        "accessKeyId": "EXAMPLE_KEY_ID"
    },
    "eventName": "GetObject",
}
{
    "userIdentity": {
        "accessKeyId": "DIFFERENT_KEY_ID"
    },
    "eventName": "RunInstances",
}
```
```json title="Data in other_data"
{
    "userIdentity": {
        "accessKeyId": "EXAMPLE_KEY_ID",
        "userName": "Milo"
    }
}
{
    "userIdentity": {
        "accessKeyId": "DIFFERENT_KEY_ID",
        "userName": "Ollie"
    }
}
```

```sql title="Query"
select eventName 
from aws_cloudtrail 
where userIdentity.accessKeyId in (select userIdentity.accessKeyId from other_data where userName = 'Milo')
```

```csv title="Result"
| Time | eventName |
|------|-----------|
| ...  | GetObject |
```
## Select JSON Nested Array Path
```json title="Data"
{
	"requestParameters": {
		"ipPermissions": {
			"items": [
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "0.0.0.0/0"
							}
						]
					},
					"toPort": 500
				},
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "0.0.0.0/0"
							}
						]
					},
					"toPort": 800
				}
			]
		}
	},
	"eventName": "AuthorizeSecurityGroupIngress"
}
```

```sql title="Query"
select JSON_QUERY($,'$.requestParameters.ipPermissions.items[*].toPort') as toPorts, 
JSON_QUERY($,'$.requestParameters.ipPermissions.items[*].ipRanges.items[*].cidrIp') as cidrIPs 
from aws_cloudtrail 
where eventName = 'AuthorizeSecurityGroupIngress'
```

```csv title="Result"
| Time | toPorts    | cidrIps                    |
|------|------------|----------------------------|
| ...  | [500, 800] | ["0.0.0.0/0", "0.0.0.0/0"] |
```

## Filter JSON Array
```json title="Data"
{
	"requestParameters": {
		"groupId": "sg-0b128b58ba5cfd7fd",
		"ipPermissions": {
			"items": [
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "0.0.0.0/0"
							}
						]
					}
	            }
            ]
        }
    }
}
```

```sql title="Query"
select requestParameters.groupId as sg 
from aws_cloudtrail 
where JSON_VALUE($,'$.requestParameters.ipPermissions.items[*].ipRanges.items[*].cidrIp') = '0.0.0.0/0'
```

```csv title="Result"
| Time | sg                   |
|------|----------------------|
| ...  | sg-0b128b58ba5cfd7fd |
```

## Filter Array All
In the following examples, we are looking for data that contains an array at the specified path, in which the specified operator returns true when applied to each element of the array.
```json title="Data Primitive"
{
    "user": "Bob",
    "abc": {
        "items": [4, 5, 6]
    }
}
{
    "user": "Alice",
    "abc": {
        "items": [2, 3, 4]
    }
}
```

```sql title="Query Primitive"
select user
from test_data
where array abc.items contains all < 3
```

```csv title="Result Primitive"
| Time | user |
|------|------|
| ...  | Bob  |
```

```json title="Data Object"
{
    "user": "Bob",
    "abc": {
        "items": [{"foo": 4}, {"foo": 5}]
    }
}
{
    "user": "Alice",
    "abc": {
        "items": [{"foo": 2}, {"bar": 3}]
    }
}
```

```sql title="Query Object"
select user
from test_data
where array abc.items contains all (foo > 3)
```

```csv title="Result Object"
| Time | user |
|------|------|
| ...  | Bob  |
```

## Filter Array Exact

In the following examples, we are looking for data that contains an array at the specified path equivalent to the array specified in the query.
```json title="Data"
{
    "user": "Bob",
    "abc": {
        "items": [4, 5, 6]
    }
}
{
    "user": "Alice",
    "abc": {
        "items": [2, 3, 4]
    }
}
```

```sql title="Query"
select user
from test_data
where array abc.items = [2, 3, 4]
```

```csv title="Result"
| Time | user   |
|------|--------|
| ...  | Alice  |
```

## Filter Array Any

In the following examples, we are looking for data that contains an array at the specified path equivalent to the array specified in the query.
```json title="Data Primitive"
{
    "user": "Bob",
    "abc": {
        "items": [4, 5, 6]
    }
}
{
    "user": "Alice",
    "abc": {
        "items": [2, 3, 4]
    }
}
```

```sql title="Query Primitive"
select user
from test_data
where array abc.items contains any < 2
```

```csv title="Result Primitive"
| Time | user   |
|------|--------|
| ...  | Bob    |
| ...  | Alice  |
```

```json title="Data Object"
{
    "user": "Bob",
    "abc": {
        "items": [{"foo": 2}, {"bar": 3}]
    }
}
{
    "user": "Alice",
    "abc": {
        "items": [{"foo": 2}, {"bar": 3}]
    }
}
```

```sql title="Query Object"
select user
from test_data
where array abc.items contains any (foo > 2)
```

```csv title="Result Object"
| Time | user   |
|------|--------|
| ...  | Bob    |
| ...  | Alice  |
```

## Filter Array None 
```json title="Data"
{
	"requestParameters": {
        "groupId": "sg-example-1",
		"ipPermissions": {
			"items": [
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "0.0.0.0/0"
							}
						]
					},
					"toPort": 8080
				},
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "1.1.1.1/24"
							}
						]
					},
					"toPort": 9000
				}
			]
		}
	},
	"eventName": "AuthorizeSecurityGroupIngress"
}
{
	"requestParameters": {
        "groupId": "sg-example-2",
		"ipPermissions": {
			"items": [
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "8.8.8.8/24"
							}
						]
					},
					"toPort": 8080
				},
				{
					"ipRanges": {
						"items": [
							{
								"cidrIp": "8.8.8.8/24"
							}
						]
					},
					"toPort": 8123
				}
			]
		}
	},
	"eventName": "AuthorizeSecurityGroupIngress"
}
```

```sql title="Query"
select requestParameters.groupId as sg
from aws_cloudtrail
where array requestParameters.ipPermissions.items contains none (
    toPort = 8080
    and array ipRanges.items contains any (cidrIp = '0.0.0.0/0')
)
```

```csv title="Results"
| Time | sg                   |
|------|----------------------|
| ...  | sg-example-2         |
```
