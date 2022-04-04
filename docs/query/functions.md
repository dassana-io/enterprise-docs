# Functions

:::note
Most of the functions listed below are **case insensitive** except for few explicitly mentioned.
:::

## Aggregate Functions

### `avg`

Returns the arithmetic mean as decimal output.

Syntax: `avg(field/function), avg(DISTINCT field/function)`

:::info
Only supported for numerical values.
:::

```sql
SELECT AVG(col1) FROM table1 WHERE col2=’random1’

SELECT AVG(DISTINCT col1) FROM table1 WHERE col2=’random1’
```

### `sum`

Returns the arithmetic sum.

Syntax: `sum(field/function), SUM(DISTINCT field/function)`

:::info
Only supported for numerical values.
:::

```sql
SELECT col2, SUM(col1) FROM table1 GROUP BY col2

SELECT col2, SUM(DISTINCT col1) FROM table1 GROUP BY col2
```

### `count`

Returns the count of number of rows.

Syntax: `count(field/function), COUNT(DISTINCT field/function), COUNT(*)`

```sql
SELECT COUNT(*) FROM table1 WHERE col2=’random1’

SELECT COUNT(col1) FROM table1 WHERE col2=’random1’

SELECT COUNT(DISTINCT col1) FROM table1 WHERE col2=’random1’
```

### `max`

Returns the maximum value.

Syntax: `max(field/function)`

```sql
SELECT role, MAX(salary) FROM employee GROUP BY role
```

### `min`

Returns the minimum value.

Syntax: `min(field/function)`

```sql
SELECT role, MIN(salary) FROM employee GROUP BY role
```

### `top10`

Returns an array of strings with the most frequent 10 values from the specified column. The resulting array is sorted in descending order of frequency.

Syntax: `top10(field/function)`

```sql
SELECT TOP10(role) FROM employee
```

Output: `['role1', 'role2', 'role3', ...]`

## Arithmetic Functions

:::info
Only supported for numerical values.
:::

### `abs`

Calculates the absolute value of the number.

Syntax: `abs(field/function/integer)`

```sql
SELECT ABS(salary) FROM employee WHERE role = 'engineer'
```

### `max2`

Returns the maximum of 2 values.

Syntax: `max2(field/function, field/function/integer)`

```sql
SELECT MAX2(col1, 10) FROM table1

SELECT MAX2(col1, col2) FROM table1
```

### `min2`

Returns the minimum of 2 values.

Syntax: `min2(field/function, field/function/integer)`

```sql
SELECT MIN2(col1, 2) FROM table1

SELECT MIN2(col1, col2) FROM table1
```

## Typecast Functions

### `to_string`

Converts input value to string format.

Syntax: `to_string(field/function)`

```sql
SELECT to_string(col1) FROM table1
```

### `to_int32`

Converts input value to 32 bit integer value. Defaults to 0 if conversion fails.

Syntax: `to_int32(field/function/string)`

```sql
SELECT to_int32(col1) FROM table1

SELECT to_int32('1') FROM table1
```

Output: `1`

### `to_int64`

Converts input value to 64 bit integer value. Defaults to 0 if conversion fails.
Supported syntax - to_int64(field/function/string)

Syntax: `to_int64(field/function/string)`

```sql
SELECT to_int64(col1) FROM table1

SELECT to_int64('1') FROM table1
```

Output: `1`

### `to_decimal`

Converts input value to decimal value with precision specified as the second parameter.

Syntax: `to_decimal(field/function/string, integer)`

```sql
SELECT to_decimal(col1, 2) FROM table1

SELECT to_decimal('1', 5) FROM table1
```

Output:

```
1.00
1.00000
```

### `to_date`

Converts `String/Integer` to calendar date. Accepts integer value in seconds.

Syntax: `to_date(field/function/string/integer)`

```sql
SELECT to_date(col1) FROM table1

SELECT to_date('2022/2/20') FROM table1

SELECT to_date(1640000000) FROM table1
```

Output (formatted as `YYYY-MM-DD`)

```
"2022-2-20"
"2022-2-20"
"2021-12-20"
```

### `to_date_time`

Converts `String/Integer` to calendar date time. Accepts integer value in seconds.

Syntax: `to_date_time(field/function/string/integer)`

```sql
SELECT to_date_time(col1) FROM table1

SELECT to_date_time('2022/2/20') FROM table1

SELECT to_date_time(1640000000) FROM table1
```

