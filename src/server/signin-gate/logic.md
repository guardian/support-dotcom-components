## SignIn Gate Logic

This file contains the source of truth of the signin gate behavior. These are the specs that the tests must be written against.

### Special Cases

See code for details

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
               |    - No gate display the first 3 page views  |   - No gate display the first 3 page views   |
               |    - Gate: dismissible gates,                |   - Gate: dismissible gates                  |
               |            then no gate after 5 dismisses    |           then no gate after 5 dismisses     |
               |                                              |                                              |
    -----------|-----------------------------------------------------------------------------------------------------
               | [03]                                         | [04]                                         |
               |                                              |                                              |
               |  - Auxia drives the gate                     | - No Auxia notification                      |
    consented  |                                              | - Guardian drivess the gate:                 |
               |                                              |   - No gate display the first 3 page views   |
               |                                              |   - Gate: dismissible gates                  |
               |                                              |           then no gate after 5 dismisses     |
               |                                              |                                              |
                ---------------------------------------------------------------------------------------------
                                                              |
                                                              |
```

### Ireland

```
                                                              |
                   Auxia share of the Audience                |     Guardian share of the Audience
                               35%                            |                65%
                ---------------------------------------------------------------------------------------------
               | [05]                                         | [06]                                         |
               |                                              |                                              |
               |  - Notify Auxia for analytics                | - No Auxia notification                      |
 un-consented  |  - Guardian drives the gate:                 | - Guardian drives the gate:                  |
               |    - No gate display the first 3 page views  |   - No gate display the first 3 page views   |
               |    - Gate: 3x dismissal, then mandatory      |   - Gate: 3x dismissal, then mandatory       |
               |                                              |                                              |
    -----------|-----------------------------------------------------------------------------------------------------
               | [07]                                         | [08]                                         |
               |                                              |                                              |
               |  - Auxia drives the gate                     | - No Auxia notification                      |
    consented  |                                              | - Guardian drives the gate:                  |
               |                                              |   - No gate display the first 3 page views   |
               |                                              |   - Gate: dismissible gates                  |
               |                                              |           then no gate after 5 dismisses     |
               |                                              |                                              |
                ---------------------------------------------------------------------------------------------
                                                              |
                                                              |
```
