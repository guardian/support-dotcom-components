### Bandit data report script

`TEST_NAME=<test_name> yarn server bandit-data-report`

Fetches all bandit sample data for the given test, and generates a csv report. Useful for plotting how each variant's overall mean changes over time.

The csv contains a row for each hour/variant, e.g.

```
hour,variant,mean
0,CONTROL,0
0,V1_AGAINST,0
1,V1_AGAINST,0.0007499574593269433
1,CONTROL,0
2,V1_AGAINST,0.0011989427425196054
2,CONTROL,0.001048503697532455
```
