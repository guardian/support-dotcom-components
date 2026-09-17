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

### Gandalf sign-in gate (Guardian-managed journey)

"Gandalf" is the marketing name for the Guardian-managed sign-in gate journey:
a 100% rollout run entirely by Guardian rules, with no Auxia involvement. It is
active for any reader whose country code is `NZ` when the
`enableGandalfSignInGate` channel switch is on. For that surface SDC owns the
rules entirely and Auxia is bypassed:

- the first two pageviews of the day are free (the response carries the
  `gandalfSignInGate` marker with no treatment, so DCR recognises the
  Guardian-managed decision but shows no gate);
- from the third pageview of the day onwards SDC returns a hardcoded
  Guardian-managed non-dismissible popup treatment
  (`NONDISMISSIBLE_SIGN_IN_GATE_POPUP`). The trigger is the standard
  `dailyArticleCount` payload field (`gu.history.dailyArticleCount` on the
  client), which already includes the current pageview;
- no Auxia GetTreatments or LogTreatmentInteraction request is made for either
  consent state;
- the eligible surfaces are the Guardian metadata values Article, Network
  Front, Section, Tag, Audio, Crossword, Gallery, Interactive, LiveBlog,
  ImageContent and Video, minus the exclusions listed in
  [logic.md](/src/server/signin-gate/logic.md);
- Ophan events use a stable Gandalf identity (`GandalfSignInGate`, variant
  `gandalf-nz`) instead of the Auxia test metadata. This is not an A/B test.

Toggling the switch is a configuration change (the Channel Switches UI).
Switching it off — or the field being absent from `channel-switches.json` —
restores the previous behaviour, which is the rollback path.

### Data

From the Guardian's perspective, Auxia gets its data for ML model training and analytics in two ways:

1. ingestion of data from BigQuery (the datalake)
2. log treatment interactions - view and click events that we send to their API, via SDC
