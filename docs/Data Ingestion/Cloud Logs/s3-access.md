---
sidebar_position: 3
---

# AWS S3 Access

S3 Access logs contains information on S3 bucket requests useful for security and cost analysis. In this guide, we'll learn how to deploy Dassana's S3 Access app.

:::note Prerequisite
Your S3 Access logs must be published to an S3 Bucket. Follow [this guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-logging) if you haven't already.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams S3 Access logs from your S3 bucket to the Cloud Log Lake.

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-apps.s3.amazonaws.com/s3-access/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the [S3 Access App ID](https://console.dassana.dev/appStore/app/aws_cloudtrail) from the Dassana App Store
  - Dassana Endpoint: https://dassana.io/ingest (default)
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID of S3AccessApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "S3AccessApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your VPC Flow logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function like this
![S3 Trigger Enabled](/img/s3-access/s3-trigger-enabled-s3-access.png)

## Conclusion
Congrats! You've successfully deployed the Dassana S3 Access app. Now, your S3 Access logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.io) next to discover useful queries for S3 Access logs.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. Note that fields displayed as "-" by AWS are converted to null. 

```json
{
   "bucket_owner": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be",
   "bucket": "customer-data",
   "time": "[10/Jan/2022:22:54:07 +0000]",
   "remote_ip": "x.xx.xxx.xx",
   "requestor": "arn:aws:sts::536600094836:assumed-role/AWSReservedSSO_AdministratorAccess_bf79198b8d235347/kaushik@dassana.io",
   "request_id": "KCWHAGW4RMCP5630",
   "operation": "REST.GET.OWNERSHIP_CONTROLS",
   "key": "None",
   "request_uri": "GET /customer-data?ownershipControls= HTTP/1.1",
   "http_status": 200,
   "error_code": "None",
   "bytes_sent": 193,
   "object_size": "None",
   "total_time": 85,
   "turn_around_time": 84,
   "referer": null,
   "user_agent": "S3Console/0.4, aws-internal/3 aws-sdk-java/1.11.1030 Linux/5.4.156-94.273.amzn2int.x86_64 OpenJDK_64-Bit_Server_VM/25.302-b08 java/1.8.0_302 vendor/Oracle_Corporation cfg/retry-mode/standard",
   "version_id": "None",
   "host_id": "aGMouaUeimJeChcjYqQ8SyascwS0weQ7czaCFU7QPGIqUaNCb3oP7y2jqQ2y0BAhsZJg0fK5U/s=",
   "signature_version": "SigV4",
   "cipher_suite": "ECDHE-RSA-AES128-GCM-SHA256",
   "authentication_type": "AuthHeader",
   "host_header": "s3.amazonaws.com",
   "tls_version": "TLSv1.2",
   "access_point_arn": "None"
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html#log-record-fields) for all S3 Access log fields.

