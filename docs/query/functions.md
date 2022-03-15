# Query Functions

List of functions supported in Dassana query - 

## Aggregate Functions

- `avg`
    
    Returns the arithmetic mean as decimal output.
    
    It also supports distinct operation.
    
    *Only supported for numerical column*
    
    Supported syntax - avg(expr), AVG(expr), AVG(DISTINCT expr) 
    
    Example - 
    
    ```sql
    SELECT AVG(col1) FROM table1 WHERE col2=’random1’;
    ```
    
- `sum`
    
    Returns the arithmetic sum. 
    
    It also supports distinct operation.
    
    *Only supported for numerical column*
    
    Supported syntax - sum(expr), SUM(expr), SUM(DISTINCT expr)
    
    Example - 
    
    ```sql
    SELECT col2, SUM(col1) FROM table1 GROUP BY col2;
    ```
    
- `count`
    
    Returns the count of number of rows. 
    
    It also supports distinct operation.
    
    Supported syntax - count(expr), COUNT(expr), COUNT(DISTINCT expr), COUNT(*)
    
    Example - 
    
    ```sql
    SELECT COUNT(DISTINCT col1) FROM table1 WHERE col2=’random1’;
    ```
    
- `max`
    
    Returns the maximum across group of values.
    
    Supported syntax - max(expr), MAX(expr)
    
    Example - 
    
    ```sql
    SELECT role, MAX(salary) FROM employee GROUP BY role;
    ```
    
- `min`
    
    Returns the minimum across group of values.
    
    Supported syntax - min(expr), MIN(expr)
    
    Example - 
    
    ```sql
    SELECT role, MIN(salary) FROM employee GROUP BY role;
    
    ```
    
- `top10`
    
    Returns an array string of approximately most frequent 10 values in the specified column.
    
    Resulting array string is sorted in descending order of frequency of values.
    
    Supported syntax - top10(expr), TOP10(expr)
    
    Example - 
    
    ```sql
    SELECT TOP10(role) FROM employee;
    ```
    

## Arithmetic Functions

Only supported for numerical fields

- `abs`
    
    Calculates the absolute value of the number.
    
    Supported syntax - abs(expr), ABS(expr)
    
    Example - 
    
    ```sql
    SELECT ABS(salary) FROM employee WHERE role = 'engineer';
    ```
    
- `max2`
    
    Returns the maximum of 2 values.
    
    Supported syntax - max2(expr, expr), MAX2(expr, expr)
    
    Example - 
    
    ```sql
    SELECT MAX2(1, 2) FROM table1;
    ```
    
- `min2`
    
    Returns the minimum of 2 values.
    
    Supported syntax - min2(expr, expr), MIN2(expr, expr)
    
    Example - 
    
    ```sql
    SELECT MIN2(1, 2) FROM table1;
    ```
    

## Type cast Functions

- `to_string`
    
    Converts input value to string format.
    
    Supported syntax - to_string(expr), TO_STRING(expr)
    
    Example - 
    
    ```sql
    SELECT to_string(1) FROM table1;
    ```
    
- `to_int`
    
    Converts input value to 32 bit integer value.
    
    Defaults to 0 if conversion fails.
    
    Supported syntax - to_int(expr), TO_INT(expr)
    
    Example - 
    
    ```sql
    SELECT to_int('1') FROM table1;
    ```
    
- `to_long`
    
    Converts input value to 64 bit integer value.
    
    Defaults to 0 if conversion fails.
    
    Supported syntax - to_long(expr), TO_LONG(expr)
    
    Example - 
    
    ```sql
    SELECT to_long('1') FROM table1;
    ```
    
- `to_decimal`
    
    Converts input value to decimal value with 2 decimal place precision.
    
    Defaults to 0.00 if conversion fails.
    
    Supported syntax - to_decimal(expr), TO_DECIMAL(expr)
    
    Example - 
    
    ```sql
    SELECT to_decimal('1') FROM table1;
    ```
    
