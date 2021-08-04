import express from 'express';

export type AmpVariantAssignments = Record<string, string>;

export const getAmpVariantAssignments = (req: express.Request): AmpVariantAssignments => {
    const { ampVariantAssignments } = req.query;
    const result: AmpVariantAssignments = {};

    ampVariantAssignments
        ?.toString()
        .split('!')
        .forEach((testAndVariant: string) => {
            const [test, variant] = testAndVariant.split('.');
            if (test && variant) {
                result[test] = variant;
            }
        });

    return result;
};
