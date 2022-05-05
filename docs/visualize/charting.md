# Creating Charts

You can get started with your own custom dashboard in minutes!

:::info Prerequiste
Please ensure you have completed the [setup](./setup).
:::

1. On the left hand sidebar, click on `+` -> `Dashboard`
1. Click on `Add a panel`

## Example 1: Gauge

1. Once you have created a new panel, change the visualization type using the dropdown on the top right to `Gauge`.
2. On the bottom of your screen, update the code editor to use the following query:

```sql
select count(*) from aws_cloudtrail
```

3. You can customize your chart (title, axis, other settings) by using the panel on the right hand side.

## Example 2: Bar Chart

1. Once you have created a new panel, change the visualization type using the dropdown on the top right to `Bar chart`.
2. On the bottom of your screen, update the code editor to use the following query:

```sql
select count(*) as count, errorCode from aws_cloudtrail
where errorCode != ''
group by errorCode
order by count desc limit 6
```

3. You can customize your chart (title, axis, other settings) by using the panel on the right hand side.