Output (formatted as `YYYY-MM-DD HH:MM:SS`)

```
"2021-12-20T11:33:20"
"2022-02-20T00:00:00"
"2021-12-20T11:33:20"
```

### `parse_date_time`

Converts date and time string to DateTime representation. Accepts UNIX timestamp (in sec/millis), date time in different string format, date time with time zone offset.

Syntax: `parse_date_time(field/function/string), parse_date_time(field/function/string, timezone_string)`

```sql
SELECT parse_date_time('1640000000') FROM table1

SELECT parse_date_time('12/12/2020 12:12:57') FROM table1

SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT') FROM table1

SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT', 'Asia/Kolkata') FROM table1
```

Output (formatted as `YYYY-MM-DD HH:MM:SS`) -

```
"2021-12-20T11:33:20"
"2020-12-12T12:12:57"
"2018-08-18T07:22:16"
"2018-08-18T12:52:16+05:30"
```

## String Functions

### `empty`

Returns 1 for empty input string or 0 for non-empty input string.

Syntax: `empty(field/function)`

### `not_empty`

Returns 1 for non-empty input string or 0 for empty input string.

Syntax: `not_empty(field/function)`

### `length`

Returns the length of the string.

Syntax: `length(field/function)`

### `substring`

Returns a substring starting with the byte from the ‘offset’ index to ‘length’ bytes long. Character indexing starts from one.

Syntax: `substring(field/function, offset_integer, length_integer)`

```sql
SELECT substring('abcdefghijk', 4, 5) FROM table1
```

Output: `sql "defgh" `

### `lower`

Converts string to lowercase.

Syntax: `lower(field/function)`

### `upper`

Converts string to uppercase.

Syntax: `upper(field/function)`

### `MD5`

Calculates the MD5 from a string and returns the resulting set of bytes.

Syntax: `MD5(field/function)`

### `SHA`

Calculates SHA-1 hash from a string and returns the resulting set of bytes.

Syntax: `SHA(field/function)`

### `SHA256`

Calculates SHA-256 hash from a string and returns the resulting set of bytes.

Syntax: `SHA256(field/function)`

### `CONCAT`

Concatenates function arguments to single string.

Syntax: `CONACT(field/function/string, ...)`

## IP Address Functions

:::note
The IP Address functions are **case sensitive**.
:::

### `toIPv4`

Converts string form of IPv4 address to IPv4 type.

```sql
SELECT toIPv4('171.225.130.45') FROM table1
```

Output: `"/171.225.130.45"`

### `IPv4NumToString`

Opposite of `toIPv4`

```sql
SELECT IPv4NumToString(to(IPv4('171.225.130.45')) FROM table1
```

Output: `"171.225.130.45"`

### `IPv4ToIPv6`

Converts numeric interpretation of an IPv4 address to string value of IPv6 address in binary format.

```sql
SELECT IPv6NumToString(IPv4ToIPv6(toIPv4('192.168.0.1'))) AS addr FROM table1
```

Output: `"::ffff:192.168.0.1"`

### `IPv4CIDRToRange`

Returns two IPv4 containing the lower range and the higher range for given IPv4 address and CIDR value.

```sql
SELECT IPv4CIDRToRange(toIPv4('192.168.5.2'), 16) FROM table1
```

Output: `"[/192.168.0.0, /192.168.255.255]"`

### `isIPAddressInRange`

Checks if an IP address is contained in given network prefix CIDR. Returns 1 if true or 0 otherwise. This function accepts both IPv4 and IPv6 addresses.

```sql
SELECT isIPAddressInRange('127.0.0.1', '127.0.0.0/8') FROM table1

SELECT isIPAddressInRange('127.12.0.1', '127.0.0.0/24') FROM table1
```

Output:

```
1
0
```

### `toIPv6`

Converts string form of IPv6 address to IPv6 type.

```sql
SELECT toIPv6('2001:438:ffff::407d:1bc1') FROM table1
```

Output: `"/2001:438:ffff:0:0:0:407d:1bc1"`

### `IPv6NumToString`

Opposite of `toIPv6`

```sql
SELECT IPv6NumToString(toIPv6('2001:438:ffff::407d:1bc1')) FROM table1
```

Output: `"2001:438:ffff::407d:1bc1"`

### `IPv6CIDRToRange`

Returns two IPv6 containing the lower range and the higher range for given IPv6 address and CIDR value.

