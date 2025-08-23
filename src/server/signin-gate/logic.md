## SignIn Gate Logic

This fine contains the logic of the signin gate. These are the specs that the tests must be written against.

### Special Circumstances

### World without Ireland

```
                                                     |
                   Auxia share of the Audience       |     Guardian share of the Audience
                               35%                   |                65%
                ---------------------------------------------------------------------------
               |                                     |                                     |
               |  - No Auxia notification            | - No Auxia notification             |
 un-consented  |  - Guardian drives the gate:        | - Guardian drives the gate:         |
               |    dismissible gates, then no gate  |   dismissible gates, then no gate   |
               |    after 5 dismisses                |   after 5 dismisses                 |
               |                                     |                                     |
    -----------|--------------------------------------------------------------------------------
               |                                     |                                     |
               |  - Auxia drives the gate            | - No Auxia notification             |
    consented  |                                     | - Guardian drivess the gate:        |
               |                                     |   dismissible gates, then no gate   |
               |                                     |   after 5 dismisses                 |
               |                                     |                                     |
                ---------------------------------------------------------------------------
                                                     |
                                                     |
```

### Ireland

```
                                                     |
                   Auxia share of the Audience       |     Guardian share of the Audience
                               35%                   |                65%
                ---------------------------------------------------------------------------
               |                                     |                                     |
               |  - Notify Auxia for analytics       | - No Auxia notification             |
 un-consented  |  - Guardian drives the gate:        | - Guardian drives the gate:         |
               |    3x dismissal, then mandatory     |   3x dismissal, then mandatory      |
               |                                     |                                     |
    -----------|--------------------------------------------------------------------------------
               |                                     |                                     |
               |  - Auxia drives the gate            | - No Auxia notification             |
    consented  |                                     | - Guardian drives the gate:         |
               |                                     |   dismissible gates, then no gate   |
               |                                     |   after 5 dismisses                 |
               |                                     |                                     |
                ---------------------------------------------------------------------------
                                                     |
                                                     |
```
