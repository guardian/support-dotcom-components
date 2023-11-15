import React from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { palette, space } from '@guardian/src-foundations';
import { ThemeProvider } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';
import type { ReactComponent } from '../../types';
import { from } from '@guardian/src-foundations/mq';
import { OphanComponentEvent } from '@sdc/shared/types';
import { OPHAN_COMPONENT_EVENT_APPLEPAY_CTA } from './utils/ophan';
import { ApplePaySvg } from './ApplePaySvg';

type Url = string;

type Props = {
    onClickAction: Url;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    children: React.ReactElement | string;
};

const svgPositionStyles = css`
    margin: ${space[1]}px -${space[2]}px;
`;

const buttonStyles = (): SerializedStyles => css`
    width: 100%;
    justify-content: center;
    padding: 0 10px;
    border: 1px solid ${palette.neutral[7]} !important;
    background-color: ${palette.neutral[7]} !important;
    color: ${palette.neutral[100]} !important;

    ${from.mobileMedium} {
        padding: 0 20px;
    }

    :hover {
        background-color: ${palette.neutral[20]} !important;
    }

    svg {
        width: 42px;
    }
`;

export const ButtonApplePay: ReactComponent<Props> = (allProps: Props) => {
    const { onClickAction, submitComponentEvent, children, ...props } = allProps;

    const onApplePayCtaClick = () => {
        console.log(`Ophan event fired: ${'OPHAN_COMPONENT_EVENT_APPLEPAY_CTA'}`);
        if (submitComponentEvent) {
            console.log(`IN Ophan event fired: ${'OPHAN_COMPONENT_EVENT_APPLEPAY_CTA'}`);
            submitComponentEvent(OPHAN_COMPONENT_EVENT_APPLEPAY_CTA);
        }
    };

    return (
        <ThemeProvider theme={buttonStyles}>
            <LinkButton
                href={onClickAction}
                onClick={onApplePayCtaClick}
                icon={<ApplePaySvg cssOverrides={svgPositionStyles} />}
                iconSide="right"
                target="_blank"
                rel="noopener noreferrer"
                priority={'primary'}
                css={buttonStyles}
                title={'apple pay'}
                {...props}
            >
                {children}
            </LinkButton>
        </ThemeProvider>
    );
};
