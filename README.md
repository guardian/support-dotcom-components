# Support Dotcom Components

This app serves Reader Revenue messages (epics and banners) to theguardian.com.

See [architecture](docs/architecture.md) for details.

## Development

### Run the dev server

```
$ yarn dev
$ PORT=8080 yarn dev # override the port to listen on
```

### Run the tests

```
$ yarn test
$ yarn test path/to/specific/test.ts
```

### Run Storybook

We use Storybook for developing React components.

```
$ yarn storybook
```

## Update JSON Schema

Update JSON schema based on TypeScript definitions:

```
$ yarn generate-schema
```

### SSH access
To ssh onto an instance use:
`ssm ssh --profile <aws profile> -x --ssm-tunnel -i <instance ID>`
