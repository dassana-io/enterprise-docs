---
sidebar_position: 1
---

# AWS ALB Access

Application Load Balancer Access logs contain information about requests sent to your load balancer including the client's IP address, latencies, request paths, and server responses. In this guide, we'll learn how to deploy Dassana's AWS ALB app.

:::note Prerequisite
Your ALB logs must be published to an S3 Bucket. Follow [this guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) if you haven't already.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams ALB logs from your S3 bucket to the Cloud Log Lake.

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-apps.s3.amazonaws.com/alb-s3/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the [ALB App ID](https://console.dassana.dev/appStore/app/aws_cloudtrail) from the Dassana App Store
  - Dassana Endpoint: https://dassana.io/ingest (default)
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID of ALBApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "ALBApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your ALB logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function like this
![S3 Trigger Enabled](/img/alb-s3/s3-trigger-enabled-alb.png)

## Conclusion
Congrats! You've successfully deployed the Dassana ALB app. Now, your ALB logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.io) next to discover useful queries for ALB logs.

## Log Example
Note that fields displayed as "-" by AWS are converted to null.
```json
{
   "type": "http",
   "time": "2022-01-16T17:09:59.903920Z",
   "elb": "app/example-alb/9ab0c1d4e0f1gh55",
   "client_port": "xx.xxx.xx.x:xxxxx",
   "target_port": "xxx.xx.xx.xx:xxxx",
   "request_processing_time": -1,
   "target_processing_time": -1,
   "response_processing_time": -1,
   "elb_status_code": 502,
   "target_status_code": "None",
   "received_bytes": 231,
   "sent_bytes": 679,
   "request": "GET http://3.212.76.237:80/ HTTP/1.1",
   "user_agent": "Mozilla/5.0 (Windows NT 6.2;en-US) AppleWebKit/537.32.36 (KHTML, live Gecko) Chrome/58.0.3017.69 Safari/537.32",
   "ssl_cipher": "None",
   "ssl_protocol": "None",
   "target_group_arn": "arn:aws:elasticloadbalancing:us-east-1:536600094836:targetgroup/route-to-kaushik-vm/9b211fb2017ae751",
   "trace_id": "Root=1-61e45167-7d0e6b05443e0b790dbafd37",
   "domain_name": null,
   "chosen_cert_name": null,
   "matched_rule_priority": "0",
   "request_creation_time": "2022-01-16T17:09:59.891000Z",
   "actions_executed": "waf,forward",
   "redirect_url": null,
   "error_reason": null,
   "target_port_list": "172.31.89.11:9200",
   "target_status_code_list": null,
   "classification": null,
   "classificaton_reason": null
}
```

## Log Schema 
View [AWS's Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#access-log-entry-syntax) for all ALB log fields.
