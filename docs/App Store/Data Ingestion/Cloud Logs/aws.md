# AWS

## App Installation

In this guide, we'll learn how to deploy Dassana's AWS app to stream all your AWS logs to Dassana. 
- [CloudTrail](cloudtrail)
- [VPC Flow](vpc-flow)
- [ALB](alb)
- [S3 Access](s3-access)
- [WAF](waf)

:::note Prerequisite
Your AWS logs must be published to an S3 Bucket.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams logs from your S3 bucket to the Cloud Log Lake. You must deploy this app once for each log type (ex. Cloudtrail, VPC Flow logs, etc.)

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-apps.s3.amazonaws.com/aws-s3/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the appropriate [App ID](#app-ids)
  - Dassana Endpoint: https://ingestion.dassana.cloud/logs
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID AWSApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "AWSApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your ALB logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function.

## Conclusion
Congrats! You've successfully deployed the Dassana AWS app. Now, your AWS logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. View the log references on the sidebar for sample queries to get you started.

## App IDs
| Log Type                   | App ID          |
| -------------------------- | --------------- |
| [CloudTrail](cloudtrail)   |  aws_cloudtrail | 
| [VPC Flow](vpc-flow)       |  aws_vpc_flow   |
| [ALB Access](alb)          |  aws_alb        |
| [S3 Access](s3-access)     |  aws_waf        |
| [WAF](waf)                 |  aws_s3_access  |

