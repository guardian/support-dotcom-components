#!/bin/bash

set -e

pushd cdk
./script/ci
popd

export NODE_OPTIONS="--max-old-space-size=16384"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install
nvm use

npm install -g yarn

yarn install
yarn setup
yarn lint
yarn test

NODE_ENV=production yarn server build
NODE_ENV=production yarn modules build

yarn run riffraff
