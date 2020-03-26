import React from 'react';
import { css } from 'emotion';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';
import { PrimaryButton } from './PrimaryButton';
import { getTrackingUrl } from '../lib/tracking';
import { getCountryName, getLocalCurrencySymbol } from '../lib/geolocation';
import { EpicLocalisation, EpicTracking } from './ContributionsEpicTypes';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { Variant } from '../lib/variants';
import { ContributionsEpicInit } from './ContributionsEpic.js';

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

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
`;

const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandAlt[400]};
`;

const buttonWrapperStyles = css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const paymentImageStyles = css`
    display: inline-block;
    width: auto;
    height: 25px;
    margin: ${space[1]}px 0;
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

export type Props = {
    variant: Variant;
    tracking: EpicTracking;
    localisation: EpicLocalisation;
    numArticles: number;
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

export const ContributionsEpic: React.FC<Props> = ({
    variant,
    tracking,
    localisation,
    numArticles,
}: Props) => {
    const { heading, backgroundImageUrl, showReminderFields } = variant;
    const { countryCode } = localisation;

    // Get button URL with tracking params in query string
    const buttonBaseUrl = 'https://support.theguardian.com/uk/contribute';
    const buttonTrackingUrl = getTrackingUrl(buttonBaseUrl, tracking);

    return (
        <section className={wrapperStyles}>
            {backgroundImageUrl && (
                <div className={imageWrapperStyles}>
                    <img
                        src={backgroundImageUrl}
                        className={imageStyles}
                        alt="Image for Guardian contributions message"
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

            <div className={buttonWrapperStyles}>
                <PrimaryButton url={buttonTrackingUrl} linkText="Support The Guardian" />
                <img
                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    className={paymentImageStyles}
                />
            </div>

            {showReminderFields && (
                <ContributionsEpicReminder
                    reminderDate={showReminderFields.reminderDate}
                    reminderDateAsString={showReminderFields.reminderDateAsString}
                />
            )}
        </section>
    );
};

export default {
    name: 'Components/ContributionsEpic',
    Component: ContributionsEpic,
    getInitScript: (props: Props): string | undefined => {
        if (props.variant.showReminderFields) {
            const contributionsReminderUrl =
                process.env.NODE_ENV === 'production'
                    ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
                    : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';
            const initScript = ContributionsEpicInit.toString();
            return initScript.replace(/%%CONTRIBUTIONS_REMINDER_URL%%/g, contributionsReminderUrl);
        }

        return undefined;
    },
};
