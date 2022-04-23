# GitHub

In this guide, we'll learn how to stream all your GitHub logs to Dassana.

## Subscribe Dassana to GitHub Events

Head over to your Github Organization's Settings page. You can find this page by clicking on your profile, then clicking 'Your Organizations', and finally clicking 'Settings' for the organization you wish to configure.

On the left-hand menu, click 'Webhooks' under the Code, planning, and automation section. Then, click 'Add webhook'. Fill out the fields as follows (remember to replace your dassana token):

- Payload URL: `https://ingestion.dassana.cloud/logs?appId=github&token=YOUR_DASSANA_TOKEN`
- Content type: `application/json`
- Secret: `You can leave this blank` (We use your token in the URL to authenticate you)

We recommend you select 'Send me everything' for the events you want to trigger the webhook. Ensure 'Active' is checked below, and click 'Add webhook'.

## What if I don't have permissions for my organization?

You can configure Dassana at a repository-level by navigating to your repository's settings and following the steps above. However, we recommend you configure Dassana at the org-level for GitHub to avoid configuring Dassana manually for new repositories and to capture org-level events such as member invites & adds.

## Next steps

Congrats! You've successfully deployed the GitHub app. Now, your GitHub logs will be streamed to the Dassana Cloud Log lake and become instantly queryable.
