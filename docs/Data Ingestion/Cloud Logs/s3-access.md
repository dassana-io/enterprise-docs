---
sidebar_position: 3
---

# S3 Access Reference

S3 Access logs contains information on S3 bucket requests useful for security and cost analysis. You can find sample S3 Access logs and queries in this document.

## Log Example
Here's an example of a log with default fields that will be streamed to Dassana. 

```json
{
   "bucket_owner": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be",
   "bucket": "customer-data",
   "time": "[10/Jan/2022:22:54:07 +0000]",
   "remote_ip": "x.xx.xxx.xx",
   "requestor": "arn:aws:sts::536600094836:assumed-role/AWSReservedSSO_AdministratorAccess_bf79198b8d235347/kaushik@dassana.io",
   "request_id": "KCWHAGW4RMCP5630",
   "operation": "REST.GET.OWNERSHIP_CONTROLS",
   "key": "None",
   "request_uri": "GET /customer-data?ownershipControls= HTTP/1.1",
   "http_status": 200,
   "error_code": "None",
   "bytes_sent": 193,
   "object_size": "None",
   "total_time": 85,
   "turn_around_time": 84,
   "referer": null,
   "user_agent": "S3Console/0.4, aws-internal/3 aws-sdk-java/1.11.1030 Linux/5.4.156-94.273.amzn2int.x86_64 OpenJDK_64-Bit_Server_VM/25.302-b08 java/1.8.0_302 vendor/Oracle_Corporation cfg/retry-mode/standard",
   "version_id": "None",
   "host_id": "aGMouaUeimJeChcjYqQ8SyascwS0weQ7czaCFU7QPGIqUaNCb3oP7y2jqQ2y0BAhsZJg0fK5U/s=",
   "signature_version": "SigV4",
   "cipher_suite": "ECDHE-RSA-AES128-GCM-SHA256",
   "authentication_type": "AuthHeader",
   "host_header": "s3.amazonaws.com",
   "tls_version": "TLSv1.2",
   "access_point_arn": "None"
}
```

## Log Schema
View [AWS's Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html#log-record-fields) for all S3 Access log fields.

