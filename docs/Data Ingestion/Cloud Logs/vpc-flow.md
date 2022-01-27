---
sidebar_position: 4
---

# AWS VPC Flow

VPC Flow logs contain information about the IP traffic going to and from network interfaces in your VPC. In this guide, we'll learn how to deploy Dassana's AWS VPC Flow app.

:::note Prerequisite
Your VPC Flow logs must be published to an S3 Bucket. Follow [this guide](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html#flow-logs-s3-create-flow-log) if you haven't already.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams VPC Flow logs from your S3 bucket to the Cloud Log Lake.

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-apps.s3.amazonaws.com/vpc-flow-s3/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the [VPC Flow App ID](https://console.dassana.dev/appStore/app/aws_cloudtrail) from the Dassana App Store
  - Dassana Endpoint: https://ingestion.dassana.cloud/logs (default)
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID of VPCFlowApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "VPCFlowApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your VPC Flow logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function like this
![S3 Trigger Enabled](/img/vpc-flow-s3/s3-trigger-enabled.png)

## Conclusion
Congrats! You've successfully deployed the Dassana VPC Flow app. Now, your flow logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.io) next to discover useful queries for VPC Flow logs.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. Note that fields displayed as "-" by AWS are converted to null. 
```json
{
  "version": 2,
  "account-id": "123456789012",
  "interface-id": "eni-01ab234c5de6f78g9",
  "srcaddr": "xx.xxx.xxx.xx",
  "dstaddr": "xxx.xx.x.xx",
  "srcport": 123,
  "dstport": 33298,
  "protocol": 17,
  "packets": 1,
  "bytes": 76,
  "start": 1640995465,
  "end": 1640995493,
  "action": "ACCEPT",
  "log-status": "OK"
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields) for all VPC Flow Log fields.

