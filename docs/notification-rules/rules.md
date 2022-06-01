# Create Notification Rule

:::info Prereqs

In order to start creating notifications rules, you must have

1. Some enabled detections
2. An integration channel added

:::

Creating and configuring a notification rules is as simple as pie.

1. Head over to the [Notification Rules](https://console.dassana.cloud/notificationRules) page and click `Add New`
2. Enter the name of your notification rule
3. Selecting severity and / or tags will filter the list of detections on the right hand side letting you know of all detections that are being matched

![Create Notification Rule](/img/notification-rules/new-rule.png)

:::info Future proofed

Notification rules are future proofed. If you or Dassana adds more detections in the future that match the filters selected in an existing notification rule, then you will also be notified about the new rules. This makes management simple as you will never need to update preexisting notification rules when creating new detections.

:::

4. Lastly, select one or more notification channels where you would like to be notified and then click `Save`

5. When a notification rule is triggered, you will receive a notification like so

![NotificationRules_Notification](/img/notification-rules/notification.png)
