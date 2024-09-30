## Architecture

This app serves Reader Revenue messages (epics, banners, header links) to theguardian.com.

All of these messages exist as a 'test', even if it only has a single variant.

Test architecture overview diagram:
https://docs.google.com/drawings/d/1QjcleJ00a0n4yfqz2vbjxBqaR_QIJEIhsLL4XmloZdQ/edit

The server tells clients which test/variant to show, based on targeting data supplied by the client (e.g. country).

This means there is a two-step process for showing a marketing message:

#### Step 1: request to SDC
There are `POST` endpoints:
- /epic
- /banner
- /header

The client sends targeting data in its request.

The server decides which test/variant to assign to the client based on the targeting data and the epic or banner tests configuration.

The server response includes the name of the component to be rendered, and the `props` to be passed in.

#### Step 2: render the component
The components are defined in [dotcom-rendering](https://github.com/guardian/dotcom-rendering/tree/main/dotcom-rendering/src/components/marketing).

After receiving the response from SDC, the client then imports the correct component based on the name in the response, and passes in the `props`.

### Test configuration
Sometimes we hard-code tests into this repo, e.g. for a contributions campaign with a special banner design.

But most epic + banners tests are configured from the tools in [support-admin-console](https://github.com/guardian/support-admin-console).

The tools publish the tests configuration to DynamoDb tables, and support-dotcom-components polls these tables.
