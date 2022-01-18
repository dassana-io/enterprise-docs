---
sidebar_position: 5
---

# AWS WAF

Web Application Firewall (WAF) Logs contain information about traffic that is analyzed by your web ACLs including details about rules the traffic matched. In this guide, we'll learn how to deploy Dassana's AWS WAF Log app.

:::note Prerequisite
Your WAF logs must be published to an S3 Bucket. Follow [this guide](https://docs.aws.amazon.com/waf/latest/developerguide/logging-s3.html) if you haven't already.
:::

## Deploy Serverless App
Dassana has a built a Lambda function that streams WAF logs from your S3 bucket to the Cloud Log Lake.

[![](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://dassana-native-apps.s3.amazonaws.com/waf-s3/packaged-template.yaml)
1. Enter a stack name and and fill out the following Parameters:
  - Dassana App ID: Paste the [WAF App ID](https://console.dassana.dev/appStore/app/aws_cloudtrail) from the Dassana App Store
  - Dassana Endpoint: https://dassana.io/ingest (default)
  - Dassana Token: Paste your [Dassana Token](https://console.dassana.dev/appStore?page=tokens)
2. Click the checkboxes to acknowledge custom IAM role creation (a role will be created with permissions to read logs from your S3 bucket) and click Create Stack
3. Once the stack is created, navigate to the Resources tab and click on the Physical ID of WAFApp. This should open your newly created lambda function.

## Add S3 Trigger

You should now be viewing the lambda function you just deployed. If not, you can visit the Lambda console and search for "WAFApp". We will now connect the Lambda function to the S3 bucket containing your logs.

1. In function overview, click Add trigger.
2. Select S3
3. Choose the bucket containing your WAF logs, and keep Event type as All Object create events
4. If you are storing multiple log types in the S3 bucket, fill out the prefix field (not typical)
5. Acknowledge the Recursive invocation notice and click Add

You should now see your S3 trigger connected to the Lambda function like this
![S3 Trigger Enabled](/img/waf/s3-trigger-enabled-waf.png)

## Conclusion
Congrats! You've successfully deployed the Dassana WAF app. Now, your flow logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.io) next to discover useful queries for WAF logs.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. Note that fields displayed as "-" by AWS are converted to null. 
```json
{
  "timestamp": 1576280412771,
  "formatVersion": 1,
  "webaclId": "arn:aws:wafv2:ap-southeast-2:111122223333:regional/webacl/STMTest/1EXAMPLE-2ARN-3ARN-4ARN-123456EXAMPLE",
  "terminatingRuleId": "STMTest_SQLi_XSS",
  "terminatingRuleType": "REGULAR",
  "action": "BLOCK",
  "terminatingRuleMatchDetails": [
    {
      "conditionType": "SQL_INJECTION",
      "location": "HEADER",
      "matchedData": [
        "10",
        "AND",
        "1"
      ]
    }
  ],
  "httpSourceName": "-",
  "httpSourceId": "-",
  "ruleGroupList": [],
  "rateBasedRuleList": [],
  "nonTerminatingMatchingRules": [],
  "httpRequest": {
    "clientIp": "1.1.1.1",
    "country": "AU",
    "headers": [
      {
        "name": "Host",
        "value": "localhost:1989"
      },
      {
        "name": "User-Agent",
        "value": "curl/7.61.1"
      },
      {
        "name": "Accept",
        "value": "*/*"
      },
      {
        "name": "x-stm-test",
        "value": "10 AND 1=1"
      }
    ],
    "uri": "/foo",
    "args": "",
    "httpVersion": "HTTP/1.1",
    "httpMethod": "GET",
    "requestId": "rid"
  },
  "labels": [
    {
      "name": "value"
    }
  ]
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/waf/latest/developerguide/logging-fields.html) for all WAF log fields.

