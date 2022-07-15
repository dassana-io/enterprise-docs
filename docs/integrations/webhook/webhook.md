# Webhooks

Getting started with Webhook Integrations is super easy!

1. Head over to the [Integrations](https://console.dassana.cloud/integrations) page
2. Under Webhook, click `Add New`

![Webhook Integration](/img/integrations/webhook/webhook-empty.png)

3. Enter Name for the webhook integration 
4. Enter Webhook Url (By Default We Only Support POST Http Method)
5. Add additional headers if required
6. We ship default request body which is shown below , Feel free to add more fields but make sure it is proper json.

```json
{
  "detectionRuleId": "$DETECTION_RULE_ID",
  "detectionRuleName": "$DETECTION_RULE_NAME",
  "detectionRuleLink": "$DETECTION_RULE_LINK",
  "severity": "$SEVERITY",
  "tags": "$TAGS",
  "queryUrl": "$QUERY_LINK",
  "eventType": "$EVENT_TYPE",
  "eventTimestamp": "$EVENT_TIME",
  "scanTimeTsStart": "$SCAN_START_TIME",
  "scanTimeTsEnd": "$SCAN_END_TIME",
  "matchingEvents": "$MATCHING_EVENTS",
  "matchCriteria": {
    "condition": "$CONDITION"
  },
  "notificationRuleId": "$NOTIFICATION_RULE_ID",
  "notificationRuleName": "$NOTIFICATION_RULE_NAME",
  "notificationRuleLink": "$NOTIFICATION_RULE_LINK",
  "webhookId": "$WEBHOOK_NOTIFICATION_ID",
  "webhookName": "$WEBHOOK_NOTIFICATION_NAME"
}
```
7. Click on `Test` button to make sure the webhook-integration url is valid and meets our url requirements which is explained in () . 
8. Upon Successful validation, `Test` button will be turned to `Save`.
9. Upon clicking `Save` button , the webhook-integration will be saved.

:::info Want to switch to default request body anytime ?

Click on ```use default``` next to Request body label in the integration page. This will set your request body content to default request body.

:::

:::info Want to test webhook integration anytime ?

1. Head over to the [Integrations](https://console.dassana.cloud/integrations) page
2. Under respective Webhook Integration, click `Test` .

![Test Webhook Integration](/img/integrations/webhook/webhook-test.png)

Note : Testing Webhook Integrations will always send some dummy data.
:::
