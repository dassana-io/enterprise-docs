# ALB Access Reference

Application Load Balancer Access logs contain information about requests sent to your load balancer including the client's IP address, latencies, request paths, and server responses. You can find sample ALB Access logs and queries in this document.

## Log Example

```json
{
    "type": "http",
    "time": "2022-01-16T17:09:59.903920Z",
    "elb": "app/example-alb/9ab0c1d4e0f1gh55",
    "client_port": "xx.xxx.xx.x:xxxxx",
    "target_port": "xxx.xx.xx.xx:xxxx",
    "request_processing_time": -1,
    "target_processing_time": -1,
    "response_processing_time": -1,
    "elb_status_code": 502,
    "target_status_code": "None",
    "received_bytes": 231,
    "sent_bytes": 679,
    "request": "GET http://x.xxx.xx.xxx:80/ HTTP/1.1",
    "user_agent": "Mozilla/5.0 (Windows NT 6.2;en-US) AppleWebKit/537.32.36 (KHTML, live Gecko) Chrome/58.0.3017.69 Safari/537.32",
    "ssl_cipher": "None",
    "ssl_protocol": "None",
    "target_group_arn": "arn:aws:elasticloadbalancing:us-east-1:123456000000:targetgroup/route-to-vm/12312312345ae751",
    "trace_id": "Root=1-61e45167-7d0e6b05443e0b790dbafd37",
    "domain_name": null,
    "chosen_cert_name": null,
    "matched_rule_priority": "0",
    "request_creation_time": "2022-01-16T17:09:59.891000Z",
    "actions_executed": "waf,forward",
    "redirect_url": null,
    "error_reason": null,
    "target_port_list": "xxx.xx.xx.xx:9200",
    "target_status_code_list": null,
    "classification": null,
    "classificaton_reason": null
}
```

## Log Schema

View [AWS's Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#access-log-entry-syntax) for all ALB log fields.
