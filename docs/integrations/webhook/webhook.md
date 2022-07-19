# Webhooks

Getting started with Webhooks is super easy!

1. Head over to the [Integrations](https://console.dassana.cloud/integrations) page
2. Under Webhook, click `Add New`

![Webhook Integration](/img/integrations/webhook/webhook-empty.png)

3. Enter `Name`
4. Enter `Webhook URL` -> only the POST method is supported
5. Add additional HTTP headers (if required)
6. You can use the following JSON payload or make changes as per your needs.

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

7. Click on the `Test` button to make sure the webhook url is valid and meets our [url requirements](/integrations/webhook/url-validation). A dummy payload will be sent to the webhook url.
8. Upon successful validation, the `Test` button will become `Save`.
9. Upon clicking `Save` button, the webhook will be saved.

:::info Want to switch back to the default request body instead of using a custom one?

Click on `Use Default` link next to Request body label. This will set your request body content to default request body.

:::

:::info Another way to test your webhook anytime

You can simply click the `Test` button under the Webhooks section of the [Integrations](https://console.dassana.cloud/integrations) page

![Test Webhook Integration](/img/integrations/webhook/webhook-test.png)

The test payload is always a dummy payload.
:::
