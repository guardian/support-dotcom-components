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
import { EpicProps } from '@sdc/shared/types;'
```

Which need the `@sdc/shared` package to have been built.

## Development

### Server

To start the server run

```bash
yarn server start
```

This will start `tsc` in `watch` mode to recompile on file changes and `nodemon` to run the resulting javascript and restart after recompilation.

The server runs on port 8082 locally.


#### DCR

A local instance of DCR will use the `SDC_URL` environment variable to get the url for requests to SDC. To point DCR at a local instance of SDC we can therefore run DCR like

```bash
SDC_URL=http://localhost:8082 make dev
```


#### Browserstack Local:
If you need to test against local instances of SDC + DCR through Browserstack Local then it's necessary to use the `thegulocal.com` domain.
To do this, in SDC:
1. setup nginx with `packages/server/scripts/nginx/setup.sh`
2. run `base_url=https://contributions.thegulocal.com yarn server start`

Then in DCR:
1. setup nginx with `scripts/nginx/setup.sh`
2. run `SDC_URL=https://contributions.thegulocal.com make dev`
3. use https://r.thegulocal.com, rather than localhost

### Run the tests

To run the tests run

```bash
yarn test
```

To run specific tests you must specify the workspace, e.g.
```bash
yarn server test src/tests/banners/bannerDeploySchedule.test.ts
```

### Project structure

This repo consists of 3 packages, managed by [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). The three packages are:

- server
- shared
- dotcom

`server` is an express app that runs on `node`. All the code inside this package **must** be suitable for running on `node`.

`shared` is a npm package containing shared code for `server` and `dotcom`. All the code inside this package **must** be platform agnostic.

`server` and `dotcom` both have a dependency on `shared`. To avoid having to manually build `shared` we make use of [typescript project references](https://www.typescriptlang.org/docs/handbook/project-references.html). This means when we e.g use typescript to build the `server` project it will automatically rebuild `shared` if it needs to.

## SSH access

To ssh onto an instance use:
`ssm ssh --profile <aws profile> -x --ssm-tunnel -i <instance ID>`

## Logging

When running locally a simple `console.log` is all you need. However, if you want to produce logs that can be viewed in kibana the simplest way to go is to use the `logInfo`/`logWarn`/`logError` functions exported from `logging.ts`. These take a `message` string that you can search for under the `message` field in kibana. If you want additional flexibility, you can use the `logger.info`/`logger.warn`/`logger.error` methods on the exported `logger` object instead. These methods take an object with any key/values that will appear as top level keys in kibana. However, getting the types wrong (e.g if you did `logger.info({ message: ["foo", "bar"]}))` would result in kibana silently rejecting the log and it therefore not being searchable (as `message` must be a string).
