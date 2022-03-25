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

```bash
curl https://ingestion.dassana.cloud/logs \
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
JSON arrays and gzip encoding is not supported
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

2. Edit the configuration file to include your custom log source. We'll use Apache logs for this example.

```html
<source>
  @type tail
  path /var/log/apache2/access.log # Path to your custom logs
  pos_file /var/log/td-agent/apache-access.log.pos # This file will be created to keep track of the file's inode and position in the file
  tag apache.access # Can be anything you like, reference this name in the output (discussed below)
  time_key time # This must match the name of the time key extracted in Dassana's app setup
  time_format %Y-%m-%dT%H:%M:%S # This must match the time format selected in Dassana's app setup
  <parse>
  @type apache2 # Dependant on your custom log type
  </parse>
</source>
```

Fluentd will now tail your custom log file, parse the relevant fields, and route logs as they're added to the output – which we will now configure.

3. Edit the configuration file to include the following output with your Dassana token. Ensure the match pattern equals the tag you set in the source.

```html
<match apache.access>
	@type http endpoint https://ingestion.dassana.cloud/logs open_timeout 2
	headers {"x-dassana-app-id":"YOUR_APP_ID",
	"x-dassana-token":"YOUR_DASSANA_TOKEN"}
	<buffer> flush_interval 60s </buffer> # Optionally, use chunk_limit_size
</match>
```

4. Restart or start Fluentd after editing the configuration file. Ex:

```shell
sudo systemctl restart td-agent
```

### Vector

In this section, we'll configure Vector to stream logs to Dassana.

1. Edit your vector.toml config file to include the following sink

```yaml
#####             #####
## Your source here  ##
#####             #####

[sinks.dassana]
type = "http"
inputs = [ "YOUR_INPUT" ]
uri = "https://ingestion.dassana.cloud/logs"
compression = "none"
encoding.codec = "ndjson"
[sinks.dassana.request.headers]
Content-type = application/x-ndjson
x-dassana-app-id = "YOUR_APP_ID"
x-dassana-token = "YOUR_DASSANA_TOKEN"
```

2. Restart Vector after editing the configuration file. Ex:

```shell
sudo systemctl start vector
```
