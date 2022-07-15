# URL Validation

You can use any endpoint url in the webhook integration page which meets below conditions

1. Only ```HTTPS``` Urls are allowed.
2. Urls/Ip Addresses cannot be in below CIDR ranges

```json
127.0.0.0/8
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
224.0.0.0/4
255.255.255.255/32
0.0.0.0/32
```