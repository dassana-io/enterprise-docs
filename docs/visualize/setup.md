# Setup

Dassana's Grafana application plugin comes bundled with the following:
- CloudTrail dashboard
- Dassana data source -> Responsible for communicating with Dassana's query service to fetch your data.

## Getting Started Locally

:::info Prerequiste
In order to start visualizing your data, ensure you have [docker](https://docs.docker.com/get-docker/) installed.
:::

### Install Grafana
```
docker run -d -p 3000:3000 --name=grafana grafana/grafana:8.4.4
```

### Install Dassana's Grafana App

```
docker exec -it grafana grafana-cli --pluginUrl https://dassana-grafana-prod.s3.amazonaws.com/releases/dassana-app-1.0.0.zip plugins install dassana-app
```

Please restart Grafana as highlighted in the CLI response.

```
docker restart grafana
```

### Grafana Login

1. Navigate to `http://localhost:3000/` in your browser.
2. On the login screen, use the following credentials:
```
username: admin
password: admin
```

### Enable Dassana App

1. On the left sidebar, go to `Settings` -> `Plugins`
1. In the plugin search bar, find `Dassana` and click into it
1. Click the `Enable` button

### Configure Dassana Data Source

1. On the left sidebar, go to `Settings` -> `Data sources` and click `Add data source`
2. Find `Dassana`
3. Use the following settings for the Dassana data source
    - Url: `https://dquery.dassana.cloud`
    - DassanaToken: This can be found in the [Dassana console](https://console.dassana.cloud) under `App Store` -> `Tokens`
4. Click `Save & test`

### View Dashboard

1. On the left sidebar, go to `Settings` -> `Plugins`
1. Go to the `Dassana` app
1. Click on the `Dashboards` tab
1. Click on `CloudTrail`

## Getting Started With Grafana Cloud 

The Dassana app is pending approval on Grafana's marketplace -- stay tuned!

