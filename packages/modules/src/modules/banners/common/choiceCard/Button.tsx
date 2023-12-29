import React from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { ThemeProvider } from '@emotion/react';
import { Button as DSButton, LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import type { ReactComponent } from '../../../../types';

// Custom theme for Button/LinkButton
// See also `tertiaryButtonOverrides` below.
const buttonStyles = {
    textPrimary: palette.neutral[7],
    backgroundPrimary: palette.brandAlt[400],
    backgroundPrimaryHover: palette.brandAlt[300],
    textSecondary: palette.neutral[7],
    backgroundSecondary: palette.neutral[93],
    backgroundSecondaryHover: palette.neutral[86],
    borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
    button: buttonStyles,
    link: buttonStyles,
};

type Url = string;

type Props = {
    ctaText: string;
    ctaUrl: string;
    onClickAction: Function | Url;
    // children: React.ReactElement | string;
    priority?: 'primary' | 'secondary';
    showArrow?: boolean;
    isTertiary?: boolean;
    cssOverrides?: SerializedStyles | SerializedStyles[] | undefined;
    onCtaClick: () => void;
};

// Overrides for tertiary button
// Unfortunatly they all need !important :(
const tertiaryButtonOverrides = css`
    border: 1px solid ${palette.neutral[7]} !important;
    background-color: transparent !important;

    :hover {
        background-color: ${palette.neutral[86]} !important;
    }
`;

export const Button: ReactComponent<Props> = (allProps: Props) => {
    const {
        ctaText,
        ctaUrl,
        onCtaClick,
        // children,
        showArrow = false,
        // priority = 'primary',
        isTertiary,
        cssOverrides,
        ...props
    } = allProps;
    // LinkButton doesn't support 'tertiary' priority (unlike Button)
    // So we'll map that to 'primary' and apply a CSS override on both of
    // them so they get the same styles for 'tertiary' priority
    return (
        <ThemeProvider theme={contributionsTheme}>
            {/*<LinkButton*/}
            {/*    href={ctaUrl}*/}
            {/*    onClick={onCtaClick}*/}
            {/*    icon={<SvgArrowRightStraight />}*/}
            {/*    iconSide="right"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*    // priority={isTertiary ? 'primary' : priority}*/}
            {/*    priority="tertiary"*/}
            {/*    css={isTertiary ? tertiaryButtonOverrides : undefined}*/}
            {/*    cssOverrides={cssOverrides}*/}
            {/*    {...props}*/}
            {/*>*/}
            {/*    {ctaText}*/}
            {/*</LinkButton>*/}

            <LinkButton
                href={ctaUrl}
                onClick={onCtaClick}
                priority="tertiary"
                cssOverrides={cssOverrides}

                icon={<SvgArrowRightStraight />}
                iconSide="right"
                target="_blank"
                rel="noopener noreferrer"
            >
                {ctaText}
            </LinkButton>

        </ThemeProvider>
    );
};
