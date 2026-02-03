## mParticle
mParticle is our Customer Data Platform (CDP).
It contains user profiles derived from data from the datalake.

We also use it to define _audiences_ - segmenting users based on their attributes. For example, we can define an audience of users who have made a single contribution more than 6 months ago and who do not have a subscription.

### mParticle use in SDC
The RRCP epic + banner tools allow users to target tests by an mParticle audience. This involves entering the id of the audience (a number copied from mParticle).

If defined, SDC will use the `mParticleAudience` field to target a test only to users in that audience.

Currently we only support mParticle targeting for signed-in users, as it requires an identity ID.

The client (a page on theguardian.com served by DCR) may include an Authorization header in its request to /epic and /banner. This header will only be present if:
1. the user is signed in
2. the user has the correct consent for targeting

The epic and banner selection logic can then use the Authorization header for mParticle targeting by:
1. verifying the okta token in the header, to ensure the okta session is valid
2. extracting the identity ID from the token
3. making a request to the mParticle API with the identity ID
4. checking the `audience_memberships` in the response from mParticle

This logic lives in the `MParticle` class, which has the following features:
1. it maintains a bearer token from mParticle, which is used for making requests to the mParticle API. This token must be refreshed periodically
2. it handles rate-limiting by mParticle (if a 429 is returned) by backing off exponentially
3. it provides a `fetchProfile` function for handling the okta token and making the fetch to mParticle. This function is both lazy and memoized, meaning we only make a request to mParticle when we need to, and do not perform it more than once.

A dashboard of useful metrics relating to mParticle in SDC can be found in Kibana:
https://logs.gutools.co.uk/app/dashboards#/view/fe32f22f-1870-4cd0-a558-3db1b42a36c9
