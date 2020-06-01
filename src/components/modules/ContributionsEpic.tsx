import React, { useState } from 'react';
import { css } from 'emotion';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';
import { getCountryName, getLocalCurrencySymbol } from '../../lib/geolocation';
import { EpicTracking } from '../ContributionsEpicTypes';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { Variant } from '../../lib/variants';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';

const replacePlaceholders = (
    content: string,
    numArticles: number,
    countryCode?: string,
): string => {
    // Replace currency symbol placeholder with actual currency symbol
    // Function uses default currency symbol so countryCode is not strictly required here
    content = content.replace(/%%CURRENCY_SYMBOL%%/g, getLocalCurrencySymbol(countryCode));

    // Replace number of viewed articles
    // Value could be zero but we'll replace anyway
    content = content.replace(/%%ARTICLE_COUNT%%/g, numArticles.toString());

    // Replace country code placeholder with actual country name
    // Should only replace if we were able to determine the country name from country code
    const countryName = getCountryName(countryCode) ?? '';
    content = countryName ? content.replace(/%%COUNTRY_CODE%%/g, countryName) : content;

    return content;
};

// Spacing values below are multiples of 4.
// See https://www.theguardian.design/2a1e5182b/p/449bd5
const wrapperStyles = css`
    padding: ${space[1]}px ${space[1]}px ${space[3]}px;
    border-top: 1px solid ${palette.brandAlt[400]};
    background-color: ${palette.neutral[97]};

    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
        ::-moz-selection {
            background: ${palette.brandAlt[400]};
        }
    }
`;

const headingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin-top: 0;
    margin-bottom: ${space[3]}px;
`;

// Custom styles for <a> tags in the Epic content
const linkStyles = css`
    a {
        color: ${palette.news.main};
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
    ${linkStyles}
`;

const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    ${linkStyles}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandAlt[400]};
`;

const imageWrapperStyles = css`
    margin: 10px -4px 12px;
    height: 150px;
    width: calc(100% + 8px);
`;

const imageStyles = css`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export type EpicProps = {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
    onReminderOpen?: Function;
};

type HighlightedProps = {
    highlightedText: string;
    countryCode?: string;
    numArticles: number;
};

type BodyProps = {
    variant: Variant;
    countryCode?: string;
    numArticles: number;
};

interface OnReminderOpen {
    buttonCopyAsString: string;
}

const Highlighted: React.FC<HighlightedProps> = ({
    highlightedText,
    countryCode,
    numArticles,
}: HighlightedProps) => (
    <strong className={highlightWrapperStyles}>
        {' '}
        <span
            className={highlightStyles}
            dangerouslySetInnerHTML={{
                __html: replacePlaceholders(highlightedText, numArticles, countryCode),
            }}
        />
    </strong>
);

const EpicBody: React.FC<BodyProps> = ({ variant, countryCode, numArticles }: BodyProps) => {
    const { paragraphs, highlightedText } = variant;

    return (
        <>
            {paragraphs.map((paragraph, idx) => (
                <p key={idx} className={bodyStyles}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: replacePlaceholders(paragraph, numArticles, countryCode),
                        }}
                    />

                    {highlightedText && idx === paragraphs.length - 1 && (
                        <Highlighted
                            highlightedText={highlightedText}
                            countryCode={countryCode}
                            numArticles={numArticles}
                        />
                    )}
                </p>
            ))}
        </>
    );
};

export const ContributionsEpic: React.FC<EpicProps> = ({
    variant,
    tracking,
    countryCode,
    numArticles,
    onReminderOpen,
}: EpicProps) => {
    const [isReminderActive, setIsReminderActive] = useState(false);
    const { heading, backgroundImageUrl, showReminderFields } = variant;

    return (
        <section className={wrapperStyles}>
            {backgroundImageUrl && (
                <div className={imageWrapperStyles}>
                    <img
                        src={backgroundImageUrl}
                        className={imageStyles}
                        alt="Guardian contributions message"
                    />
                </div>
            )}

            {heading && (
                <h2
                    className={headingStyles}
                    dangerouslySetInnerHTML={{
                        __html: replacePlaceholders(heading, numArticles, countryCode),
                    }}
                />
            )}

            <EpicBody variant={variant} countryCode={countryCode} numArticles={numArticles} />

            {!isReminderActive && (
                <ContributionsEpicButtons
                    variant={variant}
                    tracking={tracking}
                    countryCode={countryCode}
                    onOpenReminderClick={(): void => {
                        const buttonCopyAsString = showReminderFields?.reminderCTA
                            .toLowerCase()
                            .replace(/\s/g, '-');

                        // This callback let's the platform react to the user interaction with the
                        // 'Remind me' button
                        if (onReminderOpen) {
                            onReminderOpen({
                                buttonCopyAsString,
                            } as OnReminderOpen);
                        }

                        setIsReminderActive(true);
                    }}
                />
            )}

            {isReminderActive && showReminderFields && (
                <ContributionsEpicReminder
                    reminderCTA={showReminderFields.reminderCTA}
                    reminderDate={showReminderFields.reminderDate}
                    reminderDateAsString={showReminderFields.reminderDateAsString}
                    onCloseReminderClick={(): void => setIsReminderActive(false)}
                />
            )}
        </section>
    );
};
