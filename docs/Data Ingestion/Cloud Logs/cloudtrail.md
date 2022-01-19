---
sidebar_position: 2
---

# AWS Cloudtrail

Cloudtrail logs contain information about actions taken by a user, role, or an AWS service and serve as the primary audit trail for everything in your AWS environment. In this guide, we'll learn how to deploy Dassana's AWS Cloudtrail app.

:::note Prerequisite
Your Cloudtrail logs must be published to an S3 Bucket. Follow [this guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html) if you haven't already.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams Cloudtrail logs from your S3 bucket to the Cloud Log Lake.

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://dassana-native-apps.s3.amazonaws.com/cloudtrail-s3/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the [Cloudtrail App ID](https://console.dassana.dev/appStore/app/aws_cloudtrail) from the Dassana App Store
  - Dassana Endpoint: https://dassana.io/ingest (default)
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID of CloudtrailApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "CloudtrailApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your ALB logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function like this
![S3 Trigger Enabled](/img/cloudtrail-s3/s3-trigger-enabled-cloudtrail.png)

## Conclusion
Congrats! You've successfully deployed the Dassana Cloudtrail app. Now, your Cloudtrail logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.io) next to discover useful queries for Cloudtrail logs.

## Log Example
```json
{
   "eventVersion":"1.08",
   "userIdentity":{
      "type":"AssumedRole",
      "principalId":"ABOACZ234456789LGHJ78T0:example@dassana.io",
      "arn":"arn:aws:sts::123456789012:assumed-role/AWSReservedSSO_AdministratorAccess_a789bc4104839g01/example@dassana.io",
      "accountId":"123456789012",
      "accessKeyId":"ABCD123456789",
      "sessionContext":{
         "sessionIssuer":{
            "type":"Role",
            "principalId":"A47RAAT6LXBTBVLN3LZO2",
            "arn":"arn:aws:iam::123456789012:role/aws-reserved/sso.amazonaws.com/us-west-2/AWSReservedSSO_AdministratorAccess_a789bc4104839g01",
            "accountId":"123456789012",
            "userName":"AWSReservedSSO_AdministratorAccess_a789bc4104839g01"
         },
         "webIdFederationData":{
            
         },
         "attributes":{
            "creationDate":"2021-12-27T05:18:50Z",
            "mfaAuthenticated":"false"
         }
      }
   },
   "eventTime":"2021-12-27T05:28:34Z",
   "eventSource":"lambda.amazonaws.com",
   "eventName":"ListFunctions20150331",
   "awsRegion":"eu-central-1",
   "sourceIPAddress":"xx.xx.xxx.xxx",
   "userAgent":"console.amazonaws.com",
   "requestParameters":null,
   "responseElements":null,
   "requestID":"bc112dc0-de25-47bf-b286-ee4bbf43f42f",
   "eventID":"dec5350e-892d-44a7-b6d2-f5e8c613fd4c",
   "readOnly":true,
   "eventType":"AwsApiCall",
   "managementEvent":true,
   "recipientAccountId":"123456789012",
   "eventCategory":"Management"
}
```

## Log Schema 
View [AWS's Documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html) for all Cloudtrail log fields.