- `to_date`
    
    Converts `String/Integer` to calendar date.
    
    Output format - `YYYY-MM-DD`
    
    Defaults to `1925-01-01` if conversion fails.
    
    Supported syntax - to_date(expr), TO_DATE(expr)
    
    Example - 
    
    ```sql
    SELECT to_date('1640000000') FROM table1;
    ```
    
- `to_date_time`
    
    Converts `String/Integer` to calendar date time.
    
    Output format - `YYYY-MM-DD HH:MM:SS`
    
    Defaults to `1925-01-01 00:00:00` if conversion fails.
    
    Supported syntax - to_date_time(expr), TO_DATE_TIME(expr)
    
    Example - 
    
    ```sql
    SELECT to_date_time('1640000000') FROM table1;
    ```
    
- `parse_date_time`
    
    Convert date and time string to DateTime representation.
    
    Output format - `YYYY-MM-DD HH:MM:SS`
    
    Defaults to `1925-01-01 00:00:00` if conversion fails.
    
    Accepts UNIX timestamp, date time in different format, date time with time zone offset
    
    Supported syntax - parse_date_time(expr), PARSE_DATE_TIME(expr), parse_date_time(expr, timezone_string), PARSE_DATE_TIME(expr, timezone_string)
    
    Example -
    
    ```sql
    SELECT parse_date_time('1640000000') FROM table1;
    
    SELECT parse_date_time('12/12/2020 12:12:57') FROM table1;
    
    SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT') FROM table1;
    
    SELECT parse_date_time('Sat, 18 Aug 2018 07:22:16 GMT', 'ASIA/KOLKATA') FROM table1;
    ```
    

## String Functions

- `empty`
    
    Returns 1 for empty input string or 0 for non-empty input string. 
    
    Supported syntax - empty(s), EMPTY(s)
    
- `not_empty`
    
    Returns 1 for non-empty input string or 0 for empty input string.
    
    Supported syntax - not_empty(s), NOT_EMPTY(s)
    
- `length`
    
    Returns length of the string.
    
    Supported syntax - length(s), LENGTH(s)
    
- `substring`
    
    Returns a substring starting with the byte from the ‘offset’ index that is ‘length’ bytes long. Character indexing starts from one.
    
    Supported syntax - substring(s, offset, length)
    
- `lower`
    
    Convert string to lowercase.
    
    Supported syntax - lower(s), LOWER(s)
    
- `upper`
    
    Convert string to uppercase.
    
    Supported syntax - upper(s), UPPER(s)
    
- `MD5`
    
    Calculates the MD5 from a string and returns the resulting set of bytes. 
    
    Supported syntax - MD5(s)
    
- `SHA`
    
    Calculates SHA-1 hash from a string and returns the resulting set of bytes.
    
    Supported syntax - SHA(s)
    
- `SHA256`
    
    Calculates SHA-256 hash from a string and returns the resulting set of bytes.
    
    Supported syntax - SHA256(s)
    

## IP Address Functions

- `toIPv4`
    
    Converts string form of IPv4 address to IPv4 type.
    
    Example - 
    
    ```sql
    SELECT toIPv4('171.225.130.45') FROM table1;
    ```
    
    Output - 
    
    ```sql
    
    ```
    
- `IPv4NumToString`
    
    Converts numeric interpretation of IPv4 address to IPv4 address string of format A.B.C.d
    
    Example - 
    
    ```sql
    SELECT IPv4NumToString(1234) FROM table1;
    ```
    
    Output - 
    
    ```sql
    
    ```
    
- `IPv4ToIPv6`
    
    Converts numeric interpretation of an IPv4 address to string value of IPv6 address in binary format.
    
    Example - 
    
    ```sql
    SELECT IPv6NumToString(IPv4ToIPv6(IPv4StringToNum('192.168.0.1'))) AS addr FROM table1;
    ```
    
    Output - 
    
    ```sql
    ::ffff:192.168.0.1
    ```
    
- `IPv4CIDRToRange`
    
    Return two IPv4 containing the lower range and the higher range for given IPv4 address and CIDR value.
    
    Example - 
    
    ```sql
    SELECT IPv4CIDRToRange(toIPv4('192.168.5.2'), 16) FROM table1;
    ```
    
    Output - 
    
    ```sql
    ('192.168.0.0','192.168.255.255')
    ```
    
