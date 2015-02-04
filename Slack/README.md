# Slack Demo

## Setup

Run

```
npm install
```

You must obtain a web hook at https://your-domain.slack.com/services/new/incoming-webhook

Then, setup the environment variables: `SLACK_USER`, `SLACK_WEBHOOK` (with the obtained web hook URL).

## Send a message

Run

```
node run <channel> <msg>
```

Example

```
node run general Hello
```

The channel name should not contain the initial `#`.


