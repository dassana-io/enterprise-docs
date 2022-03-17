# Query Functions

List of functions supported in Dassana query - 

*Note - Most of the functions listed below are **case insensitive** except for few explicitly mentioned.*

## Aggregate Functions

- `avg`
    
    Returns the arithmetic mean as decimal output.
    
    It also supports distinct operation.
    
    *Only supported for numerical value*
    
    Supported syntax - avg(field/function), avg(DISTINCT field/function) 
    
    Example - 
    
    ```sql
    SELECT AVG(col1) FROM table1 WHERE col2=’random1’;
    
    SELECT AVG(DISTINCT col1) FROM table1 WHERE col2=’random1’;
    ```
    
- `sum`
    
    Returns the arithmetic sum. 
    
    It also supports distinct operation.
    
    *Only supported for numerical value*
    
    Supported syntax - sum(field/function), SUM(DISTINCT field/function)
    
    Example - 
    
    ```sql
    SELECT col2, SUM(col1) FROM table1 GROUP BY col2;
    
    SELECT col2, SUM(DISTINCT col1) FROM table1 GROUP BY col2;
    ```
    
- `count`
    
    Returns the count of number of rows. 
    
    It also supports distinct operation.
    
    Supported syntax - count(field/function), COUNT(DISTINCT field/function), COUNT(*)
    
    Example - 
    
    ```sql
    SELECT COUNT(*) FROM table1 WHERE col2=’random1’;
    
    SELECT COUNT(col1) FROM table1 WHERE col2=’random1’;
    
    SELECT COUNT(DISTINCT col1) FROM table1 WHERE col2=’random1’;
    ```
    
- `max`
    
    Returns the maximum across group of values.
    
    Supported syntax - max(field/function)
    
    Example - 
    
    ```sql
    SELECT role, MAX(salary) FROM employee GROUP BY role;
    ```
    
- `min`
    
    Returns the minimum across group of values.
    
    Supported syntax - min(field/function), MIN(field/function)
    
    Example - 
    
    ```sql
    SELECT role, MIN(salary) FROM employee GROUP BY role;
    
    ```
    
- `top10`
    
    Returns an array string of approximately most frequent 10 values in the specified column.
    
    Resulting array string is sorted in descending order of frequency of values.
    
    Supported syntax - top10(field/function)
    
    Example - 
    
    ```sql
    SELECT TOP10(role) FROM employee;
    ```
    
    Output - 
    
    ```
    ['role1', 'role2', 'role3',.....]
    ```
    

## Arithmetic Functions

Only supported for numerical fields

- `abs`
    
    Calculates the absolute value of the number.
    
    Supported syntax - abs(field/function/integer)
    
    Example - 
    
    ```sql
    SELECT ABS(salary) FROM employee WHERE role = 'engineer';
    ```
    
- `max2`
    
    Returns the maximum of 2 values.
    
    Supported syntax - max2(field/function, field/function/integer)
    
    Example - 
    
    ```sql
    SELECT MAX2(col1, 10) FROM table1;
    ```
    
- `min2`
    
    Returns the minimum of 2 values.
    
    Supported syntax - min2(field/function, field/function/integer)
    
    Example - 
    
    ```sql
    SELECT MIN2(col1, 2) FROM table1;
    ```
    

## Type cast Functions

- `to_string`
    
    Converts input value to string format.
    
    Supported syntax - to_string(field/function)
    
    Example - 
    
    ```sql
    SELECT to_string(col1) FROM table1;
    ```
    
- `to_int`
    
    Converts input value to 32 bit integer value.
    
    Defaults to 0 if conversion fails.
    
    Supported syntax - to_int(field/function/string)
    
    Example - 
    
    ```sql
    SELECT to_int('1') FROM table1;
    ```
    
    Output - 
    
    ```
    1
    ```
    
