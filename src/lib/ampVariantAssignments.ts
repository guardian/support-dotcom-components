import express from 'express';

export type AmpVariantAssignments = {
    [key: string]: string;
};

export const getAmpVariantAssignments = (req: express.Request): AmpVariantAssignments => {
    const { ampVariantAssignments } = req.query;
    const result: AmpVariantAssignments = {};

    ampVariantAssignments
        ?.toString()
        .split('!')
        .forEach((testAndVariant: string) => {
            const [test, variant] = testAndVariant.split('.');
            result[test] = variant;
        });

    return result;
};
