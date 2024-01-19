import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { ReactComponent } from '../../../types';

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
    height: 1.25rem;
    width: auto;
    margin-top: ${space[2]}px;
`;

interface ContributionsTemplateCtaProps {
    primaryCta: React.ReactElement;
    secondaryCta: React.ReactElement | null;
}

const ContributionsTemplateCta: ReactComponent<ContributionsTemplateCtaProps> = ({
    primaryCta,
    secondaryCta,
}: ContributionsTemplateCtaProps) => (
    <>
        <div css={container}>
            {primaryCta}
            {secondaryCta}
        </div>
        <img
            width={422}
            height={60}
            src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
            alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
            css={paymentMethods}
        />
    </>
);

export default ContributionsTemplateCta;
