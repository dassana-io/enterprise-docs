# Normalized Fields

Say for example, you have a identified a malicious IP address and want to check all of your logs (cloudtrail, vpc flow logs, etc) for any activity by this IP address. How would you go about doing this? One way to do this would be to write an individual query per log source. However, let's be real, that would be quite tedious. To address this, Dassana supports the concept of normalized fields.

## Field Mappings

Normalized fields map specific fields from logs to custom variables that you can use to ask general questions making threat detection very easy to do.

:::note

Currently, it is not possible to configure normalized fields. This is something that is set by the Dassana team for default apps. This will be made configurable very soon.

:::

Here are some examples:

![CloudTrail Normalized Fields](/img/app-store/normalized-fields/cloudtrail.png)

![VPC Flow Logs Normalized Fields](/img/app-store/normalized-fields/vpc-flow.png)

## Querying Normalized Fields

In the screenshots above, you will note the variable `$ip` being mapped to fields that contain IP addresses. With these normalized fields defined, you can start running some interesting queries like the following:

```sql
select count() from all where $ip = 'x.x.x.x'

-- Would return something like:
-- aws_cloudtrail 10
-- aws_vpc_flow   5
```

```sql
select * from [aws_cloudtrail, aws_vpc_flow] where $ip in ('x.x.x.x', 'y.y.y.y')
```
