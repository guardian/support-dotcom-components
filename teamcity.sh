#!/bin/bash

set -e

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

# rm -rf node_modules
# yarn install --production
NODE_ENV=production yarn build

yarn run riffraff
