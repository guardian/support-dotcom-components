import React from 'react';

const DEC_29 = Date.parse('2020-12-29');
const JAN_1 = Date.parse('2021-01-01');
const JAN_4 = Date.parse('2021-01-04');

export const selectComponent = (
    beforeDec29: React.FC,
    dec29To31: React.FC,
    jan1To3: React.FC,
    afterJan3: React.FC,
    now = Date.now(),
): React.FC => {
    if (now < DEC_29) {
        return beforeDec29;
    } else if (now < JAN_1) {
        return dec29To31;
    } else if (now < JAN_4) {
        return jan1To3;
    }
    return afterJan3;
};
