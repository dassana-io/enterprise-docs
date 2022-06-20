# 🕵️‍♀️ Detection Rules

Detection Rules are continuous queries that run against all ingested logs and help you stay on top of what is going on.

Let's say you have a query which results in user deleting a resource. 
You set a detection rule, we will run the query on your behalf and notify (you need to set [Notification Rule](../notification-rules/intro)) as of when rule condition matches.
Isn't this cool?

Dassana ships dozens of out-of-the-box detection rules to help you get started! These detection rules are disabled by default, so you can enable based on apps you have configured.

There are situations where you may want to customize a rule or create your own rule. To define a custom detection rule you need to define few configuration -
1. Name - Unique rule name
2. Query - Construct a query 
3. Frequency - Interval at which rule need to be executed. We support minimum 5 minutes to maximum 60 minutes frequency.
4. Threshold - Condition defined here is applied on the query result count. We support >,<,=,!= operator for condition matching. For eg - you may be not be interested if single failure occur, but would be interested if multiple failures occurs. In such situation, you may define > 5 as threshold condition. Also, you may define severity accordingly.
5. Tags - Label your detection. Refer [detection rule tagging](/tagging) for more.

We support some advance settings for our detection rules - 
1. Throttling - This setting silents the rule for y amount of time if x successful rule condition match within y time.
2. Rolling Window - This is an advance setting to frequency, if enabled it runs detection rule for every 5 minutes over the time range defined in frequency. 
