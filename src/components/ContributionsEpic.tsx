import React from 'react';
import { css } from 'emotion';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';
import { addTrackingParams } from '../lib/tracking';
import { getCountryName, getLocalCurrencySymbol } from '../lib/geolocation';
import { EpicTracking } from './ContributionsEpicTypes';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { Variant } from '../lib/variants';
import { componentJs } from './ContributionsEpic.js';
import { Button } from './Button';
import { transform } from '@babel/standalone';

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

const buttonWrapperStyles = css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &.hidden {
        display: none;
    }
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

const buttonMargins = css`
    margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
`;

export type Props = {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
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
    countryCode,
    numArticles,
}: Props) => {
    const { heading, backgroundImageUrl, cta, secondaryCta, showReminderFields } = variant;

    const primaryCtaText = cta?.text || 'Support The Guardian';
    const primaryCtaBaseUrl = cta?.baseUrl || 'https://support.theguardian.com/contribute';
    const primaryCtaUrlWithParams = addTrackingParams(primaryCtaBaseUrl, tracking);

    return (
        <section className={wrapperStyles} data-target="contributions-epic">
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

            <div className={buttonWrapperStyles} data-target="epic-buttons">
                <div className={buttonMargins}>
                    <Button onClickAction={primaryCtaUrlWithParams} showArrow>
                        {primaryCtaText}
                    </Button>
                </div>
                {secondaryCta && secondaryCta.baseUrl && secondaryCta.text && (
                    <div className={buttonMargins}>
                        <Button onClickAction={secondaryCta.baseUrl} showArrow priority="secondary">
                            {secondaryCta.text}
                        </Button>
                    </div>
                )}

                {showReminderFields && (
                    <div className={buttonMargins}>
                        <Button
                            // We need to pass a function into 'onClickAction'
                            // even though it won't be called when the button is
                            // clicked post-injection on the client side.
                            onClickAction={(): void => undefined}
                            data-target="epic-open"
                            isTertiary
                        >
                            {showReminderFields.reminderCTA}
                        </Button>
                    </div>
                )}

                <img
                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    className={paymentImageStyles}
                />
            </div>

            {showReminderFields && (
                <ContributionsEpicReminder
                    reminderCTA={showReminderFields.reminderCTA}
                    reminderDate={showReminderFields.reminderDate}
                    reminderDateAsString={showReminderFields.reminderDateAsString}
                />
            )}
        </section>
    );
};

export interface SlotComponent {
    component: JSX.Element;
    js: string;
}

export const contributionsEpicSlot = (props: Props): SlotComponent => {
    let js = '';
    if (props.variant.showReminderFields) {
        const contributionsReminderUrl =
            process.env.NODE_ENV === 'production'
                ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
                : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';
        const componentJsAsString = componentJs.toString();
        const componentJsTranspiled = transform(componentJsAsString, {
            presets: ['env'],
        }).code;
        if (componentJsTranspiled) {
            js = componentJsTranspiled
                .replace('"use strict";', '')
                .replace(/%%CONTRIBUTIONS_REMINDER_URL%%/g, contributionsReminderUrl);
        }
    }
    return {
        component: <ContributionsEpic {...props} />,
        js,
    };
};
