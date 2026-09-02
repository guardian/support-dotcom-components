## SignIn Gate Logic

This file contains the source of truth of the signin gate behavior. These are the specs that the tests must be written against.

### Special Cases

- We do not show the gate on some specific article urls (see code for details)
- Not all pages are eligible for gate display (see code for details)
- payload.shouldServeDismissible overrides everything else
- Staff testing gate feature

### Global, excluding Ireland + New Zealand and Australia + Europe

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
  auxia 35%    |                                              |
  (20% for     |                                              |
  the UK)      |                                              |
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

nb: the Auxia share of the audience is the first 35% of mvtIds (1 to 350_000),
except for the UK (countryCode 'GB') where it is reduced to the first 20% (1 to 200_000).

### Ireland + New Zealand

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

Active for a reader when their country code (case-insensitively) appears in the
`gandalfSignInGateCountries` channel switch list. Unknown or unlisted countries
never enter this section and follow the rules above. Removing a country from
the list (or clearing the list, or the field being absent from
`channel-switches.json`) restores that country's previous behaviour — the
rollback path. Counters are per country, because campaigns differ by country
group.

This journey is 100% rollout, not an A/B test: no MVT/audience-share allocation
is used, and Auxia is never consulted — no GetTreatments call and no
LogTreatmentInteraction call, for consented and un-consented readers alike.

The eligible content types are the Guardian metadata values: Network Front,
Section, Tag (fronts), Audio, Crossword, Gallery, Interactive, LiveBlog,
ImageContent (CAPI Picture pages) and Video.

Excluded pages (legal/customer-service pages, The Filter, newsletter sign-up
tags, tips, the secure-contact page, privacy, complaints-and-corrections and
the-whole-picture) neither show a gate nor advance the counter.

The client sends `gandalfPageViewCount`: the 0-based number of eligible
pageviews it has already counted for the request's country (a dedicated
persistent per-country client counter, not `dailyArticleCount` or
`gateDisplayCount`). The response carries the `gandalfSignInGate` marker on
both outcomes below so the client can count the pageview and identify
Guardian-managed responses.

```
                ----------------------------------------------
               | [G1]                                         |
               |                                              |
               |  - No Auxia request                          |
  0 <= count   |  - No gate displayed                         |
     < 3       |  - Response carries the gandalfSignInGate    |
               |    marker so the client counts the pageview  |
               |                                              |
    -----------|-----------------------------------------------
               | [G2]                                         |
               |                                              |
               |  - No Auxia request                          |
   count >= 3  |  - Guardian drives the gate:                 |
               |    - Non-dismissible sign-in popup           |
               |      (NONDISMISSIBLE_SIGN_IN_GATE_POPUP)     |
               |    - Persists until the reader signs in      |
               |                                              |
    -----------|-----------------------------------------------

Special cases (evaluated with the Gandalf exclusion lists):
- denied URLs and ineligible pages: no gate, no marker, counter not advanced
- shouldServeDismissible (newsshowcase): GuDismissible, as today
- staff showDefaultGate override: Gu default gates, as today
```

Reporting: the client emits the standard Ophan SIGN_IN_GATE view/click events
under a stable Gandalf identity (`GandalfSignInGate`, variant
`gandalf-<country code>`). This is reporting metadata only — there is no A/B
test allocation.
