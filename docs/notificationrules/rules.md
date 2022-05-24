# Create Notification Rule

Creation and Configuration of Notification Rule is easy.

1. Head over to the [Notification Rules](https://console.dassana.cloud) Page
2. Click on Notification Rules in the menu

   ![NotificationRules_AddNew](/img/notificationrules/notification-rules-addnew.png)
3. Enter name, severity, tags and select the channel you want your notifications sent to.

   ![NotificationRules_Create](/img/notificationrules/notification-rules-newRule.png)
4. Upon Successful creation of notification rules, you will be able to see your notification rule in list of notification rules.

   ![NotificationRules_ViewAll](/img/notificationrules/notification-rules-viewall.png)
5. Upon successful detection rule execution which matches the notification criteria, users will get slack notification to the configured slack channel as below.

   ![NotificationRules_Notification](/img/notificationrules/notification-rules-notification.png)
6. From the slack notification , users can perform below actions
    1. **Execute Query** : Users can execute the query which triggered the Detection by clicking on execute query button.
    2. **View Detection Rule** : Users can view the detection rule by clicking on View Detection Rule button.
    3. **View Notification Rule** : Users can view the notification rule which sent this notification to slack by clicking on Notification Rule Name (In our example its MyFirstNotificationRule).