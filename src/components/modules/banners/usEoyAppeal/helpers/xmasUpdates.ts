const DEC_29 = Date.parse('2020-12-29');
const JAN_1 = Date.parse('2021-01-01');
const JAN_4 = Date.parse('2021-01-04');

export const selectItem = <T>(
    beforeDec29: T,
    dec29To31: T,
    jan1To3: T,
    afterJan3: T,
    now = Date.now(),
): T => {
    if (now < DEC_29) {
        return beforeDec29;
    } else if (now < JAN_1) {
        return dec29To31;
    } else if (now < JAN_4) {
        return jan1To3;
    }
    return afterJan3;
};
