import React from 'react';
import { css } from 'emotion';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';
import { PrimaryButton } from './PrimaryButton';

const currencySymbol = '£';

const replacePlaceholders = (content: string): string =>
    content.replace(/%%CURRENCY_SYMBOL%%/g, currencySymbol);

// Spacing values below are multiples of 4.
// See https://www.theguardian.design/2a1e5182b/p/449bd5
const wrapperStyles = css`
    padding: ${space[1]}px ${space[1]}px ${space[3]}px;
    border-top: 1px solid ${palette.brandYellow.main};
    background-color: ${palette.neutral[97]};

    * {
        ::selection {
            background: ${palette.brandYellow.main};
        }
        ::-moz-selection {
            background: ${palette.brandYellow.main};
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
    background-color: ${palette.brandYellow.main};
`;

const buttonWrapperStyles = css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const imageStyles = css`
    display: inline-block;
    width: auto;
    height: 25px;
    margin: ${space[1]}px 0;
`;

type Props = {
    heading?: string;
    paragraphs: string[];
    highlighted: string[];
};

type HighlightedProps = {
    highlighted: string[];
};

type BodyProps = {
    paragraphs: string[];
    highlighted: string[];
};

const Highlighted: React.FC<HighlightedProps> = ({ highlighted }: HighlightedProps) => (
    <strong className={highlightWrapperStyles}>
        {' '}
        {highlighted.map((highlightText, idx) => (
            <span
                key={idx}
                className={highlightStyles}
                dangerouslySetInnerHTML={{ __html: replacePlaceholders(highlightText) }}
            />
        ))}
    </strong>
);

const EpicBody: React.FC<BodyProps> = ({ highlighted, paragraphs }: BodyProps) => (
    <>
        {paragraphs.map((paragraph, idx) => (
            <p key={idx} className={bodyStyles}>
                <span dangerouslySetInnerHTML={{ __html: replacePlaceholders(paragraph) }} />

                {highlighted.length > 0 && idx === paragraphs.length - 1 && (
                    <Highlighted highlighted={highlighted} />
                )}
            </p>
        ))}
    </>
);

export const ContributionsEpic: React.FC<Props> = ({ heading, paragraphs, highlighted }: Props) => (
    <section className={wrapperStyles}>
        {heading && (
            <h2
                className={headingStyles}
                dangerouslySetInnerHTML={{ __html: replacePlaceholders(heading) }}
            />
        )}

        <EpicBody paragraphs={paragraphs} highlighted={highlighted} />

        <div className={buttonWrapperStyles}>
            <PrimaryButton
                url="https://support.theguardian.com/uk/contribute"
                linkText="Support The Guardian"
            />
            <img
                src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                className={imageStyles}
            />
        </div>
    </section>
);
