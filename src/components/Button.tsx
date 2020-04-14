import React from 'react';
import { palette } from '@guardian/src-foundations';
import { ThemeProvider } from 'emotion-theming';
import { Button as DSButton, LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-svgs';

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

type Url = string;

type Props = {
    // Accept a function or a string;
    // A function will render a <Button>
    // A string will render a <LinkButton>
    // Both using the same interface
    onClickAction: Function | Url;
    children: React.ReactElement | string;
    priority?: 'primary' | 'secondary';
    showArrow?: boolean;
};

export const Button: React.FC<Props> = (props: Props) => {
    const { onClickAction, children, showArrow = false, priority = 'primary' } = props;
    if (typeof onClickAction === 'string') {
        return (
            <ThemeProvider theme={contributionsTheme}>
                <LinkButton
                    href={onClickAction}
                    showIcon={showArrow}
                    target="_blank"
                    rel="noopener noreferrer"
                    priority={priority}
                    {...props}
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
                onClick={(): void => onClickAction()}
                priority={priority}
                {...props}
            >
                {children}
            </DSButton>
        </ThemeProvider>
    );
};