```sql
SELECT IPv6CIDRToRange(toIPv6('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32) FROM table1
```

Output: `"[/2001:db8:0:0:0:0:0:0, /2001:db8:ffff:ffff:ffff:ffff:ffff:ffff]"`

## Datetime Functions

### `FROM_UNIXTIME`

Converts Unix timestamp to calender date time.

Syntax - `FROM_UNIXTIME(field/function/integer), FROM_UNIXTIME(field/function/integer, format_string)`

```sql
SELECT FROM_UNIXTIME(1640000000) FROM table1

SELECT FROM_UNIXTIME(1640000000, '%Y-%m-%d %R:%S') FROM table1

SELECT FROM_UNIXTIME(1640000000, '%Y-%m-%d') FROM table1
```

Output:

```
"2021-12-20T11:33:20"
"2021-12-20 11:33:20"
"2021-12-20"
```

### `TO_UNIX_TIMESTAMP`

Returns Unix timestamp (in second) either from DateTime or string representation of DateTime.

Syntax - `TO_UNIX_TIMESTAMP(field/function/string), TO_UNIX_TIMESTAMP(field/function/string, timezone_string)`

```sql
SELECT TO_UNIX_TIMESTAMP(datetime_col) FROM table1

SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00') FROM table1

SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00', 'Asia/Kolkata') FROM table1
```

### `TO_UNIX_TIMESTAMP_MILLIS`

Returns Unix timestamp (in millis) either from DateTime or string representation of DateTime.

Syntax - `TO_UNIX_TIMESTAMP_MILLIS(field/function/string), TO_UNIX_TIMESTAMP_MILLIS(field/function/string, timezone_string)`

```sql
SELECT TO_UNIX_TIMESTAMP(datetime_col) FROM table1

SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00') FROM table1

SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00', 'Asia/Kolkata') FROM table1
```

### `TO_TIMEZONE`

Converts time or datetime to a specified timezone.

Syntax - `TO_TIMEZONE(field/function, timezone_string)`

```sql
SELECT TO_TIMEZONE(datetime_col, 'Asia/Kolkata') FROM table1
```

### `TO_YEAR`

Extracts year from date or datetime.

Syntax - `TO_YEAR(field/function)`

```sql
SELECT TO_YEAR(datetime_col) FROM table1
```

### `TO_MONTH`

Extracts month of the year (1-12) from date or datetime.

Syntax - TO_MONTH(field/function)

```sql
SELECT TO_MONTH(datetime_col) FROM table1
```

### `TO_DAY_OF_MONTH`

Extracts day of the month (1-31) from date or datetime.

Syntax: `TO_DAY_OF_MONTH(field/function)`

```sql
SELECT TO_DAY_OF_MONTH(datetime_col) FROM table1
```

### `TO_HOUR`

Extracts hour (0-23) from datetime.

Syntax: `TO_HOUR(field/function)`

```sql
SELECT TO_HOUR(datetime_col) FROM table1
```

### `TO_MINUTE`

Extracts minute (0-59) from datetime.

Syntax: `TO_MINUTE(field/function)`

```sql
SELECT TO_MINUTE(datetime_col) FROM table1
```

### `TO_SECOND`

Extracts hour (0-59) from datetime.

Syntax: `TO_SECOND(field/function)`

```sql
SELECT TO_SECOND(datetime_col) FROM table1
```

### `DATE_DIFF`

Returns the difference between two dates or dates with time values in the unit specified. If start datetime and end datetime in different timezone use additional timezone argument which converts both to datetime to specified timezone before calculating difference.

Syntax: `DATE_DIFF(’unit’, startdate_field/function, enddate_field/function), DATE_DIFF(’unit’, startdatetime_field/function, enddatetime_field/function, timezone)`

Supported ‘unit’ values: `second/minute/hour/day/week/month/quarter/year`

```sql
SELECT DATE_DIFF('day', startdate, enddate) FROM table1

SELECT DATE_DIFF('hour', startdatetime, enddatetime, 'Asia/Kolkata') FROM table1
```

### `NOW`

Returns the current date and time.

Syntax: `NOW(), NOW(timezone_string)`

```sql
SELECT NOW() AS current_datetime FROM table1

SELECT NOW('Asia/Kolkata') AS current_datetime_in_ist FROM table1
```

## URL Functions

### `protocol`

Extracts the protocol from a URL.

