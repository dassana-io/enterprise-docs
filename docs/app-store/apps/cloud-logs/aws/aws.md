# AWS

In this guide, we'll learn how to stream all your AWS logs - [CloudTrail](cloudtrail), [VPC Flow](vpc-flow), [ALB](alb), [S3 Access](s3-access), [WAF](waf) - to Dassana.

:::note Prerequisite
Your AWS logs must be published to an S3 Bucket.
:::

## Deploy Serverless App

Dassana has built a Lambda function that streams logs from your S3 bucket to the Cloud Log Lake. You must deploy this serverless app once for each log type (ex. Cloudtrail, VPC Flow logs, etc.)

[![](https://dassana-docs-assets.s3.amazonaws.com/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-us-east-1.s3.amazonaws.com/template/packaged-template.yaml)

1. Enter a stack name and and fill out the following Parameters:

-   Dassana App ID: Paste the appropriate [App ID](#app-ids)
-   Dassana Endpoint: https://ingestion.dassana.cloud/logs
-   Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
-   ExistingSNSTopic (Optional): If you already have an existing SNS topic receiving notifications from your S3 bucket, paste the ARN here. Otherwise, leave it blank and we'll create one.
-   LogSourceBucket: Paste the ARN of the S3 bucket containing your logs

2. Click the checkboxes to acknowledge custom IAM role creation and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID AWSApp. This should open your newly created lambda function.

## Add S3 Event Notification

If you did not have an exisiting SNS topic, follow these steps to finish setting up your Dassana app.

1. Navigate to your S3 bucket in the console and select properties.
2. Scroll down to Event notifications and click create event notifications
3. Fill out an event name
4. Select 'All object create events'
5. Scroll down and select SNS topic as a destination
6. Select the newly created SNS topic (ends in "-DassanaLogTopic") and Save changes

## What if I have an existing S3 Event Notification?

AWS only allows for 1 event notification per event type per bucket. If your existing S3 Event Notification's destination is SNS, Dassana will hook into your existing notification (assuming you provided the SNS arn when deploying our CFT). However, if your existing event notification's destination is a lambda function, we recommend moving to a fan-out model. Remove your existing event notification and follow the steps above to add Dassana's SNS topic as a destination. Then, you can optionally create a new SQS queue subscribed to Dassana's SNS topic to serve as your lambda's trigger.

import SlackSupport from '../../../../shared/slack-support.md'

<SlackSupport />

## Conclusion

Congrats! You've successfully deployed the Dassana AWS app. Now, your AWS logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. View the log references on the sidebar for sample queries to get you started.

## Handling Failures

The Dassana AWS app includes automatic retries at the execution and invocation levels. However, sometimes retries aren't enough. A common example is when your Dassana token was rotated in the console, but not updated in your lambda configuration. Logs that fail to be delivered after exhausting your configured retry capacity will be sent to a SQS DeadLetterQueue (named YourStackName-DeadLetterQueue). You can send these logs back to Dassana by clicking 'Start DLQ redrive' in the SQS console.

## App IDs

| Log Type                        | App ID               |
| ------------------------------- | -------------------- |
| [CloudTrail](cloudtrail)        | aws_cloudtrail       |
| [VPC Flow](vpc-flow)            | aws_vpc_flow         |
| [ALB Access](alb)               | aws_alb              |
| [S3 Access](s3-access)          | aws_waf              |
| [WAF](waf)                      | aws_s3_access        |
| [Route53 Resolver](r53resolver) | aws_route53_resolver |
| [Network Firewall](nfw)         | aws_network_firewall |
