## Architecture

This app serves Reader Revenue messages (epics and banners) to theguardian.com.

All epics and banners exist as a 'test', even if it only has a single variant.

Test architecture overview diagram:
https://docs.google.com/drawings/d/1QjcleJ00a0n4yfqz2vbjxBqaR_QIJEIhsLL4XmloZdQ/edit

This app has two functions:
1. Tell clients which test/variant to show, based on targeting data supplied by the client (e.g. country).
2. Render each chosen epic/banner component.

This means there is a two-step process for fetching an epic or banner from this service:

```
 +-----------------+           POST /banner             +-------------------+
 |                 +------------------------------------>                   |
 |                 |                                    |                   |
 |                 |                                    |                   |
 |                 +<-----------------------------------+                   |
 |                 |        test + component data       |                   |
 |                 |                                    |                   |
 | theguardian.com |                                    | dotcom-components |
 |                 |                                    |                   |
 |                 |                                    |                   |
 |                 |   GET /guardian-weekly-banner.js   |                   |
 |                 |             +----------+           |                   |
 |                 +-------------+          +---------->+                   |
 |                 |             |  fastly  |           |                   |
 |                 |             |          |           |                   |
 |                 +<------------+          +-----------+                   |
 +-----------------+             +----------+           +-------------------+
                              component module

```


#### Step 1: data endpoint request
There are two `POST` endpoints:
- /epic
- /banner

The client sends targeting data in its request.

The server decides which test/variant to assign to the client based on the targeting data and the epic or banner tests configuration. 

The server response includes the url of the component to be rendered, and the `props` to be passed into that component.

#### Step 2: component endpoint request
There are `GET` endpoints for each of the epic/banner components.

After receiving the response from the data request, the client then performs a remote module import using the component url and renders it with the given props.


### Caching
The component endpoints are cached by fastly, but the data endpoints cannot be.

Fastly caches a component for 5 mins (the `Surrogate-Control` header).

The client caches a component for 2 mins (the `Cache-Control` header).

### Test configuration
Sometimes we hard-code tests into this repo, e.g. for a contributions campaign with a special banner design.

But most epic + banners tests are configured from the tools in [support-admin-console](https://github.com/guardian/support-admin-console).

The tools publish the tests configuration to json files in S3, and support-dotcom-components polls these files.
