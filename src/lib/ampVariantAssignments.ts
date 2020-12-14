import express from 'express';

export type AmpVariantAssignments = {
    [key: string]: string;
};

export const getAmpVariantAssignments = (req: express.Request): AmpVariantAssignments => {
    const { testData } = req.query;
    const ampVariantAssignments: AmpVariantAssignments = {
        fallback: 'control',
    };

    testData
        ?.toString()
        .split('!')
        .forEach((testAndVariant: string) => {
            const [test, variant] = testAndVariant.split('.');
            ampVariantAssignments[test] = variant;
        });

    return ampVariantAssignments;
};
