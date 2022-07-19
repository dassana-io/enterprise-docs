# Reserved Keywords

Dassana uses reseerved keywords in the webhook request body. These keywords are replaced with actual values. You can customize your request body as per your needs.

The full list of reserved keywords can be seen in the webhook integration page next to request body:

![Webhook Integration](/img/integrations/webhook/webhook-reserved-keywords.png)

| Reserved Keyword             | Meaning                                                     | Example Value                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$DETECTION_RULE_ID`         | Detection Rule Id                                           | _dr-test_                                                                                                                                                                            |
| `$DETECTION_RULE_NAME`       | Detection Rule Name                                         | _AWS S3 Bucket Policy Updated_                                                                                                                                                       |
| `$DETECTION_RULE_LINK`       | Detection Rule URL Link                                     | *https://console.dassana.cloud/detections/rule?id=IAM_4*                                                                                                                             |
| `$SEVERITY`                  | Detection Rule Severity                                     | _info_                                                                                                                                                                               |
| `$TAGS`                      | Detection Rule Tags                                         | `[ "vendor:aws","source:cloudtrail", "service:s3", "categorization:iam", "security:compliance", "app:aws_cloudtrail", "benchmark:cis-aws", "requirement:monitoring", "section:4.8"]` |
| `$QUERY_LINK`                | Detection Rule Query Link                                   | *https://console.dassana.cloud/query?search=*                                                                                                                                        |
| `$EVENT_TYPE`                | Event Type (Detection)                                      | _detection_                                                                                                                                                                          |
| `$EVENT_TIME`                | Time When Detection Rule Found A Match                      | _2022-07-15T05:53:06.893Z_                                                                                                                                                           |
| `$SCAN_START_TIME`           | Detection Rule Scan Start Time                              | _2022-07-15T05:50:00.893Z_                                                                                                                                                           |
| `$SCAN_END_TIME`             | Detection Rule Scan End Time                                | _2022-07-15T05:55:06.893Z_                                                                                                                                                           |
| `$MATCHING_EVENTS`           | Number Of Results Found                                     | _10_                                                                                                                                                                                 |
| `$CONDITION`                 | Condition Which Caused Detection Rule To Send Notifications | _>0_                                                                                                                                                                                 |
| `$NOTIFICATION_RULE_ID`      | Notification Rule Id                                        | _nr-test_                                                                                                                                                                            |
| `$NOTIFICATION_RULE_NAME`    | Notification Rule Name                                      | _test notification rule_                                                                                                                                                             |
| `$NOTIFICATION_RULE_LINK`    | Notification Rule URL Link                                  | *https://console.dassana.cloud/notificationRules/rule?id=nr-test*                                                                                                                    |
| `$WEBHOOK_NOTIFICATION_ID`   | Webhook Integration Id                                      | _Wh-TestID_                                                                                                                                                                          |
| `$WEBHOOK_NOTIFICATION_NAME` | Webhook Integration Name                                    | _WebhookEndpointOne_                                                                                                                                                                 |

:::note

`$TAGS` are the only keyword field represented using arrays. All other keyword values will be strings.

:::
