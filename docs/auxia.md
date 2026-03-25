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

See [auxia.ts](../src/server/lib/auxia.ts) for implementation.
