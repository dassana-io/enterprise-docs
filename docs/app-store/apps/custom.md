# Custom

In this guide, we'll learn how to send your custom logs to Dassana. Currently, Dassana can ingest the following log formats: [nd-json](#nd-json), [json object](#json-object), and [csv](#csv). We've also included instructions for configuring log aggregators such as [Fluentd](#fluentd) and [Vector](#vector) to stream your logs to Dassana.

## Log Types

### nd-json

```bash
curl https://ingestion.dassana.cloud/logs \
-X POST \
-H 'Content-type: application/x-ndjson' \
-H 'x-dassana-app-id: YOUR_APP_ID' \
-H 'x-dassana-token: YOUR_DASSANA_TOKEN' \
--data-binary '{"foo": "bar"}
{"bar": "baz"}
{"baz": "qux"}'
```

More info on the nd-json format can be found [here](http://ndjson.org).

:::info Additional Headers
To send gzipped data, add the following headers:

```bash
Content-Encoding: gzip
Accept-Encoding: gzip
```

---

```json
{
  "Records": [...]
}
```

If your events are encapsulated in an object (as seen above), add a `x-dassana-data-key: Records` header so that the array of events can be processed accordingly.
:::

### csv
There are two CSV data types we support: data with headers and without. For example:

```csv
time,duration,SrcDevice,DstDevice,Protocol,SrcPort,DstPort,SrcPackets,DstPackets,SrcBytes,SrcBytes
761,4434,Comp132598,Comp817788,6,Port12597,22,89159,85257,15495068,69768940
764,13161,Comp178973,Comp164069,17,137,137,325,0,30462,0
765,14369,Comp492856,Mail,6,Port30344,443,227,214,32300,9844
765,14431,Comp782574,Mail,6,Port28068,443,1637,3313,75302,1220077
```
The above data contains headers on the first line. If your CSV data is of this type, ingest the data as follows:

```bash
curl https://ingestion.dassana.cloud/logs?withHeader=true \
-X POST \
-H 'Content-type: text/csv' \
-H 'x-dassana-app-id: YOUR_APP_ID' \
-H 'x-dassana-token: YOUR_DASSANA_TOKEN' \
--data-binary @foo.csv
```

If your data does not contain headers, for example:
```csv
761,4434,Comp132598,Comp817788,6,Port12597,22,89159,85257,15495068,69768940
764,13161,Comp178973,Comp164069,17,137,137,325,0,30462,0
765,14369,Comp492856,Mail,6,Port30344,443,227,214,32300,9844
765,14431,Comp782574,Mail,6,Port28068,443,1637,3313,75302,1220077
```

Explicity include the headers in the csvHeader parameter to ingest as follows:

```bash
curl https://ingestion.dassana.cloud/logs?withHeader=false&csvHeader=time,duration,SrcDevice,DstDevice,Protocol,SrcPort,DstPort,SrcPackets,DstPackets,SrcBytes,SrcBytes \
-X POST \
-H 'Content-type: text/csv' \
-H 'x-dassana-app-id: YOUR_APP_ID' \
-H 'x-dassana-token: YOUR_DASSANA_TOKEN' \
--data-binary @foo.csv
```

:::info gzip
To send gzipped data, add the following headers:

```bash
Content-Encoding: gzip
Accept-Encoding: gzip
```

:::

### json object

```bash
curl https://ingestion.dassana.cloud/logs \
-X POST \
-H 'Content-type: application/json' \
-H 'x-dassana-app-id: YOUR_APP_ID' \
-H 'x-dassana-token: YOUR_DASSANA_TOKEN' \
--data-binary '{ "foo": "bar" }'
```

:::info Gotchas
JSON arrays and gzip encoding are not supported for `Content-type: application/json`. If you want to send json arrays then use the [nd-json](#nd-json) header.
:::

## Aggregators

### Fluentd

In this section, we'll configure Fluentd to stream logs to Dassana.

1. Locate your configuration file:

-   The default (td-agent) config file path is `/etc/td-agent/td-agent.conf`
-   For calyptia-fluentd the default config file path is `/etc/calyptia-fluentd/calyptia-fluentd.conf`
-   If you installed via Ruby Gem, create the configuration file as follows
    ```shell
    sudo fluentd --setup /etc/fluent
    sudo vi /etc/fluent/fluent.conf
    ```
-   For a docker container the default config file path is `/fluentd/etc/fluent.conf`

2. Edit your source in the configuration file as follows.

Add the following keys to your source
```html
<source>
  ...
  time_key time # This must match the name of the time key extracted in Dassana's app setup
  time_format %Y-%m-%dT%H:%M:%S # This must match the time format selected in Dassana's app setup
  ...
</source>
```

3. Add the following output with your Dassana token and App Id to your configuration file. Ensure the match pattern equals the tag you set in the source.

```html
<match your_input>
  @type http
  endpoint https://ingestion.dassana.cloud/logs
  headers {"x-dassana-app-id":"YOUR_APP_ID", "x-dassana-token":"YOUR_TOKEN", "Content-type":"application/x-ndjson"}
  bulk_request true
  <buffer>
    @type memory
    chunk_limit_size 5MB
    flush_interval 1s
    retry_max_times 5
    retry_type periodic
    retry_wait 2
  </buffer>
</match>
```

Alternatively, if you are ingesting csv logs, include the following output. If your data does not include headers, set the withHeader parameter in the endpoint to be false, and add a csvHeader parameter to equal your headers as comma-seperated values. You can find an example of this in the CSV ingestion section above.

```html
<match your_input>
  @type http
  endpoint https://ingestion.dassana.cloud/logs?withHeader=true
  headers {"x-dassana-app-id":"YOUR_APP_ID", "x-dassana-token":"YOUR_TOKEN", "Content-type":"text/csv"}
  <buffer>
    @type memory
    chunk_limit_size 5MB
    flush_interval 1s
    retry_max_times 5
    retry_type periodic
    retry_wait 2
  </buffer>
</match>
```

4. Restart or start Fluentd after editing the configuration file. Ex:

```shell
sudo systemctl restart td-agent
```

### Vector

In this section, we'll configure Vector to stream logs to Dassana.

1. Edit your vector.toml config file to include the following sink if you are ingesting json logs

```yaml
#####             #####
## Your source here  ##
#####             #####

[sinks.dassana]
type = "http"
inputs = [ "YOUR_SOURCE_NAME" ]
uri = "https://ingestion.dassana.cloud/logs"
compression = "gzip"
encoding.codec = "ndjson" 
batch.max_bytes = 100000
[sinks.dassana.request.headers]
Content-type = "application/x-ndjson"
Content-Encoding = "gzip"
x-dassana-app-id = "YOUR_APP_ID"
x-dassana-token = "YOUR_DASSANA_TOKEN"
```

Alternatively, if you are ingesting csv logs, include the following sink. If your data does not include headers, set the withHeader parameter in the endpoint to be false, and add a csvHeader parameter to equal your headers as comma-seperated values. You can find an example of this in the CSV ingestion section above.

```yaml
#####             #####
## Your source here  ##
#####             #####

[sinks.dassana]
type = "http"
inputs = [ "YOUR_SOURCE_NAME" ]
uri = "https://ingestion.dassana.cloud/logs?withHeader=true"
compression = "gzip"
encoding.codec = "text"
batch.max_bytes = 100000
[sinks.dassana.request.headers]
Content-type = "text/csv"
Content-Encoding = "gzip"
x-dassana-app-id = "YOUR_APP_ID"
x-dassana-token = "YOUR_DASSANA_TOKEN"
```

2. Restart Vector after editing the configuration file. Ex:

```shell
sudo systemctl start vector
```
