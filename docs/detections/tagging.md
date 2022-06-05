# Tagging Strategy

In order to be notified about detections, you need to create a notification rule. [Notification rules](https://console.dassana.dev/notificationRules) target detections using severity or tags. By tagging your custom detections, you can fine tune exactly what to be notified about and where.

## Recommended Tags

While tags are just strings, Dassana uses a specific format of key and value pairs delimited using a colon for the default detections that are shipped out-of-the-box:

`vendor:aws` - Vendors would be AWS, Azure, GCP, GitHub, etc.

`source:cloudtrail` - Log source like cloudtrail, vpc flow logs, alb logs, etc.

`service:ec2` - Cloud service like ec2, s3, iam, etc.

`app:aws_cloudtrail` - App id from Dassana's [app store](https://console.dassana.dev/appStore).

`categorization:iam` - High level categories. Options used by Dassana - cryptography, iam, networking, storage, public, visibility.

### Mitre Mapping

`security:attack` - Add this as is if you would like to add a mitre mapping.

`tactic:T1040-network-sniffing` - Mitre tactic

`technique:TA0006-credential-access` - Mitre technique

Adding all three mitre related tags will also show the mitre classification on the [detections](https://console.dassana.dev/detections) page.

### Compliance Mapping

`security:compliance` - Add this as is if you would like to add a compliance mapping.

`benchmark:cis-aws` - Compliance bechmark

`requirement:monitoring` - Compliance requirement

`section:4.6` - Compliance section

Adding all four compliance related tags will also show the compliance information on the [detections](https://console.dassana.dev/detections) page.

## Validation

Your tags must contain:

-   Alphanumeric words (starting with a letter) joined using hypens (-), underscores (\_), or periods (.)
-   Key value pair joined using one colon (:) and matching the previous condition

Here's the regex for everyone that likes geeking out :)

```
([a-z][a-z0-9_-]{0,19}:[a-z0-9][a-z0-9._-]{0,39})||([a-z][a-z0-9._-]{0,39})
```
