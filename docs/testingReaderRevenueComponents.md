Testing Reader Revenue Components
====================================

## tl;dr

- Check out these functions! https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/lib/readerRevenueDevUtils.ts
- Check out Bookmarklets in RRCP

## Components

www.theguardian.com is the main driver of traffic for our reader revenue sites, in particular support.theguardian.com where sign-ups for one-off and recurring contributions occur.

The components which drive the most traffic are:

### The epic
- Sits in the document flow, at the bottom of article copy in articles and within the document flow of liveblogs
- Typically only displays for a certain number of views in a given time window (normally 4 in 30 days) ***STILL RELEVANT?***
- Will not display if the user is signed in and has the hideSupportMessaging benefit, or the browser has the one-off contribution cookie from the last 90 days
- Won't display on pages which have the `window.guardian.config.page.shouldHideReaderRevenue` flag set (this is set by editorial in Composer)

<img src="./images/Epic_2025-11-14.png" width="500" alt ="Example Epic" />

### The engagement banner
- Is a fixed position banner at the bottom of the screen (like the cookie consent banner, etc)
- Will not re-display after it's closed, until we "redeploy" (force a re-display) via RRCP 
- Will not display if the user is signed in and has the hideSupportMessaging benefit, or the browser has the one-off contribution cookie from the last 90 days
- Won't display on pages which have the `window.guardian.config.page.shouldHideReaderRevenue` flag set (this is set by editorial in Composer)

<img src="./images/Banner_2025-11-14.png" width="1000" alt ="Example Banner" />

## Why can't I see the epic or banner?
- The rules which determine whether these display on a given pageview are complex enough that getting them to display can be a pain
- On top of this, we are almost always running tests on these components which means there are different variants in production
- And on top of that, we often have region-specific copy, either as a test or simply as a region-specific control
- Typically when making changes to these components, you will want to double-check all variants in our main regions (US, UK, Australia)
- Won't display on pages which have the `window.guardian.config.page.shouldHideReaderRevenue` flag set (this is set by editorial in Composer)
- Finally, the sign-in gate might be blocking the banner from loading or covering the epic

## Helper functions
We have some helper functions, exposed on `window.guardian.readerRevenue`, which can help with this problem.

```javascript

    window.guardian.readerRevenue = {
        showMeTheEpic,
        showMeTheBanner,
        showMeTheDoubleBanner,
        showNextVariant,
        showPreviousVariant,
        changeGeolocation,
    };

```
All of these accept no arguments and return nothing.
They will ensure that all cookies and localStorage items are set up correctly, and reload the page.

See here for code and additional comments: https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/lib/readerRevenueDevUtils.ts

## Bookmarklets
You can call those functions from the console if you like but if you want to use them as handy bookmarklets, you can find them under Bookmarklets in RRCP which you can drag onto your browser's bookmark bar or import them all in one hit with a bookmarks file.
