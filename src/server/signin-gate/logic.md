## SignIn Gate Logic

This file contains the source of truth of the signin gate behavior. These are the specs that the tests must be written against.

### Special Cases

-   We do not show the gate on some specific article urls (see code for details)
-   Not all pages are eligible for gate display (see code for details)
-   payload.shouldServeDismissible overrides everything else
-   Staff testing gate feature

### World without Ireland

No gate display the first 3 page views

nb: the numbers, for instance, [01], uniquely identify the experience for the code and the tests

```
                                                              |
                   Auxia share of the Audience                |     Guardian share of the Audience
                               35%                            |                65%
                ---------------------------------------------------------------------------------------------
               | [01]                                         | [02]                                         |
               |                                              |                                              |
               |  - No Auxia notification                     | - No Auxia notification                      |
 un-consented  |  - Guardian drives the gate:                 | - Guardian drives the gate:                  |
               |    - No gate for 30 days after a single      |   - No gate for 30 days after a single       |
               |      contribution event [01]                 |     contribution event [01]                  |
               |    - No gate the first 3 page views          |   - No gate display the first 3 page views   |
               |    - Dismissible gates,                      |   - Dismissible gates                        |
               |      then no gate after 5 dismisses          |     then no gate after 5 dismisses           |
               |                                              |                                              |
    -----------|-----------------------------------------------------------------------------------------------------
               | [03]                                         | [04]                                         |
               |                                              |                                              |
               |  - Auxia drives the gate                     | - No Auxia notification                      |
    consented  |                                              | - Guardian drivess the gate:                 |
               |                                              |   - No gate for 30 days after a single       |
               |                                              |     contribution event [01]                  |
               |                                              |   - No gate display the first 3 page views   |
               |                                              |   - Dismissible gates                        |
               |                                              |     then no gate after 5 dismisses           |
               |                                              |                                              |
                ---------------------------------------------------------------------------------------------
                                                              |
                                                              |

[01] use gu_hide_support_messaging cookie
```

### Ireland

```

                   Auxia share of the Audience
                               100%
                ----------------------------------------------
               | [05]                                         |
               |                                              |
               |  - Notify Auxia for analytics                |
 un-consented  |  - Guardian drives the gate:                 |
               |    - No gate for 30 days after a single      |
               |      contribution event [02]                 |
               |    - No gate the first 3 page views          |
               |    - 3x dismissal, then mandatory            |
               |                                              |
    -----------|-----------------------------------------------
               | [07]                                         |
               |                                              |
               |  - Auxia drives the gate                     |
    consented  |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
                ----------------------------------------------


[02] use gu_hide_support_messaging cookie
```
