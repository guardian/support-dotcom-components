## SignIn Gate Logic

This fine contains the logic of the signin gate. These are the specs that the tests must be written against.

### Special Cases

See code for details

### World without Ireland

No gate display the first 3 page views

```
                                                              |
                   Auxia share of the Audience                |     Guardian share of the Audience
                               35%                            |                65%
                ---------------------------------------------------------------------------------------------
               |                                              |                                              |
               |  - No Auxia notification                     | - No Auxia notification                      |
 un-consented  |  - Guardian drives the gate:                 | - Guardian drives the gate:                  |
               |    - No gate display the first 3 page views  |   - No gate display the first 3 page views   |
               |    - Gate: dismissible gates, then no gate   |   - dismissible gates, then no gate after 5 dismisses
               |                                              |                                              |
    -----------|-----------------------------------------------------------------------------------------------------
               |                                              |                                              |
               |  - Auxia drives the gate                     | - No Auxia notification                      |
    consented  |                                              | - Guardian drivess the gate:                 |
               |                                              |   - No gate display the first 3 page views   |
               |                                              |   - Gate: dismissible gates, then no gate after 5 dismisses
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
               |                                              |                                              |
               |  - Notify Auxia for analytics                | - No Auxia notification                      |
 un-consented  |  - Guardian drives the gate:                 | - Guardian drives the gate:                  |
               |    - No gate display the first 3 page views  |   - No gate display the first 3 page views   |
               |    - Gate: 3x dismissal, then mandatory      |   - Gate: 3x dismissal, then mandatory       |
               |                                              |                                              |
    -----------|-----------------------------------------------------------------------------------------------------
               |                                              |                                              |
               |  - Auxia drives the gate                     | - No Auxia notification                      |
    consented  |                                              | - Guardian drives the gate:                  |
               |                                              |   - No gate display the first 3 page views   |
               |                                              |   - Gate: dismissible gates, then no gate after 5 dismisses
               |                                              |                                              |
                ---------------------------------------------------------------------------------------------
                                                              |
                                                              |
```
