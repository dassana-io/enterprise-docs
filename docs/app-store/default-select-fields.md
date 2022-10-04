# Default Select Fields

In SQL when you run a `select *` query, the result returns all of the columns. In Dassana, by default, all fields are not returned. Because Dassana deals with JSON, a flattened JSON can return 100s of fields. To address this, Dassana has a concept of default select fields.

Default select fields allow you to configure what columns should show up by default when running a `select *` query.

:::note

Currently, it is not possible to configure default select fields. This is something that is set by the Dassana team for default apps. This will be made configurable very soon.

:::

For example, under the sources page, if you visit the [AWS CloudTrail source](https://console.dassana.cloud/appStore/app/aws_cloudtrail), you will note that there is a tab for `Default Select Fields`.

![Default Select Fields Sources](/img/app-store/default-select-fields/app-store.png)

In the case of AWS CloudTrail, all of the fields that we want shown by default are defined on the right-hand side.

:::tip

What's really neat is that you can add aliases and even leverage [functions](/query/functions) to do interesting things to your data. You can see examples of this in the screenshot above.

:::

Now when you run a `select * from aws_cloudtrail` query, you will be able to see the default columns:

![Default Select Fields Query Page](/img/app-store/default-select-fields/query.png)
