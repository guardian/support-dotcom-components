import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    display: flex;

    & > * + * {
        margin-left: ${space[4]}px;
    }

    ${from.tablet} {
        & > * + * {
            margin-left: ${space[5]}px;
        }
    }
`;

const paymentMethods = css`
    display: block;
    max-height: 1.25rem;
    margin-top: ${space[2]}px;
`;

interface ContributionsTemplateCtaProps {
    primaryCta: React.ReactElement;
    secondaryCta: React.ReactElement;
}

const ContributionsTemplateCta: React.FC<ContributionsTemplateCtaProps> = ({
    primaryCta,
    secondaryCta,
}: ContributionsTemplateCtaProps) => (
    <>
        <div css={container}>
            {primaryCta}
            {secondaryCta}
        </div>
        <img
            src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
            alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
            css={paymentMethods}
        />
    </>
);

export default ContributionsTemplateCta;
