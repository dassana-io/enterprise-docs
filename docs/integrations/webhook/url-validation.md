# URL Validation

You can use any endpoint url in the webhook integration page which meets following conditions

1. Only `HTTPS` urls are allowed
2. Urls/IP Addresses cannot be in following CIDR ranges

```json
127.0.0.0/8
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
224.0.0.0/4
255.255.255.255/32
0.0.0.0/32
```
