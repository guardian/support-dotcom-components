#!/bin/sh

set -e

cp package.json dist/
cp yarn.lock dist/
cp -r src/schemas dist/
cd dist
yarn install --production
cd ..
cdk --profile frontend synth --version-reporting false > cloudformation.yaml
