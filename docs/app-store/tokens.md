# Tokens

## What are Dassana Tokens?

Dassana tokens are used for authentication with Dassana's ingestion endpoint. You can find your tokens [here](https://console.dassana.dev/appStore?page=tokens).

## How many tokens can I have?

Accounts are limited to two tokens, which can be activated and deactivated in the console (note that activation may take up to 5 minutes to take effect). Contact support@dassana.io to increase this limit.

## How do I use them?

Include your token as part of a "x-dassana-token": "YOUR_TOKEN" header. You can find examples [here](/docs/app-store/apps/custom). Failure to include a valid token will result in a token_validation_error from the ingestion endpoint.

## How should I secure them?

You should treat Dassana tokens as secrets and follow your organization's best practices regarding secret management. If a token is compromised, you can disable it via the [tokens page](https://console.dassana.dev/appStore?page=tokens) in the console. Currently, the scope of Dassana tokens is limited to ingesting data into your account given a valid app id.
