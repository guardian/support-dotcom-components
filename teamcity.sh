#!/bin/bash

set -e

export NODE_OPTIONS="--max-old-space-size=8192"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install
nvm use

npm install -g yarn

yarn install
yarn lint
yarn test-server
yarn test-modules

# Will place .js files in dist
NODE_ENV=production yarn run build

# These also need to be in the RiffRaff package
cp package.json dist
cp riff-raff.yaml dist
cp cfn.yaml dist
cp -r src/schemas dist/schemas

pushd dist
# Ensures the RiffRaff package has the node_modules needed to run
yarn install --production
popd

yarn run package
