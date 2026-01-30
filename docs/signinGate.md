## Sign-in gate
DCR displays sign-in gates on article pages.
Some of these gates are managed by Auxia. Auxia is a third-party that uses ML to optimise messaging on the site.

### Architecture
[Architecture diagram](https://docs.google.com/drawings/d/1zynyGMqXekhNFQpLkzAdHqyt9iQy_RQ-kR7jFGsU5K0/edit).

DCR article pages make a request to SDC's `/auxia/get-treatments` endpoint. This endpoint may return a "treatment", which is the configuration for a gate.

SDC will decide which treatment (if any) to return based on either:
1. An API call to Auxia, for browsers which are eligible and consented,
2. Hardcoded config in SDC, for all other browsers

The sign-in gate is similar to other channels served by SDC in that the client includes some data in the request, and a decision is made based on that data. E.g. browserId, articleId, location.

The sign-in gate is fetched by the [banner picker](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/components/StickyBottomBanner.importable.tsx) in DCR. This means the gate will not be displayed on the same pageview as another banner, e.g. a consent banner.

For details of the current configuration, see [logic.md](/src/server/signin-gate/logic.md).

SDC also has an endpoint for tracking interactions (view/click) with the gate: `/auxia/log-treatment-interaction`. These events are forwarded on to Auxia, and are independent of the standard Ophan tracking.

### Data
From the Guardian's perspective, Auxia gets its data for ML model training and analytics in two ways:
1. ingestion of data from BigQuery (the datalake)
2. log treatment interactions - view and click events that we send to their API, via SDC
