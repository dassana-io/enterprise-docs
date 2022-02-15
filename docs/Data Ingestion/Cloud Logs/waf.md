---
sidebar_position: 5
---

# WAF Reference

Web Application Firewall (WAF) Logs contain information about traffic that is analyzed by your web ACLs including details about rules the traffic matched. You can find sample WAF logs and queries in this document.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. 
```json
{
  "timestamp": 1576280412771,
  "formatVersion": 1,
  "webaclId": "arn:aws:wafv2:ap-southeast-2:111122223333:regional/webacl/STMTest/1EXAMPLE-2ARN-3ARN-4ARN-123456EXAMPLE",
  "terminatingRuleId": "STMTest_SQLi_XSS",
  "terminatingRuleType": "REGULAR",
  "action": "BLOCK",
  "terminatingRuleMatchDetails": [
    {
      "conditionType": "SQL_INJECTION",
      "location": "HEADER",
      "matchedData": [
        "10",
        "AND",
        "1"
      ]
    }
  ],
  "httpSourceName": "-",
  "httpSourceId": "-",
  "ruleGroupList": [],
  "rateBasedRuleList": [],
  "nonTerminatingMatchingRules": [],
  "httpRequest": {
    "clientIp": "1.1.1.1",
    "country": "AU",
    "headers": [
      {
        "name": "Host",
        "value": "localhost:1989"
      },
      {
        "name": "User-Agent",
        "value": "curl/7.61.1"
      },
      {
        "name": "Accept",
        "value": "*/*"
      },
      {
        "name": "x-stm-test",
        "value": "10 AND 1=1"
      }
    ],
    "uri": "/foo",
    "args": "",
    "httpVersion": "HTTP/1.1",
    "httpMethod": "GET",
    "requestId": "rid"
  },
  "labels": [
    {
      "name": "value"
    }
  ]
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/waf/latest/developerguide/logging-fields.html) for all WAF log fields.

