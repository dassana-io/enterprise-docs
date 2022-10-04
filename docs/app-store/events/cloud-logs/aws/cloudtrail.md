# CloudTrail Reference

CloudTrail logs contain information about actions taken by a user, role, or an AWS service and serve as the primary audit trail for everything in your AWS environment. You can find sample CloudTrail logs and queries in this document.

## Log Example

```json
{
    "eventVersion": "1.08",
    "userIdentity": {
        "type": "AssumedRole",
        "principalId": "ABOACZ234456789LGHJ78T0:example@dassana.io",
        "arn": "arn:aws:sts::123456789012:assumed-role/AWSReservedSSO_AdministratorAccess_a789bc4104839g01/example@dassana.io",
        "accountId": "123456789012",
        "accessKeyId": "ABCD123456789",
        "sessionContext": {
            "sessionIssuer": {
                "type": "Role",
                "principalId": "A47RAAT6LXBTBVLN3LZO2",
                "arn": "arn:aws:iam::123456789012:role/aws-reserved/sso.amazonaws.com/us-west-2/AWSReservedSSO_AdministratorAccess_a789bc4104839g01",
                "accountId": "123456789012",
                "userName": "AWSReservedSSO_AdministratorAccess_a789bc4104839g01"
            },
            "webIdFederationData": {},
            "attributes": {
                "creationDate": "2021-12-27T05:18:50Z",
                "mfaAuthenticated": "false"
            }
        }
    },
    "eventTime": "2021-12-27T05:28:34Z",
    "eventSource": "lambda.amazonaws.com",
    "eventName": "ListFunctions20150331",
    "awsRegion": "eu-central-1",
    "sourceIPAddress": "xx.xx.xxx.xxx",
    "userAgent": "console.amazonaws.com",
    "requestParameters": null,
    "responseElements": null,
    "requestID": "bc112dc0-de25-47bf-b286-ee4bbf43f42f",
    "eventID": "dec5350e-892d-44a7-b6d2-f5e8c613fd4c",
    "readOnly": true,
    "eventType": "AwsApiCall",
    "managementEvent": true,
    "recipientAccountId": "123456789012",
    "eventCategory": "Management"
}
```

## Log Schema

View [AWS's Documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html) for all CloudTrail log fields.
