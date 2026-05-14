# support-dotcom-components

Consists of:

1. A Node.js server for serving marketing messages to theguardian.com ([dotcom-rendering](https://github.com/guardian/dotcom-rendering/)). Documentation can be found in the [./docs](./docs/) directory.
2. An npm package with types and logic for use by dotcom-rendering.

## Creating Changesets

When running `pnpm changeset`, only select `@guardian/support-dotcom-components` from the package list. This is the public npm package that gets published. The other packages in the workspace (`@guardian/support-dotcom-components-server`, `cdk`) are internal and should not be included in changesets.
