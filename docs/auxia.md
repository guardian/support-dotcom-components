## Auxia

Auxia is a service that uses ML models to optimise messaging.

We use it in support-dotcom-components. Currently there are two uses:

- [Sign-in gate](signinGate.md)
- Banners

Audience data from our data lake is ingested into Auxia.

support-dotcom-components uses the API to find out if a message should be displayed on a page, and to track interactions.

## Uses

### Sign-in gate

[See separate doc.](signinGate.md)

### Banners

We are trialling using Auxia for banner decision making.

In the first experiment we ask Auxia whether or not to suppress the banner. If Auxia does not suppress the banner then we use the existing rules.

The decision is made based on the browserId and other contextual information.

Auxia is consulted when the `enableAuxiaForBanners` switch is on, a browserId is available, and the mvtId is within `AUXIA_ROLLOUT_SHARE` (currently 100%). Failures are fail-open: the banner is not suppressed.

If Auxia is consulted and a banner is returned then we also track events on the client using Auxia's `LogTreatmentInteraction` endpoint. We proxy these requests via `/banner/interaction`.

See [auxia.ts](../src/server/lib/auxia.ts) for implementation.

### Gandalf bypass

While the reader's country appears in the `gandalfSignInGateCountries` channel
switch list, they are never sent to Auxia on either channel: the sign-in gate
is fully Guardian-managed (see [signinGate.md](signinGate.md)) and the banner
suppression checker short-circuits before contacting Auxia, so banners are not
suppressed, the logged status stays `not-consulted`, and no Auxia treatment is
attached to the banner response (which also prevents client-side Auxia
interaction events). Removing a country from the list restores the previous
behaviour for that country.
