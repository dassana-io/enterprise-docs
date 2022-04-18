# Apache

Apache access logs record standard information about incoming http requests. In this guide, we'll setup forwarding of Apache access logs to Dassana using Fluentd.

:::note Prerequisite
[Install Fluentd](https://docs.fluentd.org/installation) on the machine running the Apache Server.
:::

## Fluentd Configuration

We'll now configure Apache as an input to Fluentd and Dassana as an output.

1. Locate your configuration file:

-   The default (td-agent) config file path is `/etc/td-agent/td-agent.conf`
-   For calyptia-fluentd the default config file path is `/etc/calyptia-fluentd/calyptia-fluentd.conf`
-   If you installed via Ruby Gem, create the configuration file as follows
    ```shell
    sudo fluentd --setup /etc/fluent
    sudo vi /etc/fluent/fluent.conf
    ```
-   For a docker container the default config file path is `/fluentd/etc/fluent.conf`

2. Edit the configuration file to include the following source

```html
<source>
  @type tail
  path /var/log/apache2/access.log # Path to your Apache logs
  pos_file /var/log/td-agent/apache-access.log.pos # This file will be created to keep track of the file's inode and position in the file
  tag apache.access # Can be anything you like, reference this name in the output (discussed below)
  time_key time # If you choose to change the name of the time_key, you must configure this as a Dassana custom app
  time_format %Y-%m-%dT%H:%M:%S # If you choose to change the time format, you must configure this as a Dassana custom app
  <parse>
  @type apache2
  </parse>
</source>
```

Fluentd will now tail your Apache log file, parse the relevant fields, and route logs as they're added to the output – which we will now configure.

3. Edit the configuration file to include the following output with your Dassana token. Ensure the match pattern equals the tag you set in the source.

```html
<match apache.access>
	@type http endpoint https://ingestion.dassana.cloud/logs open_timeout 2
	headers {"x-dassana-app-id":"apache", "x-dassana-token":"YOUR_TOKEN_HERE"}
	<buffer> flush_interval 10s </buffer>
</match>
```

4. Restart or start Fluentd after editing the configuration file. Ex:

```shell
sudo systemctl restart td-agent
```

## Conclusion

Congrats! You've successfully setup Fluentd to forward your Apache logs to Dassana. Now, your logs will be streamed to the Dassana Cloud Log lake and become instantly queryable. Visit [this page](https://docs.dassana.cloud) next to discover useful queries for Apache logs.

## Log Example

```json
{
	"host": "xxx.xxx.x.x",
	"user": null,
	"method": "GET",
	"path": "/",
	"code": 200,
	"size": 777,
	"referer": null,
	"agent": "Opera/12.0"
}
```

## Log Schema

View [Fluentd's Documentation](https://docs.fluentd.org/parser/apache2#regexp-patterns) for all parsed Apache log fields.