- `isIPAddressInRange`
    
    Checks if an IP address is contained in given network prefix CIDR. Returns 1 if true or 0 otherwise.
    
    This function accepts both IPv4 and IPv6 addresses.
    
    Example - 
    
    ```sql
    SELECT isIPAddressInRange('127.0.0.1', '127.0.0.0/8') FROM table1;
    ```
    
    Output - 
    
    ```sql
    1
    ```
    
- `toIPv6`
    
    Converts string form of IPv6 address to IPv6 type.
    
    ```sql
    SELECT toIPv6('2001:438:ffff::407d:1bc1') FROM table1;
    ```
    
    Output - 
    
    ```sql
    
    ```
    
- `IPv6NumToString`
    
    Converts numeric interpretation of IPv6 address to IPv6 address string of format `::ffff:111.222.33.44`
    
    Example - 
    
    ```sql
    SELECT IPv6NumToString(1234) FROM table1;
    ```
    
    Output - 
    
    ```sql
    
    ```
    
- `IPv6CIDRToRange`
    
    Return two IPv6 containing the lower range and the higher range for given IPv6 address and CIDR value.
    
    Example - 
    
    ```sql
    SELECT IPv6CIDRToRange(toIPv6('2001:0db8:0000:85a3:0000:0000:ac1f:8001'), 32) FROM table1;
    ```
    
    Output - 
    
    ```sql
    ('2001:db8::','2001:db8:ffff:ffff:ffff:ffff:ffff:ffff')
    ```
    

## Date time Functions

- `FROM_UNIXTIME`
    
    Converts Unix timestamp to calender date time.
    
    Supported syntax - FROM_UNIXTIME(timestamp), FROM_UNIXTIME(timestamp, format_string)
    
    Example - 
    
    ```sql
    SELECT FROM_UNIXTIME(1640000000) FROM table1;
    
    SELECT FROM_UNIXTIME(1640000000, '%Y-%m-%d %R:%S') FROM table1;
    ```
    
- `TO_UNIX_TIMESTAMP`
    
    Returns the Unix timestamp either from DateTime or string representation of DateTime
    
    Supported syntax - TO_UNIX_TIMESTAMP(datetime), TO_UNIX_TIMESTAMP(datetime_string), TO_UNIX_TIMESTAMP(datetime_string, timezone)
    
    Example - 
    
    ```sql
    SELECT TO_UNIX_TIMESTAMP(datetime_col) FROM table1;
    
    SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00') FROM table1;
    
    SELECT TO_UNIX_TIMESTAMP('2022-03-01 00:00:00', 'ASIA/KOLKATA') FROM table1;
    ```
    
- `TO_TIMEZONE`
    
    Converts time or datetime to specified timezone.
    
    Supported syntax - TO_TIMEZONE(time/datetime, timezone)
    
    Example - 
    
    ```sql
    SELECT TO_TIMEZONE(datetime_col, 'ASIA/KOLKATA') FROM table1;
    ```
    
