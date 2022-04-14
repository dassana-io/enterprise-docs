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
Replace the headers in the URL with your CSV headers.

```bash
curl https://ingestion.dassana.cloud/logs?withHeader=false&csvHeader=header1,header2,header3 \
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

Alternatively, if you are ingesting csv logs, include the following output. Modify the csvHeader parameter in the uri to include your csv headers.

```html
<match your_input>
  @type http
  endpoint https://ingestion.dassana.cloud/logs?withHeader=false&csvHeader=time,duration,SrcDevice,DstDevice,Protocol,SrcPort,DstPort,SrcPackets,DstPackets,SrcBytes,SrcBytes
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

Alternatively, if you are ingesting csv logs, include the following sink. Modify the csvHeader parameter in the uri to include your csv headers.

```yaml
#####             #####
## Your source here  ##
#####             #####

[sinks.dassana]
type = "http"
inputs = [ "YOUR_SOURCE_NAME" ]
uri = "https://ingestion.dassana.cloud/logs?withHeader=false&csvHeader=time,duration,SrcDevice,DstDevice,Protocol,SrcPort,DstPort,SrcPackets,DstPackets,SrcBytes,SrcBytes"
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