- `to_long`
    
    Converts input value to 64 bit integer value.
    
    Defaults to 0 if conversion fails.
    
    Supported syntax - to_long(field/function/string)
    
    Example - 
    
    ```sql
    SELECT to_long('1') FROM table1;
    ```
    
    Output - 
    
    ```
    1
    ```
    
- `to_decimal`
    
    Converts input value to decimal value with precision specified as second parameter
    
    Supported syntax - to_decimal(field/function/string, integer)
    
    Example - 
    
    ```sql
    SELECT to_decimal('1', 2) FROM table1;
    
    SELECT to_decimal('1', 5) FROM table1;
    ```
    
    Output - 
    
    ```
    1.00
    1.00000
    ```
    
- `to_date`
    
    Converts `String/Integer` to calendar date. Accepts integer value in seconds.
    
    Output format - `YYYY-MM-DD`
    
    Supported syntax - to_date(field/function/string/integer)
    
    Example - 
    
    ```sql
    SELECT to_date('2022/2/20') FROM table1;
    
    SELECT to_date(1640000000) FROM table1;
    ```
    
    Output - 
    
    ```
    "2022-2-20"
    "2021-12-20"
    ```
    
- `to_date_time`
    
    Converts `String/Integer` to calendar date time. Accepts integer value in seconds.
    
    Output format - `YYYY-MM-DD HH:MM:SS`
    
    Supported syntax - to_date_time(field/function/string/integer)
    
    Example - 
    
    ```sql
    SELECT to_date_time(1640000000) FROM table1;
    ```
    
    Output - 
    
    ```
    "2021-12-20T11:33:20"
    ```
    
- `parse_date_time`
    
    Convert date and time string to DateTime representation.
    
    Output format - `YYYY-MM-DD HH:MM:SS`
    
    Accepts UNIX timestamp, date time in different format, date time with time zone offset.
    
    Supported syntax - parse_date_time(field/function/string), parse_date_time(field/function/string, timezone_string)
    
    Example -
    
    ```sql
    SELECT parse_date_time('1640000000') FROM table1;
    
    SELECT parse_date_time('12/12/2020 12:12:57') FROM table1;
    
    SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT') FROM table1;
    
    SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT', 'Asia/Kolkata') FROM table1;
    ```
    
    Output - 
    
    ```
    "2021-12-20T11:33:20"
    "2020-12-12T12:12:57"
    "2018-08-18T07:22:16"
    "2018-08-18T12:52:16+05:30"
    ```
    

## String Functions

- `empty`
    
    Returns 1 for empty input string or 0 for non-empty input string. 
    
    Supported syntax - empty(field/function)
    
- `not_empty`
    
    Returns 1 for non-empty input string or 0 for empty input string.
    
    Supported syntax - not_empty(field/function)
    
- `length`
    
    Returns length of the string.
    
    Supported syntax - length(field/function)
    
- `substring`
    
    Returns a substring starting with the byte from the ‘offset’ index to ‘length’ bytes long. Character indexing starts from one.
    
    Supported syntax - substring(field/function, offset_integer, length_integer)
    
    Example - 
    
    ```sql
    SELECT substring('abcdefghijk', 4, 5) FROM table1;
    ```
    
    Output - 
    
    ```sql
    "defgh"
    ```
    
- `lower`
    
    Convert string to lowercase.
    
    Supported syntax - lower(field/function)
    
- `upper`
    
    Convert string to uppercase.
    
    Supported syntax - upper(field/function)
    
- `MD5`
    
    Calculates the MD5 from a string and returns the resulting set of bytes. 
    
    Supported syntax - MD5(field/function)
    
- `SHA`
    
    Calculates SHA-1 hash from a string and returns the resulting set of bytes.
    
    Supported syntax - SHA(field/function)
    
- `SHA256`
    
    Calculates SHA-256 hash from a string and returns the resulting set of bytes.
    
    Supported syntax - SHA256(field/function)
    

## IP Address Functions

These functions are **case-sensitive**.

