# Infrastructure

This directory defines the components to be deployed to AWS.

See [`package.json`](./package.json) for a list of available scripts.


To update snapshots when changing CDK definitions use
```shell
pnpm --filter cdk test-update
```
from the root of the repository
