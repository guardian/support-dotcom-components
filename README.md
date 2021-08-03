# Support Dotcom Components

This app serves Reader Revenue messages (epics and banners) to theguardian.com.

See [architecture](docs/architecture.md) for details.

## Setup

This project uses [nvm](https://github.com/nvm-sh/nvm). You should run `nvm use` in your terminal before running any of the following commands. To set up, first run

```bash
yarn
```

This will install all the project dependencies. Next run

```bash
yarn setup
```

This will do an initial build of the project. This should make your IDE happy with imports like

```ts
import { EpicProps } from '@sdc/shared/types;
```

Which need the `@sdc/shared` package to have been built.

## Development

### Server

To start the server run

```bash
yarn server start
```

This will start `tsc` in `watch` mode to recompile on file changes and `nodemon` to run the resulting javascript and restart after recompilation.

#### DCR

A local instance of DCR will use the `SDC_URL` environment variable to get the url for requests to SDC. To point DCR at a local instance of SDC we can therefore run DCR like

```bash
SDC_URL=http://localhost:<SDC_PORT> make dev
```

Where the default value for `<SDC_PORT>` is `8082`.

### Modules

#### Storybook

The fastest way to develop modules is to work in storybook. To do this run

```bash
yarn modules storybook
```

#### Building the modules

Storybook is great for working in isolation, but often you will want to see the components rendering on a local DCR page. To do this, start the server, then in a new window run

```bash
yarn modules start
```

This will start building all of the modules. This can be quite slow, so to build a specific module we can run

```bash
yarn modules start --moduleName=<MODULE_NAME>
```

Where a list of module names can be found [here](./packages/shared/src/config/modules.ts).

### Run the tests

To run the tests run

```bash
yarn test
yarn test path/to/specific/test.ts
```

### Project structure

This repo consists of 3 packages, managed by [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). The three packages are:

- server
- modules
- shared

`server` is an express app that runs on `node`. All the code inside this package **must** be suitable for running on `node`.

`modules` is a set of react components that are bundled into `js` modules by `rollup` and rendered on dotcom. All the code inside this package **must** be suitable for running in a browser.

`shared` is a npm package containing shared code for `server` and `modules`. All the code inside this package **must** be platform agnostic.

`server` and `modules` both have a dependency on `shared`. To avoid having to manually build `shared` we make use of [typescript project references](https://www.typescriptlang.org/docs/handbook/project-references.html). This means when we e.g use typescript to build the `server` project it will automatically rebuild `shared` if it needs to.

## SSH access

To ssh onto an instance use:
`ssm ssh --profile <aws profile> -x --ssm-tunnel -i <instance ID>`

## Module versions

We use versioning on the modules for backwards-incompatible upgrades. For example when we need to upgrade the emotion dependency, which the platforms (DCR+frontend) must also have.

Module versions are not tied to main branch builds. We release new versions infrequently. These versions represent a contract between the platforms and dotcom-components.

The latest version is defined in [modules.ts](./packages/shared/src/config/modules.ts).

Version history is documented in [module-versions.md](/module-versions.md).

Modules are uploaded to an S3 bucket during the riff-raff deploy. Fastly routes requests to `/modules/...` to this bucket. In this bucket the paths contain the version.

E.g. a client request to:

`<our-domain>/modules/v1/banners/contributions/ContributionsBanner.js`

is routed to:

`<s3-bucket-domain>/PROD/dotcom-components-modules-upload/v1/banners/contributions/ContributionsBanner.js`
