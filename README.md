# support-dotcom-components

Consists of:

1. A Node.js server for serving marketing messages to theguardian.com ([dotcom-rendering](https://github.com/guardian/dotcom-rendering/)). Documentation can be found in the [./docs](./docs/) directory.
2. An npm package with types and logic for use by dotcom-rendering.

The Inline1 bid lookup is defined in `src/server/lib/inline1BidPrices.ts`, with
separate high and low prices for Desktop and Mobile in the UK, US, and Australia
(`AU`). Each combination starts with a high price of `1.0` and a low price of `0.0`.

## Getting started

1. clone the repo locally
1. Follow the steps in [docs/server.md](docs/server.md)