Syntax: `protocol(field/function/string)`

```sql
SELECT protocol('https://console.cloud.google.com/home/dashboard?project=abc') AS protocol FROM table1
```

Output: `"https"`

### `domain`

Extracts the hostname from a URL.

Syntax: `domain(field/function/string)`

```sql
SELECT domain('https://console.cloud.google.com/home/dashboard?project=abc') AS domain FROM table1
```

Output: `"console.cloud.google.com"`

### `port`

Returns the port from a URL. Defaults to 0 if no port specified in url.

Syntax: `port(field/function/string)`

```sql
SELECT port('https://console.cloud.google.com/home/dashboard?project=abc') AS port FROM table1

SELECT port('https://console.cloud.google.com:8080/home/dashboard?project=abc') AS port FROM table1
```

Output:

```
0
8080
```

### `path`

Returns the path from a URL without query string.

Syntax: `path(field/function/string)`

```sql
SELECT path('https://console.cloud.google.com/home/dashboard?project=abc') AS path FROM table1
```

Output: `"/home/dashboard"`

### `path_full`

Returns the path from a URL with query string and fragment.

Syntax: `path_full(field/function/string)`

```sql
SELECT path_full('https://console.cloud.google.com/home/dashboard?project=abc') AS path_full FROM table1
```

Output: `"/home/dashboard?project=abc"`

### `query_string`

Returns the query string from a URL.

Syntax: `query_string(field/function/string)`

```sql
SELECT query_string('https://console.cloud.google.com/home/dashboard?project=abc') AS query_string FROM table1
```

Output: `"project=abc"`

## JSON Functions

:::note
The JSON functions are **case sensitive**.

$ → it is the special character for complete json object.
:::

### `JSON_EXISTS`

Returns 1 (true) or 0 (false) if the path exists.

Syntax: `JSON_EXISTS(json_field/function, path), JSON_EXISTS($, path_from_root)`

```sql
SELECT JSON_EXISTS($, '$.requestParameters.ipPermissions.items[*].toPort') FROM aws_cloudtrail
```

### `JSON_QUERY`

Returns the raw json-path extracted JSON representation, so even a singular value like $.eventVersion will be returned as ["1.08"].

Syntax: `JSON_QUERY(json_field/function, path), JSON_QUERY($, path_from_root)`

```sql
SELECT JSON_QUERY($, '$.eventVersion') FROM aws_cloudtrail
```

### `JSON_VALUE`

Returns the parsed value, here $.eventVersion will be returned as 1.08.

:::note
Note this will only return primitives and not JSON Objects or Arrays.
:::

Syntax: `JSON_VALUE(json_field/function, path), JSON_VALUE($, path_from_root)`

```sql
SELECT JSON_VALUE($, '$.eventVersion') FROM aws_cloudtrail
```

### `JSON_LENGTH`

Returns the length of a JSON array or object.

Syntax: `JSON_LENGTH($, comma separated path)`

```sql
SELECT JSON_LENGTH($, 'requestParameters', 'ipPermissions', 'items') FROM aws_cloudtrail
```

## Array Functions

### `array_agg`

Aggregates argument values to an array.

:::note
Order of values in aggregated array is indeterminate.
:::

Syntax: `array_agg(field/function), array_agg(DISTINCT field/column)`

```sql
SELECT array_agg(col1) FROM table1

SELECT array_agg(DISTINCT col1) FROM table1
```

## Format Functions

### `human_readable_size`

Translates the size (number of bytes) to human readable rounded size with suffix (KiB, MiB, etc).

Syntax: `human_readable_size(field/function/integer)`

```sql
SELECT human_readable_size(10000) FROM table1
```

Output: `"9.77 KiB"`

### `human_readable_quantity`

Translates the number to human readable rounded number with suffix (thousand, million, billion, etc).

Syntax: `human_readable_quantity(field/function/integer)`

```sql
SELECT human_readable_quantity(10000) FROM table1
```

Output: `"10.00 thousand"`

### `human_readable_duration`

Translates the time delta (in seconds) to human readable time with suffix (year, month, day, hour, minute, second). Also accepts optional parameter to define maximum unit to show (i.e. seconds, minutes, hours, days, months, years).

Syntax: `human_readable_duration(field/function/integer), human_readable_duration(field/function/integer, maximum_unit)`

```sql
SELECT human_readable_quantity(10000) FROM table1
```

Output: `"10.00 thousand"`
