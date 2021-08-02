#!/bin/bash

set -e

export NODE_OPTIONS="--max-old-space-size=16384"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install
nvm use

npm install -g yarn

yarn install
yarn lint
yarn test

# Will place .js files in dist
NODE_ENV=production yarn run build

# These also need to be in the RiffRaff package
cp package.json packages/server/dist
cp riff-raff.yaml packages/server/dist
cp cfn.yaml packages/server/dist

pushd packages/server/dist
# Ensures the RiffRaff package has the node_modules needed to run
yarn install --production
popd

yarn run riffraff
