import React from 'react';
import { css } from 'emotion';
// import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
// import { space } from '@guardian/src-foundations';
// import { ThemeProvider } from 'emotion-theming';
import { ThemeProvider } from 'emotion-theming';
import { Button as DSButton, LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-svgs';

type Props = {
    clickAction: Function | string;
    children: React.ReactElement | string;
    priority?: 'primary' | 'secondary';
    showArrow?: boolean;
};

const buttonStyles = {
    textPrimary: palette.neutral[7],
    backgroundPrimary: palette.brandAlt.main,
    backgroundPrimaryHover: palette.brandAlt.dark,
    textSecondary: palette.neutral[7],
    backgroundSecondary: palette.neutral[93],
    backgroundSecondaryHover: palette.neutral[86],
    borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
    button: buttonStyles,
    link: buttonStyles,
};

export const Button: React.FC<Props> = ({
    clickAction,
    children,
    showArrow = false,
    priority = 'primary',
}: Props) => {
    if (typeof clickAction === 'string') {
        return (
            <ThemeProvider theme={contributionsTheme}>
                <LinkButton
                    href={clickAction}
                    showIcon={showArrow}
                    target="_blank"
                    rel="noopener noreferrer"
                    priority={priority}
                >
                    {children}
                </LinkButton>
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider theme={contributionsTheme}>
            <DSButton
                iconSide="right"
                icon={showArrow ? <SvgArrowRightStraight /> : undefined}
                onClick={(): void => clickAction()}
                priority={priority}
            >
                {children}
            </DSButton>
        </ThemeProvider>
    );
};
