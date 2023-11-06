import React from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { ThemeProvider } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';
import type { ReactComponent } from '../../types';
import { from } from '@guardian/src-foundations/mq';
import { OphanComponentEvent } from '@sdc/shared/types';
import { OPHAN_COMPONENT_EVENT_APPLEPAY_CTA } from './utils/ophan';

type LinkButtonColourStyles = {
    text: string;
    background: string;
    hover: string;
    border: string;
    widthSvg: string;
};

const buttonStyles: Record<string, LinkButtonColourStyles> = {
    primary: {
        text: palette.neutral[100],
        background: palette.neutral[7],
        hover: palette.neutral[20],
        border: palette.neutral[7],
        widthSvg: `42px`,
    },
    secondary: {
        text: palette.neutral[7],
        background: palette.neutral[93],
        hover: palette.neutral[86],
        border: palette.neutral[0],
        widthSvg: `140px`,
    },
};

type Url = string;

type Props = {
    onClickAction: Url;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    children: React.ReactElement | string;
    icon: React.ReactElement;
    priority?: 'primary' | 'secondary';
    title?: string;
};

const linkButtonColorStyles = (buttonStyles: LinkButtonColourStyles): SerializedStyles => css`
    width: 100%;
    justify-content: center;
    padding: 0 10px;
    border: 1px solid ${buttonStyles.border}!important;
    background-color: ${buttonStyles.background} !important;
    color: ${buttonStyles.text} !important;

    ${from.mobileMedium} {
        padding: 0 20px;
    }

    :hover {
        background-color: ${buttonStyles.hover} !important;
    }

    svg {
        width: ${buttonStyles.widthSvg};
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
        console.log('onApplePayCtaClick called');
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
                css={linkButtonColorStyles(buttonStyles[priority])}
                title={title ?? ''}
                {...props}
            >
                {children}
            </LinkButton>
        </ThemeProvider>
    );
};
