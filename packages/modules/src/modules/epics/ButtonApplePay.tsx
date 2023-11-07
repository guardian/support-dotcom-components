import React from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { ThemeProvider } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';
import type { ReactComponent } from '../../types';
import { from } from '@guardian/src-foundations/mq';
import { OphanComponentEvent } from '@sdc/shared/types';
import { OPHAN_COMPONENT_EVENT_APPLEPAY_CTA } from './utils/ophan';

type Url = string;

type Props = {
    onClickAction: Url;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    children: React.ReactElement | string;
    icon: React.ReactElement;
    priority?: 'primary' | 'secondary';
    title?: string;
};

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
    const {
        onClickAction,
        submitComponentEvent,
        children,
        icon,
        priority = 'primary',
        title,
        ...props
    } = allProps;

    const onApplePayCtaClick = () => {
        if (submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_APPLEPAY_CTA);
        }
    };

    return (
        <ThemeProvider theme={buttonStyles}>
            <LinkButton
                href={onClickAction}
                onClick={onApplePayCtaClick}
                icon={icon}
                iconSide="right"
                target="_blank"
                rel="noopener noreferrer"
                priority={priority}
                css={buttonStyles}
                title={title ?? ''}
                {...props}
            >
                {children}
            </LinkButton>
        </ThemeProvider>
    );
};
