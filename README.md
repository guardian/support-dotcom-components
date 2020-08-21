# Support Dotcom Components

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

## Deploy

Use [nest](https://github.com/guardian/nest) for builds:

    $ nest build
    $ nest upload

The nest config file contains relevant configuration here.

Secrets/config are also handled by Nest. Anything you place in parameter store
with a `/dotcom-components/prod` (or `../code`) prefix will be passed as an
environment variable to the app on startup. Note there are some naming
transformations here - see the [nest secrets
README](https://github.com/guardian/nest-secrets) for more info here.

### SSH access
To ssh onto an instance use:
`ssm ssh --profile <aws profile> -x -u ec2-user --ssm-tunnel -i <instance ID>`
