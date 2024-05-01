## @guardian/support-dotcom-components

A library for use by dotcom (frontend/DCR). This is for sharing logic and types with dotcom (frontend + dcr).

### Publishing to NPM

Releasing to NPM is handled with [changesets] and is performed by CI.

On your feature branch, before merging, run `yarn dotcom changeset` from the root of the project. This will
interactively ask you what kind of change this is (major, minor, patch) and
allow you to describe the change. Commit the generated changeset file to git and
push to your branch.

When you merge the branch, a version release PR will be automatically opened.

*IMPORTANT* - you now need push a commit to this branch which manually deletes the
changeset file(s) under `packages/dotcom/.changeset/`. These files are supposed to be deleted
automatically, but aren't, probably because of our yarn workspaces setup.

When this PR is merged, a new release will be pushed to NPM. The version change
will be based on the information in your changeset file. If the version release
PR isn't merged straight away, that's fine. Any other PRs with changesets merged
in the meantime will cause the release PR to be updated.

*Note* - currently the `Release` job in CI will show as failed because it tries to
publish the same version twice.

Not all PRs require releasing and therefore don't need a changeset. For example
a change to the README.

[changesets]: https://github.com/changesets/changesets

### Updating in DCR

You can manually bump the version of SDC in `package.json` and run `pnpm i`, or run

`pnpm --filter=@guardian/dotcom-rendering i @guardian/support-dotcom-components@latest`

from the root of the project.