- `toIPv4`
    
    Converts string form of IPv4 address to IPv4 type.
    
    Example - 
    
    ```sql
    SELECT toIPv4('171.225.130.45') FROM table1;
    ```
    
    Output - 
    
    ```
    "/171.225.130.45"
    ```
    
- `IPv4NumToString`
    
    Opposite of `toIPv4`
    
    Example - 
    
    ```sql
    SELECT IPv4NumToString(to(IPv4('171.225.130.45')) FROM table1;
    ```
    
    Output - 
    
    ```
    "171.225.130.45"
    ```
    
- `IPv4ToIPv6`
    
    Converts numeric interpretation of an IPv4 address to string value of IPv6 address in binary format.
    
    Example - 
    
    ```sql
    SELECT IPv6NumToString(IPv4ToIPv6(toIPv4('192.168.0.1'))) AS addr FROM table1;
    ```
    
    Output - 
    
    ```
    "::ffff:192.168.0.1"
    ```
    
- `IPv4CIDRToRange`
    
    Return two IPv4 containing the lower range and the higher range for given IPv4 address and CIDR value.
    
    Example - 
    
    ```sql
    SELECT IPv4CIDRToRange(toIPv4('192.168.5.2'), 16) FROM table1;
    ```
    
    Output - 
    
    ```
    "[/192.168.0.0, /192.168.255.255]"
    ```
    
- `isIPAddressInRange`
    
    Checks if an IP address is contained in given network prefix CIDR. Returns 1 if true or 0 otherwise.
    
    This function accepts both IPv4 and IPv6 addresses.
    
    Example - 
    
    ```sql
    SELECT isIPAddressInRange('127.0.0.1', '127.0.0.0/8') FROM table1;
    
    SELECT isIPAddressInRange('127.12.0.1', '127.0.0.0/24') FROM table1;
    ```
    
    Output - 
    
    ```
    1
    0
    ```
    
- `toIPv6`
    
    Converts string form of IPv6 address to IPv6 type.
    
    ```sql
    SELECT toIPv6('2001:438:ffff::407d:1bc1') FROM table1;
    ```
    
    Output - 
    
    ```
    "/2001:438:ffff:0:0:0:407d:1bc1"
    ```
    
- `IPv6NumToString`
    
    Opposite of `toIPv6`
    
    Example - 
    
    ```sql
    SELECT IPv6NumToString(toIPv6('2001:438:ffff::407d:1bc1')) FROM table1;
    ```
    
    Output - 
    
    ```
    "2001:438:ffff::407d:1bc1"
    ```
    
- `IPv6CIDRToRange`
    
    Return two IPv6 containing the lower range and the higher range for given IPv6 address and CIDR value.
    
    Example - 
    
    ```sql
    SELECT IPv6CIDRToRange(toIPv6('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32) FROM table1;
    ```
    
    Output - 
    
    ```sql
    "[/2001:db8:0:0:0:0:0:0, /2001:db8:ffff:ffff:ffff:ffff:ffff:ffff]"
    ```
    

## Date time Functions

- `FROM_UNIXTIME`
    
    Converts Unix timestamp to calender date time.
    
    Supported syntax - FROM_UNIXTIME(field/function/integer), FROM_UNIXTIME(field/function/integer, format_string)
    
    Example - 
    
    ```sql
    SELECT FROM_UNIXTIME(1640000000) FROM table1;
    
    SELECT FROM_UNIXTIME(1640000000, '%Y-%m-%d %R:%S') FROM table1;
    
    SELECT FROM_UNIXTIME(1640000000, '%Y-%m-%d') FROM table1;
    ```
    
    Output - 
    
    ```
    "2021-12-20T11:33:20"
    "2021-12-20 11:33:20"
    "2021-12-20"
    ```
    
- `TO_UNIX_TIMESTAMP`
    
    Returns the Unix timestamp either from DateTime or string representation of DateTime
    
    Supported syntax - TO_UNIX_TIMESTAMP(field/function/string), TO_UNIX_TIMESTAMP(field/function/string, timezone_string)
    
    Example - 
    
    ```sql
    SELECT TO_UNIX_TIMESTAMP(datetime_col) FROM table1;
    
    SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00') FROM table1;
    
    SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00', 'Asia/Kolkata') FROM table1;
    ```
    
