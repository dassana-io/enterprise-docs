# Network Firewall Flow Reference

AWS Network Firewall flow logs contains standard network traffic information grouped by 5-tuples. You can find sample Network Firewall flow logs in this document.

## Log Example

```json
{
	"firewall_name": "test-firewall",
	"availability_zone": "us-east-1b",
	"event_timestamp": "1602627001",
	"event": {
		"timestamp": "2020-10-13T22:10:01.006481+0000",
		"flow_id": 1582438383425873,
		"event_type": "alert",
		"src_ip": "203.0.113.4",
		"src_port": 55555,
		"dest_ip": "192.0.2.16",
		"dest_port": 111,
		"proto": "TCP",
		"alert": {
			"action": "allowed",
			"signature_id": 5,
			"rev": 0,
			"signature": "test_tcp",
			"category": "",
			"severity": 1
		}
	}
}
```

## Log Schema

View [AWS's Documentation](https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-logging.html) for all Network Firewall log fields.
