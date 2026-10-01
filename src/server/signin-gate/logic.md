## SignIn Gate Logic

This file contains the source of truth of the signin gate behavior. These are the specs that the tests must be written against.

### Special Cases

- We do not show the gate on some specific article urls (see code for details)
- Not all pages are eligible for gate display (see code for details)
- payload.shouldServeDismissible overrides everything else
- Staff testing gate feature

### Politically sensitive country exception

For consented readers in the following country codes, the Auxia rollout is 0% regardless of
their regional rollout or MVT id:

`AF`, `BY`, `CN`, `ER`, `IR`, `MM`, `KP`, `PS`, `RU`, `SY`, `TM`, `UA`.

These countries use the Guardian-controlled fallback. The exception takes precedence over the
100% Australia and Europe paths as well as the MVT-based paths. Non-consented readers keep the
existing analytics-only behavior.

### GB and remaining non-ROW MVT-based regions

No gate display the first 3 page views

nb: the numbers, for instance, [01], uniquely identify the experience for the code and the tests

```
                ----------------------------------------------
               | [01]                                         |
               |                                              |
               |  - Notify Auxia for analytics                |
 un-consented  |  - Guardian drives the gate:                 |
               |    - No gate for 30 days after a single      |
               |      contribution event [01]                 |
               |    - No gate the first 3 page views          |
               |    - Dismissible gates,                      |
               |      then no gate after 5 dismisses          |
               |                                              |
    -----------|-----------------------------------------------
               | [02]                                         |
               |                                              |
               |  - Auxia drives the gate                     |
  consented +  |                                              |
  non-ROW      |                                              |
  Auxia 35%    |                                              |
  (GB: 20%)    |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
    -----------|-----------------------------------------------
               | [03]                                         |
               |                                              |
               |  - No Auxia notification                     |
  consented +  |  - Guardian drives the gate:                 |
 non-auxia    |    - No gate for 30 days after a single      |
 65% (80%     |      contribution event [01]                 |
 for the UK)  |    - No gate the first 3 page views          |
               |    - Dismissible gates,                      |
               |      then no gate after 5 dismisses          |
               |                                              |
                ----------------------------------------------


[01] use gu_hide_support_messaging cookie
```

The remaining non-ROW MVT-based Auxia bucket includes GB and country or territory codes that are
not covered by the repository's `International` country list, the explicit 27-country Europe
rollout, Australia or the mandatory IE/NZ/CA paths. GB (countryCode 'GB') uses the first 20% of
mvtIds (1 to 200_000); all other codes in this bucket, including the United States, use the first
35% (1 to 350_000).

### International / Rest of World

For consented readers in the repository's `International` country group, the Auxia rollout is
100% of valid MVT ids, subject to the politically sensitive country exception above. These readers
are sent to the Auxia-backed sign-in-gate journey; the treatment returned by Auxia determines
whether the gate is mandatory or dismissible. This is a regional full-rollout path and does not
change the legacy 35% MVT helper used by the remaining non-ROW bucket.

For non-consented readers, the existing analytics-only journey remains unchanged: SDC may notify
Auxia for analytics when enabled, but Guardian continues to drive the gate.

### Ireland + Canada (and New Zealand when Gandalf is disabled)

Consented readers in Ireland, New Zealand and Canada use the mandatory Auxia rollout path
regardless of MVT id. When the New Zealand Guardian-managed journey is enabled, it takes
precedence and bypasses Auxia; the mandatory Auxia path remains the fallback when that switch is
disabled.

```
                ----------------------------------------------
               | [04]                                         |
               |                                              |
               |  - Notify Auxia for analytics                |
 un-consented  |  - Guardian drives the gate:                 |
               |    - No gate for 30 days after a single      |
               |      contribution event [02]                 |
               |    - No gate the first 3 page views          |
               |    - 3x dismissal, then mandatory            |
               |                                              |
    -----------|-----------------------------------------------
               | [05]                                         |
               |                                              |
               |  - Auxia drives the gate                     |
  consented +  |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
                ----------------------------------------------


[02] use gu_hide_support_messaging cookie
```

### Australia + Europe

```
                ----------------------------------------------
               | [01]                                         |
               |                                              |
               |  - Notify Auxia for analytics                |
 un-consented  |  - Guardian drives the gate:                 |
               |    - No gate for 30 days after a single      |
               |      contribution event [01]                 |
               |    - No gate the first 3 page views          |
               |    - Dismissible gates,                      |
               |      then no gate after 5 dismisses          |
               |                                              |
    -----------|-----------------------------------------------
               | [02]                                         |
               |                                              |
               |  - Auxia drives the gate                     |
  consented +  |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
    -----------|-----------------------------------------------


[01] use gu_hide_support_messaging cookie
```

### Gandalf (Guardian-managed sign-in gate journey)

"Gandalf" is the marketing name for this journey: a 100% rollout run entirely by
Guardian rules with no Auxia involvement.

Active for a reader when the `enableGandalfSignInGate` channel switch is on and
their country code is `NZ`. Unknown or other countries never enter this section
and follow the rules above. Switching the switch off (or the field being absent
from `channel-switches.json`) disables the journey — the rollback path. The
trigger is the standard `dailyArticleCount` payload field: the reader's
pageview count for the current day, including this pageview.

This journey is 100% rollout, not an A/B test: no MVT/audience-share allocation
is used, and Auxia is never consulted — no GetTreatments call and no
LogTreatmentInteraction call, for consented and un-consented readers alike.

The eligible content types are the Guardian metadata values: Article,
Network Front, Section, Tag (fronts), Audio, Crossword, Gallery, Interactive,
LiveBlog, ImageContent (CAPI Picture pages) and Video.

Excluded pages (legal/customer-service pages, The Filter, newsletter sign-up
tags, tips, the secure-contact page, privacy, complaints-and-corrections and
the-whole-picture) never display the gate.

The trigger is the standard `dailyArticleCount` payload field: the number of
pageviews the reader has already made today, including the current one
(`gu.history.dailyArticleCount` on the client). It is a generic daily count
maintained by the client regardless of the display exclusions. The
response carries the `gandalfSignInGate` marker on both outcomes below so
the client can identify Guardian-managed responses (for Ophan reporting and
to skip Auxia interaction calls).

```
                ----------------------------------------------
               | [G1]                                         |
               |                                              |
               |  - No Auxia request                          |
 daily count   |  - No gate displayed                         |
     <= 2      |  - Response carries the gandalfSignInGate    |
               |    marker                                    |
               |                                              |
    -----------|-----------------------------------------------
               | [G2]                                         |
               |                                              |
               |  - No Auxia request                          |
 daily count   |  - Guardian drives the gate:                 |
     >= 3      |    - Non-dismissible sign-in popup           |
               |      (NONDISMISSIBLE_SIGN_IN_GATE_POPUP)     |
               |    - Persists until the reader signs in      |
               |                                              |
    -----------|-----------------------------------------------

Special cases (evaluated with the generic display exclusions):
- denied URLs and ineligible pages: no gate, no marker
- shouldServeDismissible (newsshowcase): GuDismissible, as today
- staff showDefaultGate override: Gu default gates, as today
```

Reporting: the client emits the standard Ophan SIGN_IN_GATE view/click events
under a stable Gandalf identity (`GandalfSignInGate`, variant
`gandalf-nz`). This is reporting metadata only — there is no A/B test
allocation.
