# Support Dotcom Components

A Node.js server for serving marketing messages to theguardian.com ([dotcom-rendering](https://github.com/guardian/dotcom-rendering/)).

Configuration of the marketing messages is primarily done from the [RRCP](https://github.com/guardian/support-admin-console).

See [architecture](docs/architecture.md) for details.

## Development

This project uses [nvm](https://github.com/nvm-sh/nvm). You should run `nvm use` in your terminal before running any of the following commands. To set up, first run

```bash
pnpm
```

This will install all the project dependencies.


### Server

To start the server run

```bash
pnpm start
```

This will start `webpack` in `watch` mode to recompile on file changes and `nodemon` to run the resulting javascript and restart after recompilation.

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
2. run `base_url=https://contributions.thegulocal.com pnpm server start`

Then in DCR:
1. setup nginx with `scripts/nginx/setup.sh`
2. run `SDC_URL=https://contributions.thegulocal.com make dev`
3. use https://r.thegulocal.com, rather than localhost

### Run the tests

To run the tests run

```bash
pnpm test
```

To run specific tests specify the path, e.g.
```bash
pnpm test src/server/tests/banners/bannerDeploySchedule.test.ts
```

### Project structure

The `/src` directory contains 3 subdirectories:

- `/server` - a Node.js express server.
- `/dotcom` - exports selected code/types for publishing to an npm package, for use by dotcom-rendering.
- `/shared` - shared code between `/server` and `/dotcom`.

## Publishing to npm

`@guardian/support-dotcom-components` is a library for sharing logic and types with dotcom-rendering.

Releasing to NPM is handled with [changesets] and is performed by CI.

On your feature branch, before merging, run `pnpm dotcom changeset` from the root of the project. This will
interactively ask you what kind of change this is (major, minor, patch) and
allow you to describe the change. Commit the generated changeset file to git and
push to your branch.

When you merge the branch, a version release PR will be automatically opened.

When this PR is merged, a new release will be pushed to NPM. The version change
will be based on the information in your changeset file. If the version release
PR isn't merged straight away, that's fine. Any other PRs with changesets merged
in the meantime will cause the release PR to be updated.

Not all PRs require releasing and therefore don't need a changeset. For example
a change to the README.

[changesets]: https://github.com/changesets/changesets

### Updating in DCR

You can manually bump the version of SDC in `package.json` and run `pnpm i`, or run

`pnpm --filter=@guardian/dotcom-rendering i @guardian/support-dotcom-components@latest`

from the root of the project.


## SSH access

To ssh onto an instance use:
`ssm ssh --profile <aws profile> -x --ssm-tunnel -i <instance ID>`

## Logging

When running locally a simple `console.log` is all you need. However, if you want to produce logs that can be viewed in kibana the simplest way to go is to use the `logInfo`/`logWarn`/`logError` functions exported from `logging.ts`. These take a `message` string that you can search for under the `message` field in kibana. If you want additional flexibility, you can use the `logger.info`/`logger.warn`/`logger.error` methods on the exported `logger` object instead. These methods take an object with any key/values that will appear as top level keys in kibana. However, getting the types wrong (e.g if you did `logger.info({ message: ["foo", "bar"]}))` would result in kibana silently rejecting the log and it therefore not being searchable (as `message` must be a string).