- `TO_TIMEZONE`
    
    Converts time or datetime to specified timezone.
    
    Supported syntax - TO_TIMEZONE(field/function, timezone_string)
    
    Example - 
    
    ```sql
    SELECT TO_TIMEZONE(datetime_col, 'Asia/Kolkata') FROM table1;
    ```
    
- `TO_YEAR`
    
    Extracts year from date or datetime.
    
    Supported syntax - TO_YEAR(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_YEAR(datetime_col) FROM table1;
    ```
    
- `TO_MONTH`
    
    Extracts month of the year (1-12) from date or datetime.
    
    Supported syntax - TO_MONTH(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_MONTH(datetime_col) FROM table1;
    ```
    
- `TO_DAY_OF_MONTH`
    
    Extracts day of the month (1-31) from date or datetime.
    
    Supported syntax - TO_DAY_OF_MONTH(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_DAY_OF_MONTH(datetime_col) FROM table1;
    ```
    
- `TO_HOUR`
    
    Extracts hour (0-23) from datetime.
    
    Supported syntax - TO_HOUR(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_HOUR(datetime_col) FROM table1;
    ```
    
- `TO_MINUTE`
    
    Extracts minute (0-59) from datetime.
    
    Supported syntax - TO_MINUTE(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_MINUTE(datetime_col) FROM table1;
    ```
    
- `TO_SECOND`
    
    Extracts hour (0-59) from datetime.
    
    Supported syntax - TO_SECOND(field/function)
    
    Example - 
    
    ```sql
    SELECT TO_SECOND(datetime_col) FROM table1;
    ```
    
- `DATE_DIFF`
    
    Returns the difference between two dates or dates with time values in the unit specified. If start datetime and end datetime in different timezone use additional timezone argument which converts both to datetime to specified timezone before calculating difference.
    
    Supported Syntax - DATE_DIFF(’unit’, startdate_field/function, enddate_field/function), DATE_DIFF(’unit’, startdatetime_field/function, enddatetime_field/function, timezone)
    
    Possible ‘unit’ values - `second/minute/hour/day/week/month/quarter/year`
    
    Example - 
    
    ```sql
    SELECT DATE_DIFF('day', startdate, enddate) FROM table1;
    
    SELECT DATE_DIFF('hour', startdatetime, enddatetime, 'Asia/Kolkata') FROM table1;
    ```
    
- `NOW`
    
    Returns the current date and time.
    
    Supported syntax - NOW(), NOW(timezone_string)
    
    Example - 
    
    ```sql
    SELECT NOW() AS current_datetime FROM table1;
    
    SELECT NOW('Asia/Kolkata') AS current_datetime_in_ist FROM table1;
    ```
    

## URL Functions

- `protocol`
    
    Extracts the protocol from a URL.
    
    Supported syntax - protocol(field/function/string)
    
    Example - 
    
    ```sql
    SELECT protocol('https://console.cloud.google.com/home/dashboard?project=abc') AS protocol FROM table1;
    ```
    
    Output - 
    
    ```
    "https"
    ```
    
- `domain`
    
    Extracts the hostname from a URL.
    
    Supported syntax - domain(field/function/string)
    
    Example - 
    
    ```sql
    SELECT domain('https://console.cloud.google.com/home/dashboard?project=abc') AS domain FROM table1;
    ```
    
    Output - 
    
    ```
    "console.cloud.google.com",
    ```
    
- `port`
    
    Returns the port from a URL. Defaults to 0 if no port specified in url.
    
    Supported syntax - port(field/function/string)
    
    Example - 
    
    ```sql
    SELECT port('https://console.cloud.google.com/home/dashboard?project=abc') AS port FROM table1;
    
    SELECT port('https://console.cloud.google.com:8080/home/dashboard?project=abc') AS port FROM table1;
    ```
    
    Output - 
    
    ```
    0
    8080
    ```
    
- `path`
    
    Returns the path from a URL without query string.
    
    Supported syntax - path(field/function/string)
    
    Example - 
    
    ```sql
    SELECT path('https://console.cloud.google.com/home/dashboard?project=abc') AS path FROM table1;
    ```
    
    Output - 
    
    ```
    "/home/dashboard"
    ```
    
- `path_full`
    
    Returns the path from a URL with query string and fragment.
    
    Supported syntax - path_full(field/function/string)
    
    Example - 
    
    ```sql
    SELECT path_full('https://console.cloud.google.com/home/dashboard?project=abc') AS path_full FROM table1;
    ```
    
    Output - 
    
    ```
    "/home/dashboard?project=abc"
    ```
    
- `query_string`
    
    Returns the query string from a URL.
    
    Supported syntax - query_string(field/function/string)
    
    Example - 
    
    ```sql
    SELECT query_string('https://console.cloud.google.com/home/dashboard?project=abc') AS query_string FROM table1;
    ```
    
    Output - 
    
    ```
    "project=abc"
    ```
    

## JSON Functions

These functions are **case-sensitive**.

$ → it is the special character for complete json object.

- `JSON_EXISTS`
    
    Returns 1 (true) or 0 (false) if the path exists.
    
    Supported syntax - JSON_EXISTS(json_field/function, path), JSON_EXISTS($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_EXISTS($, '$.requestParameters.ipPermissions.items[*].toPort') FROM aws_cloudtrail
    ```
    
- `JSON_QUERY`
    
    Returns the raw json-path extracted JSON representation, so even a singular value like $.eventVersion will be returned as ["1.08"].
    
    Supported syntax - JSON_QUERY(json_field/function, path), JSON_QUERY($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_QUERY($, '$.eventVersion') FROM aws_cloudtrail
    ```
    
- `JSON_VALUE`
    
    Returns the parsed value, here $.eventVersion will be returned as 1.08. 
    
    *Note this will only return primitives and not JSON Objects or Arrays.*
    
    Supported syntax - JSON_VALUE(json_field/function, path), JSON_VALUE($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_VALUE($, '$.eventVersion') FROM aws_cloudtrail
    ```
    

## Array Functions

- `array_agg`
    
    Aggregates argument values to an array.
    
    *Order of values in aggregated array is indeterminate.* 
    
    Supported syntax - array_agg(field/function), array_agg(DISTINCT field/column)
    
    Example - 
    
    ```sql
    SELECT array_agg(col1) FROM table1;
    
    SELECT array_agg(DISTINCT col1) FROM table1;
    ```
    

## Format Functions

- `human_readable_size`
    
    Translate the size (number of bytes) to human readable rounded size with suffix (KiB, MiB, etc).
    
    Supported syntax - human_readable_size(field/function/integer)
    
    Example - 
    
    ```sql
    SELECT human_readable_size(10000) FROM table1;
    ```
    
    Output - 
    
    ```
    "9.77 KiB"
    ```
    
- `human_readable_quantity`
    
    Translate the number to human readable rounded number with suffix (thousand, million, billion, etc).
    
    Supported syntax - human_readable_quantity(field/function/integer)
    
    Example - 
    
    ```sql
    SELECT human_readable_quantity(10000) FROM table1;
    ```
    
    Output - 
    
    ```
    "10.00 thousand"
    ```
    
- `human_readable_duration`
    
    Translate the time delta (in seconds) to human readable time with suffix (year, month, day, hour, minute, second).
    
    It also accepts optional parameter to define maximum unit to show i.e. seconds, minutes, hours, days, months, years
    
    Supported syntax - human_readable_duration(field/function/integer), human_readable_duration(field/function/integer, maximum_unit)
    
    Example - 
    
    ```sql
    SELECT human_readable_quantity(10000) FROM table1;
    ```
    
    Output - 
    
    ```
    "10.00 thousand"
    ```
