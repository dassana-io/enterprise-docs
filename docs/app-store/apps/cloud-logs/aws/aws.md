# AWS

In this guide, we'll learn how to stream all your AWS logs - [CloudTrail](cloudtrail), [VPC Flow](vpc-flow), [ALB](alb), [S3 Access](s3-access), [WAF](waf) - to Dassana.

:::note Prerequisite
Your AWS logs must be published to an S3 Bucket.
:::

## Deploy Serverless App

Dassana has built a Lambda function that streams logs from your S3 bucket to the Cloud Log Lake. You must deploy this serverless app once for each log type (ex. Cloudtrail, VPC Flow logs, etc.)

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-us-east-1.s3.amazonaws.com/template/packaged-template.yaml)

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
5. Scroll down and select SQS queue as a destination
6. Save changes

## Conclusion

Congrats! You've successfully deployed the Dassana AWS app. Now, your AWS logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. View the log references on the sidebar for sample queries to get you started.

## App IDs

| Log Type                 | App ID               |
| ------------------------ | -------------------- |
| [CloudTrail](cloudtrail) | aws_cloudtrail       |
| [VPC Flow](vpc-flow)     | aws_vpc_flow         |
| [ALB Access](alb)        | aws_alb              |
| [S3 Access](s3-access)   | aws_waf              |
| [WAF](waf)               | aws_s3_access        |
| Route53 Resolver         | aws_route53_resolver |
| Network Firewall         | aws_network_firewall |
