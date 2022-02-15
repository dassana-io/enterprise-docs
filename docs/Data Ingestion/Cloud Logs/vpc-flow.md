---
sidebar_position: 4
---

# VPC Flow Reference

VPC Flow logs contain information about the IP traffic going to and from network interfaces in your VPC. You can find sample VPC Flow logs and queries in this document.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. 
```json
{
  "version": 2,
  "account-id": "123456789012",
  "interface-id": "eni-01ab234c5de6f78g9",
  "srcaddr": "xx.xxx.xxx.xx",
  "dstaddr": "xxx.xx.x.xx",
  "srcport": 123,
  "dstport": 33298,
  "protocol": 17,
  "packets": 1,
  "bytes": 76,
  "start": 1640995465,
  "end": 1640995493,
  "action": "ACCEPT",
  "log-status": "OK"
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields) for all VPC Flow Log fields.

