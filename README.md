# Support Dotcom Components

This app serves Reader Revenue messages (epics and banners) to theguardian.com.

See [architecture](docs/architecture.md) for details.

## Development

### Run the dev server

```
$ yarn dev
$ PORT=8080 yarn dev # override the port to listen on
```

Additionally you can watch for module changes with:

`$ yarn modules-dev`

And to speed things up if you're only working on a single module:

`$ yarn modules-dev --moduleName=epic`

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

## Module versions

We use versioning on the modules for backwards-incompatible upgrades. For example when we need to upgrade the emotion dependency, which the platforms (DCR+frontend) must also have.

Module versions are not tied to main branch builds. We release new versions infrequently. These versions represent a contract between the platforms and dotcom-components.

The latest version is defined in [modules.ts](src/modules.ts).

Version history is documented in [module-versions.md](/module-versions.md).

Modules are uploaded to an S3 bucket during the riff-raff deploy. Fastly routes requests to `/modules/...` to this bucket. In this bucket the paths contain the version.

E.g. a client request to:

`<our-domain>/modules/v1/banners/contributions/ContributionsBanner.js`

is routed to:

`<s3-bucket-domain>/PROD/dotcom-components-modules-upload/v1/banners/contributions/ContributionsBanner.js` 
