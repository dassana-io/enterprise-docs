# Webhook Reserved Keywords

Dassana uses few keywords in request body of the webhook-integration.

These keywords are used internally to replace the actual values based on the detection rule which triggered the notification.So Kindly avoid using these keywords as part of your custom request body.

List of reserved keywords can be seen in the webhook integration page next to Request body as shown below

![Webhook Integration](/img/integrations/webhook/webhook-reserved-keywords.png)

Reserved Keywords transformation to actual values is shown below with example


| Reserved Keyword Name           | Meaning              |
|---------------------------------|----------------------|
| [CloudTrail](cloudtrail)        | aws_cloudtrail       |
| [VPC Flow](vpc-flow)            | aws_vpc_flow         |
| [ALB Access](alb)               | aws_alb              |
| [S3 Access](s3-access)          | aws_waf              |
| [WAF](waf)                      | aws_s3_access        |
| [Route53 Resolver](r53resolver) | aws_route53_resolver |
| [Network Firewall](nfw)         | aws_network_firewall |

| Reserved Keyword Name        | Meaning                                                     | Example Value                                                                                                                                                                                                                                                                                                                                                                               |  
|------------------------------|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$DETECTION_RULE_ID`         | Detection Rule Id                                           | *dr-test*                                                                                                                                                                                                                                                                                                                                                                                   |
| `$DETECTION_RULE_NAME`       | Detection Rule Name                                         | *AWS S3 Bucket Policy Updated*                                                                                                                                                                                                                                                                                                                                                              |
| `$DETECTION_RULE_LINK`       | Detection Rule URL Link                                     | *https://console.dassana.cloud/detections/rule?id=IAM_4*                                                                                                                                                                                                                                                                                                                                    |
| `$SEVERITY`                  | Detection Rule Severity                                     | *info*                                                                                                                                                                                                                                                                                                                                                                                      |
| `$TAGS`                      | Detection Rule Tags                                         | ```[ "vendor:aws","source:cloudtrail", "service:s3", "categorization:iam", "security:compliance", "app:aws_cloudtrail",  "benchmark:cis-aws", "requirement:monitoring", "section:4.8"]```                                                                                                                                                                                                   |
| `$QUERY_LINK`                | Detection Rule Query Link                                   | *https://console.dassana.cloud/query?search=select%20%2A%20from%20aws_cloudtrail%20where%20eventName%20in%20%28%0A%27PutBucketAcl%27%2C%0A%27PutBucketPolicy%27%2C%0A%27PutBucketCors%27%2C%0A%27PutBucketLifecycle%27%2C%0A%27PutBucketReplication%27%2C%0A%27DeleteBucketPolicy%27%2C%0A%27DeleteBucketCors%27%2C%0A%27DeleteBucketLifestyle%27%2C%0A%27DeleteBucketReplication%27%0A%29* |
| `$EVENT_TYPE`                | Event Type (Detection)                                      | *detection*                                                                                                                                                                                                                                                                                                                                                                                 |
| `$EVENT_TIME`                | Time When Detection Rule Found A Match                      | *2022-07-15T05:53:06.893Z*                                                                                                                                                                                                                                                                                                                                                                  |
| `$SCAN_START_TIME`           | Detection Rule Scan Start Time                              | *2022-07-15T05:50:00.893Z*                                                                                                                                                                                                                                                                                                                                                                  |
| `$SCAN_END_TIME`             | Detection Rule Scan End Time                                | *2022-07-15T05:55:06.893Z*                                                                                                                                                                                                                                                                                                                                                                  |
| `$MATCHING_EVENTS`           | Number Of Results Found                                     | *10*                                                                                                                                                                                                                                                                                                                                                                                        |
| `$CONDITION`                 | Condition Which Caused Detection Rule To Send Notifications | *>0*                                                                                                                                                                                                                                                                                                                                                                                        |
| `$NOTIFICATION_RULE_ID`      | Notification Rule Id                                        | *nr-test*                                                                                                                                                                                                                                                                                                                                                                                   |
| `$NOTIFICATION_RULE_NAME`    | Notification Rule Name                                      | *test notification rule*                                                                                                                                                                                                                                                                                                                                                                    |
| `$NOTIFICATION_RULE_LINK`    | Notification Rule URL Link                                  | *https://console.dassana.cloud/notificationRules/rule?id=nr-test*                                                                                                                                                                                                                                                                                                                           |
| `$WEBHOOK_NOTIFICATION_ID`   | Webhook Integration Id                                      | *Wh-TestID*                                                                                                                                                                                                                                                                                                                                                                                 |
| `$WEBHOOK_NOTIFICATION_NAME` | Webhook Integration Name                                    | *WebhookEndpointOne*                                                                                                                                                                                                                                                                                                                                                                        |


:::info Note
 Only ```$TAGS``` in the request body will be replaced with json array.
 All other keywords will be replaced with actual value in string data type.

:::







