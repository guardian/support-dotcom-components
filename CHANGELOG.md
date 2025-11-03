# @guardian/support-dotcom-components

## 8.0.2

### Patch Changes

-   41d3703: remove publish script - test for duplicated publishing issue

## 8.0.1

### Patch Changes

-   d20146c: Migrate to trusted publishing

## 8.0.0

### Major Changes

-   a04e347: Upgrade Zod to v4 from v3

    The changes are mostly internal, but Zod is a peer dependency. This means that consumers will have to update their version of Zod when updating to this version of support-dotcom-components. The migration guide can be found here: https://zod.dev/v4/changelog

## 7.10.2

### Patch Changes

-   f2c997a: prefer-nullish-coalescing lint rule violations fix

## 7.10.1

### Patch Changes

-   09461be: Add reminder types back in

## 7.10.0

### Minor Changes

-   4659f62: add new colour properties to the banner design

## 7.9.0

### Minor Changes

-   1a8b474: Replace ChoiceCard destinationUrl with destination

## 7.8.1

### Patch Changes

-   f5c0882: bump ophan-tracker-js to be compatible with dotcom-rendering

## 7.8.0

### Minor Changes

-   9659d5e: Bump version of `@guardian/ophan-tracker-js` and set as peer dependency

## 7.7.0

### Minor Changes

-   27ed0b4: Remove hover from CtaDesign type as now automated

## 7.6.2

### Patch Changes

-   0d8301c: use global URLSearchParams

## 7.6.1

### Patch Changes

-   f4d9508: lint fixes

## 7.6.0

### Minor Changes

-   aaf3a5a: adds destination url parameter to choice card

## 7.5.0

### Minor Changes

-   58771fd: Bump "@guardian/ophan-tracker-js" to "2.3.1"

## 7.4.0

### Minor Changes

-   95ab5c7: Add promoCodes field to banner model

## 7.3.0

### Minor Changes

-   49779e7: Add promoCodes field to test variant models

## 7.2.0

### Minor Changes

-   2564822: Add choiceCardsSettings to banner response

## 7.1.0

### Minor Changes

-   f7a28cc: Add choiceCardSettings to epic response

## 7.0.1

### Patch Changes

-   a9394bf: Fix return types for submitComponentEvent types

## 7.0.0

### Major Changes

-   dcdd727: Use types directly from Ophan instead of from libs

## 6.3.0

### Minor Changes

-   2d0a92f: Changes to make goal copy configurable

## 6.2.0

### Minor Changes

-   c86a393: Update tickerSettings

## 6.1.0

### Minor Changes

-   2a1a474: Add pageId to targeting

## 6.0.1

### Patch Changes

-   00b1fdb: add missing export and further type safety

## 6.0.0

### Major Changes

-   e4ee211: Remove tracking from request payload

## 5.0.0

### Major Changes

-   28e372b: Adds endpoints and models for tooling Gutter Ask tests and variants.

## 4.0.0

### Major Changes

-   274c559: Add prop types to ModuleDataResponse

## 3.2.0

### Minor Changes

-   570a22a: Remove lastOneOffContributionDate and isRecurringContributor from targeting data

## 3.1.0

### Minor Changes

-   bc8383f: Adds a new optional field for fonts to the model for Configurable Design banners

## 3.0.0

### Major Changes

-   Remove url field from response

## 2.9.1

### Patch Changes

-   Adds checkout to the geolocation addRegionIdToSupportUrl
    This is a changeset for this PR https://github.com/guardian/support-dotcom-components/pull/1221

## 2.9.0

### Minor Changes

-   update to the ticker copy model to have two optional feilds

## 2.8.0

### Minor Changes

-   Updated ticker models to match banner design model in SAC. Reverting change to ticker settings model which passed in the ticker styling settings.

## 2.7.0

### Minor Changes

-   update to ticker models to include ticker styles

## 2.6.3

### Patch Changes

-   Exports for banners migration

## 2.6.2

### Patch Changes

-   Add new tag for investigations

## 2.6.1

### Patch Changes

-   Add new tags for tracking

## 2.6.0

### Minor Changes

-   Change newsletter signup model

## 2.5.2

### Patch Changes

-   Update @guardian/libs to 17.0.0

## 2.5.1

### Patch Changes

-   Using guardian/libs for Ophan types

## 2.5.0

### Minor Changes

-   Reverting newsletter model change

## 2.4.0

### Minor Changes

-   adding in newsletter sign up component

## 2.3.3

### Patch Changes

-   Add abandonedBasketLastClosedAt to targeting type and new channel

## 2.3.2

### Patch Changes

-   Uses the new `@guardian/source` package.
-   Adds compatability with projects that consume `package.json#exports`

## 2.3.1

### Patch Changes

-   export abandonedBasketSchema

## 2.3.0

### Minor Changes

-   Add abandonedBasket schema and type and add to BannerPayload type

## 2.2.2

### Patch Changes

-   Fix zod dev dependency version

## 2.2.1

### Patch Changes

-   Exports headerPropsSchema for use directly in DCR component

## 2.2.0

### Minor Changes

-   Adding recipe tag to be tracked in WeeeklyArticleHistory

## 2.1.1

### Patch Changes

-   Mark Zod as peer dependency

## 2.1.0

### Minor Changes

-   Update to banner targeting model to include user consent as a targeting option

## 2.0.1

### Patch Changes

-   Adds addChoiceCardsParams function

## 2.0.0

### Major Changes

-   Remove footer prop

## 1.1.3

### Patch Changes

-   Add missing epic fields

## 1.1.2

### Patch Changes

-   Infer epic types from zod schemas

## 1.1.1

### Patch Changes

-   More exports to support migration of epic to DCR

## 1.1.0

### Minor Changes

-   Remove alreadyVisitedCount from banner payload

## 1.0.11

### Patch Changes

-   test release

## 1.0.10

### Patch Changes

-   test release

## 1.0.9

### Patch Changes

-   test release
