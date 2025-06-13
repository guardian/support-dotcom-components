## Choice cards

The Epic and Banner components can display interactive choice cards. These cards display product information, and when a choice is clicked the CTA url is updated with details of the user's selection.

Architecture: https://docs.google.com/drawings/d/1f5rtshCbXcrRQY4HITsaH8_olAoBpqaosVxDcXs_KY8/edit

### DCR
DCR is responsible for rendering the choice cards component, but it takes all of the config from SDC. This config includes product benefits copy, pricing, discounts.

### SDC
SDC generates the choice cards config when handling a request from DCR. The basic config comes from one of two places:
1. The "default" config, which is [hardcoded into SDC](src/server/lib/choiceCards/defaultChoiceCardSettings.ts).
2. The RRCP, where the config can be overridden per test variant. This enables Marketing to AB test different choice cards configurations from the Epic and Banner tools.

Once SDC has chosen the basic config, it enriches it with information specific to the user. This includes:
- price, taken from the Product Catalog API, based on the user's location and the configured rate plan.
- currency
- discount information, using the promotions table

The generated choice cards config is now ready for rendering by DCR.

### SAC (RRCP)
Each Epic variant can have one of 3 options:
1. no choice cards
2. choice cards with default settings
3. choice cards with custom settings

A banner variant will only allow choice cards configuration if the chosen banner design has choice cards. If so, then there are 2 options in the variant editor:
1. choice cards with default settings
2. choice cards with custom settings

If "choice cards with custom settings" is chosen then the choice cards config is included in the variant config, and SDC will use this instead of the default choice cards config.

Note - currently the RRCP "live preview" feature does not support choice cards. This is because it iframes a storybook view of the component from the DCR storybook, passing the variant config in the url. This means it bypasses SDC, which is responsible for building the choice cards using product and discount data.
The "web preview" however does support choice cards.
