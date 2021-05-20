import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import {
    brand,
    brandAltBackground,
    brandAltLine,
    brandAltText,
    neutral,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { Button, buttonDefault as buttonDefaultTheme } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import { ThemeProvider } from '@emotion/react';
import { brand as brandTheme, brandAlt as brandAltTheme } from '@guardian/src-foundations/themes';
import { from } from '@guardian/src-foundations/mq';

import { ArticleCountOptOutType } from './ArticleCountOptOut';

const COLOURS = {
    epic: 'white',
    banner: brandAltText.primary,
    ['global-eoy-banner']: neutral[0],
};

const BACKGROUND_COLOURS = {
    epic: brand[400],
    banner: brandAltBackground.primary,
    ['global-eoy-banner']: '#FFF7E5',
};

const BORDER_COLOURS = {
    epic: 'transparent',
    banner: brandAltLine.primary,
    ['global-eoy-banner']: '#052962',
};

const BUTTON_THEMES = {
    epic: brandTheme,
    banner: brandAltTheme,
    ['global-eoy-banner']: buttonDefaultTheme,
};

const overlayContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
    color: ${COLOURS[type]};
    background: ${BACKGROUND_COLOURS[type]};
    border: 1px solid ${BORDER_COLOURS[type]};
    ${textSans.medium()}
    padding: ${space[2]}px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const overlayHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const overlayHeaderText = css`
    font-size: 17px;
    font-weight: bold;
`;

const overlayBody = css`
    margin-top: ${space[1]}px;
    font-size: 15px;
`;

const overlayCtaContainer = css`
    margin-top: ${space[3]}px;
    display: flex;
    flex-direction: row;

    > * + * {
        margin-left: ${space[2]}px;
    }

    ${from.tablet} {
        > * + * {
            margin-left: ${space[3]}px;
        }
    }
`;

const NOTE_LINK_COLOURS = {
    epic: neutral[100],
    banner: brandAltText.primary,
    ['global-eoy-banner']: neutral[0],
};

const BUTTON_OVERRIDES = {
    epic: css``,
    banner: css``,
    ['global-eoy-banner']: css``,
};

const overlayNote = (type: ArticleCountOptOutType): SerializedStyles => css`
    margin-top: ${space[2]}px;
    ${textSans.xsmall()}
    font-style: italic;

    a {
        color: ${NOTE_LINK_COLOURS[type]} !important;
        text-decoration: underline !important;
    }
`;

export interface ArticleCountOptOutOverlayProps {
    type: ArticleCountOptOutType;
    hasOptedOut: boolean;
    onOptOut: () => void;
    onClose: () => void;
}

export const ArticleCountOptOutOverlay: React.FC<ArticleCountOptOutOverlayProps> = ({
    type,
    hasOptedOut,
    onClose,
    onOptOut,
}: ArticleCountOptOutOverlayProps) => {
    return (
        <div css={overlayContainer(type)}>
            <div css={overlayHeader}>
                <div css={overlayHeaderText}>
                    {hasOptedOut ? "You've opted out" : "What's this?"}
                </div>
                <ThemeProvider theme={BUTTON_THEMES[type]}>
                    <Button
                        onClick={onClose}
                        cssOverrides={BUTTON_OVERRIDES[type]}
                        icon={<SvgCross />}
                        hideLabel
                        size="xsmall"
                        priority="tertiary"
                    >
                        Close
                    </Button>
                </ThemeProvider>
            </div>

            <div css={overlayBody}>
                {hasOptedOut
                    ? "Starting from your next page view, we won't count the articles you read or show you this message for three months."
                    : 'We would like to remind you how many Guardian articles you’ve enjoyed on this device. Can we continue showing you this?'}
            </div>

            {!hasOptedOut && (
                <div css={overlayCtaContainer}>
                    <ThemeProvider theme={BUTTON_THEMES[type]}>
                        <Button onClick={onClose} priority="primary" size="xsmall">
                            Yes, that&apos;s OK
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={BUTTON_THEMES[type]}>
                        <Button
                            onClick={onOptOut}
                            cssOverrides={BUTTON_OVERRIDES[type]}
                            priority="tertiary"
                            size="xsmall"
                        >
                            No, opt me out
                        </Button>
                    </ThemeProvider>
                </div>
            )}

            <div css={overlayNote(type)}>
                {hasOptedOut ? (
                    <span>
                        If you have any questions, please{' '}
                        <a href="https://www.theguardian.com/help/contact-us">contact us.</a>
                    </span>
                ) : (
                    "Please note that opting out is a permanent action and can't be reversed"
                )}
            </div>
        </div>
    );
};