- `TO_YEAR`
    
    Extracts year from date or datetime.
    
    Supported syntax - TO_YEAR(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_YEAR(datetime_col) FROM table1;
    ```
    
- `TO_MONTH`
    
    Extracts month of the year (1-12) from date or datetime.
    
    Supported syntax - TO_MONTH(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_MONTH(datetime_col) FROM table1;
    ```
    
- `TO_DATE`
    
    Extracts date of the month (1-31) from date or datetime.
    
    Supported syntax - TO_DATE(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_DATE(datetime_col) FROM table1;
    ```
    
- `TO_HOUR`
    
    Extracts hour (0-23) from datetime.
    
    Supported syntax - TO_HOUR(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_HOUR(datetime_col) FROM table1;
    ```
    
- `TO_MINUTE`
    
    Extracts minute (0-59) from datetime.
    
    Supported syntax - TO_MINUTE(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_MINUTE(datetime_col) FROM table1;
    ```
    
- `TO_SECOND`
    
    Extracts hour (0-59) from datetime.
    
    Supported syntax - TO_SECOND(datetime)
    
    Example - 
    
    ```sql
    SELECT TO_SECOND(datetime_col) FROM table1;
    ```
    
- `DATE_DIFF`
    
    Returns the difference between two dates or dates with time values in the unit specified. If start datetime and end datetime in different timezone use additional timezone argument which converts both to datetime to specified timezone before calculating difference.
    
    Supported Syntax - DATE_DIFF(’unit’, startdate, enddate), DATE_DIFF(’unit’, startdatetime, enddatetime, timezone)
    
    Possible ‘unit’ values - `second/minute/hour/day/week/month/quarter/year`
    
    Example - 
    
    ```sql
    SELECT DATE_DIFF('day', startdate, enddate) FROM table1;
    
    SELECT DATE_DIFF('hour', startdatetime, enddatetime, 'ASIA/KOLKATA') FROM table1;
    ```
    
- `NOW`
    
    Returns the current date and time.
    
    Supported syntax - NOW(), NOW(timezone)
    
    Example - 
    
    ```sql
    SELECT NOW() AS current_datetime FROM table1;
    
    SELECT NOW('ASIA/KOLKATA') AS current_datetime_in_ist FROM table1;
    ```
    

## URL Functions

- `protocol`
    
    Extracts the protocol from a URL.
    
    Supported syntax - protocol(url_string)
    
    Example - 
    
    ```sql
    SELECT protocol(url_col) AS protocol FROM table1;
    ```
    
- `domain`
    
    Extracts the hostname from a URL.
    
    Supported syntax - domain(url_string)
    
    Example - 
    
    ```sql
    SELECT domain(url_col) AS domain FROM table1;
    ```
    
- `port`
    
    Returns the port from a URL. Defaults to 0 if no port specified in url.
    
    Supported syntax - port(url_string)
    
    Example - 
    
    ```sql
    SELECT port(url_col) AS port FROM table1;
    ```
    
- `path`
    
    Returns the path from a URL without query string.
    
    Supported syntax - path(url_string)
    
    Example - 
    
    ```sql
    SELECT port(url_col) AS path FROM table1;
    ```
    
- `path_full`
    
    Returns the path from a URL with query string and fragment.
    
    Supported syntax - path_full(url_string)
    
    Example - 
    
    ```sql
    SELECT path_full(url_col) AS path_full FROM table1;
    ```
    
- `query_string`
    
    Returns the query string from a URL.
    
    Supported syntax - query_string(url_string)
    
    Example - 
    
    ```sql
    SELECT query_string(url_col) AS query_string FROM table1;
    ```
    

## JSON Functions

$ → it is the special character for complete json object, supported in all JSON function.

- `JSON_EXISTS`
    
    Returns 1 (true) or 0 (false) if the path exists.
    
    Supported syntax - JSON_EXISTS(json_field, path), JSON_EXISTS($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_EXISTS($, '$.requestParameters.ipPermissions.items[*].toPort') FROM aws_cloudtrail
    ```
    
- `JSON_QUERY`
    
    Returns the raw json-path extracted JSON representation, so even a singular value like $.eventVersion will be returned as ["1.08"].
    
    Supported syntax - JSON_QUERY(json_field, path), JSON_QUERY($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_QUERY($, '$.eventVersion') FROM aws_cloudtrail
    ```
    
- `JSON_VALUE`
    
    Returns the parsed value, here $.eventVersion will be returned as 1.08. 
    
    *Note this will only return primitives and not JSON Objects or Arrays.*
    
    Supported syntax - JSON_VALUE(json_field, path), JSON_VALUE($, path_from_root)
    
    Example - 
    
    ```sql
    SELECT JSON_VALUE($, '$.eventVersion') FROM aws_cloudtrail
    ```
    

## Array Functions

- `array_agg`
    
    Aggregates argument values to an array.
    
    *Order of values in aggregated array is indeterminate.* 
    
    Supported syntax - array_agg()
    
    Example - 
    
    ```sql
    SELECT JSON_VALUE($, '$.eventVersion') FROM aws_cloudtrail
    ```
