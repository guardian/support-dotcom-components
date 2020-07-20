import React, { useState, useRef, useEffect } from 'react';
import { css } from 'emotion';
import { brand } from '@guardian/src-foundations/palette';
import { textSans, body } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { SvgClose } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { brand as brandTheme } from '@guardian/src-foundations/themes';
import { from } from '@guardian/src-foundations/mq';

const optOutContainer = css`
    display: inline-block;

    ${from.tablet} {
        position: relative;
    }
`;

const articleCountButton = css`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    ${body.medium()}
`;

const overlayContainer = css`
    position: absolute;
    left: ${space[4]}px;
    right: ${space[4]}px;
    color: #ffffff;
    background: ${brand[400]};
    ${textSans.medium()}
    padding: ${space[3]}px;


    ${from.tablet} {
        width: 325px;
        left: 0;
        padding-bottom: ${space[4]}px;
    }
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
    margin-top: ${space[5]}px;
    > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.mobileMedium} {
        display: flex;

        > * + * {
            margin-top: 0;
            margin-left: ${space[3]}px;
        }
    }
`;

const overlayNote = css`
    margin-top: ${space[3]}px;
    ${textSans.xsmall()}
    font-style: italic;
    display: none;

    ${from.tablet} {
        display: block;
    }

    a {
        color: #ffffff !important;
        text-decoration: underline !important;
    }
`;

export interface ArticleCountOptOutProps {
    numArticles: number;
}

export const ArticleCountOptOut: React.FC<ArticleCountOptOutProps> = ({
    numArticles,
}: ArticleCountOptOutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOptedOut, setHasOptedOut] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);

    const clickWasOutsideOverlay = (event: MouseEvent): boolean => {
        if (overlayRef.current) {
            return !overlayRef.current.contains(event.target as Node);
        } else {
            return true;
        }
    };

    const handleClick = (event: MouseEvent): void => {
        if (clickWasOutsideOverlay(event)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return (): void => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className={optOutContainer}>
            <button className={articleCountButton} onClick={(): void => setIsOpen(!isOpen)}>
                {numArticles} articles
            </button>
            {isOpen && (
                <div className={overlayContainer} ref={overlayRef}>
                    <div className={overlayHeader}>
                        <div className={overlayHeaderText}>
                            {hasOptedOut ? "You've opted out" : "What's this?"}
                        </div>
                        {hasOptedOut && (
                            <Button
                                onClick={(): void => setIsOpen(false)}
                                icon={<SvgClose />}
                                hideLabel
                                size="small"
                            ></Button>
                        )}
                    </div>

                    <div className={overlayBody}>
                        {hasOptedOut
                            ? "Starting from your next page view, we won't count the articles you read or show you this message for three months."
                            : 'We would like to remind you how many Guardian articles you’ve enjoyed on this device. Can we continue showing you this?'}
                    </div>

                    {!hasOptedOut && (
                        <div className={overlayCtaContainer}>
                            <ThemeProvider theme={brandTheme}>
                                <Button priority="tertiary" size="small">
                                    Yes, that&apos;s OK
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={brandTheme}>
                                <Button
                                    onClick={(): void => setHasOptedOut(true)}
                                    priority="primary"
                                    size="small"
                                >
                                    No, opt me out
                                </Button>
                            </ThemeProvider>
                        </div>
                    )}

                    <div className={overlayNote}>
                        {hasOptedOut ? (
                            <span>
                                If you have any questions, please{' '}
                                <a href="https://www.theguardian.com/help/contact-us">
                                    contact us.
                                </a>
                            </span>
                        ) : (
                            'Please note you cannot undo this action or opt back in.'
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
