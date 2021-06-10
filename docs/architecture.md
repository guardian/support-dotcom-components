## Architecture

This app serves Reader Revenue messages (epics, banners, header links) to theguardian.com.

All of these messages exist as a 'test', even if it only has a single variant.

Test architecture overview diagram:
https://docs.google.com/drawings/d/1QjcleJ00a0n4yfqz2vbjxBqaR_QIJEIhsLL4XmloZdQ/edit

SDC architecture diagram:
https://docs.google.com/drawings/d/1q22vRzxxouHxbhfoVCmqtMg7wpGPwoJc8DrF7WPgxgQ

This project has two functions:
1. Tell clients which test/variant to show, based on targeting data supplied by the client (e.g. country).
2. Provide a React component for each message. This is rendered by the client using a remote module import.

This means there is a two-step process for fetching a message from this service:

#### Step 1: data endpoint request
There are `POST` endpoints:
- /epic
- /banner
- /header

The client sends targeting data in its request.

The server decides which test/variant to assign to the client based on the targeting data and the epic or banner tests configuration.

The server response includes the url of the module to be imported, and the `props` to be passed in.

#### Step 2: component endpoint request
Each module is hosted in a public S3 bucket behind fastly.

After receiving the response from the data request, the client then performs a remote module import using the module url and renders it with the given props.


### Caching
The component endpoints are cached by fastly, but the data endpoints cannot be.

Fastly caches a component for 5 mins (the `Surrogate-Control` header).

The client caches a component for 5 mins (the `Cache-Control` header).

### Test configuration
Sometimes we hard-code tests into this repo, e.g. for a contributions campaign with a special banner design.

But most epic + banners tests are configured from the tools in [support-admin-console](https://github.com/guardian/support-admin-console).

The tools publish the tests configuration to json files in S3, and support-dotcom-components polls these files.
