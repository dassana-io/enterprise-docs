# Route53 Resolver Reference

Route53 Resolver query logs contain information about DNS queries that originate in AWS VPCs, on-prem resources that utilize an inbound Resolver endpoint, as well as queries that use outbound resolver endpoints or a Route 53 Resolver DNS firewall. The logs contain information regarding where the query originated from and the records requested and resolved. You can find sample Route53 logs in this document.

## Log Example

```json
{
    "srcaddr": "4.5.64.102",
    "vpc_id": "vpc-7example",
    "answers": [
        {
            "Rdata": "203.0.113.9",
            "Type": "PTR",
            "Class": "IN"
        }
    ],
    "firewall_rule_group_id": "rslvr-frg-01234567890abcdef",
    "firewall_rule_action": "BLOCK",
    "query_name": "15.3.4.32.in-addr.arpa.",
    "firewall_domain_list_id": "rslvr-fdl-01234567890abcdef",
    "query_class": "IN",
    "srcids": {
        "instance": "i-0d15cd0d3example"
    },
    "rcode": "NOERROR",
    "query_type": "PTR",
    "transport": "UDP",
    "version": "1.100000",
    "account_id": "111122223333",
    "srcport": "56067",
    "query_timestamp": "2021-02-04T17:51:55Z",
    "region": "us-east-1"
}
```

## Log Schema

View [AWS's Documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs-format.html) for all Route53 Resolver Query log fields.
