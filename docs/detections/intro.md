# 🕵️‍♀️ Detections

Detections are continous queries that run against your data and help you stay on top of what is going on.

Let's say you have a query that returns results of a user deleting a resource.
In order to be notified of this event, you need to:

1. Create a detection
2. Ensure there is a [Notification Rule](/notification-rules/intro) that notifies you about your newly created detection when the rule condition gets matched

Dassana ships dozens of out-of-the-box detection rules to help you get started! These detection rules are disabled by default, so you can enable based on sources you have configured.
