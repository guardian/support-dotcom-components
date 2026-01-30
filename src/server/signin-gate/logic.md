## SignIn Gate Logic

This file contains the source of truth of the signin gate behavior. These are the specs that the tests must be written against.

### Special Cases

- We do not show the gate on some specific article urls (see code for details)
- Not all pages are eligible for gate display (see code for details)
- payload.shouldServeDismissible overrides everything else
- Staff testing gate feature

### Global, excluding Ireland + New Zealand

No gate display the first 3 page views

nb: the numbers, for instance, [01], uniquely identify the experience for the code and the tests

```
                ----------------------------------------------
               | [01]                                         |
               |                                              |
               |  - No Auxia notification                     |
 un-consented  |  - Guardian drives the gate:                 |
 or in control |    - No gate for 30 days after a single      |
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
  auxia 35% +  |                                              |
not in control |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
    -----------|-----------------------------------------------
               | [03]                                         |
               |                                              |
               |  - No Auxia notification                     |
  consented +  |  - Guardian drives the gate:                 |
 non-auxia 65% |    - No gate for 30 days after a single      |
               |      contribution event [01]                 |
               |    - No gate the first 3 page views          |
               |    - Dismissible gates,                      |
               |      then no gate after 5 dismisses          |
               |                                              |
                ----------------------------------------------


[01] use gu_hide_support_messaging cookie
```

### Ireland + New Zealand

```
                ----------------------------------------------
               | [04]                                         |
               |                                              |
               |  - Notify Auxia for analytics                |
 un-consented  |  - Guardian drives the gate:                 |
 or in control |    - No gate for 30 days after a single      |
               |      contribution event [02]                 |
               |    - No gate the first 3 page views          |
               |    - 3x dismissal, then mandatory            |
               |                                              |
    -----------|-----------------------------------------------
               | [05]                                         |
               |                                              |
               |  - Auxia drives the gate                     |
  consented +  |                                              |
not in control |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
               |                                              |
                ----------------------------------------------


[02] use gu_hide_support_messaging cookie
```
