import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { Button, buttonBrandAlt, buttonReaderRevenue, LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/src/types';
import { SvgCross } from '@guardian/src-icons';
import { ArticleCountOptOutPopup } from '../../shared/ArticleCountOptOutPopup';

const bannerStyles = {
    container: css`
        background: ${neutral[0]};
        border-top: 1px solid ${neutral[0]};

        * {
            box-sizing: border-box;
        }
    `,
    headerContainer: css`
        position: relative;
    `,
    header: css`
        background: ${neutral[100]};
        padding: ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            max-width: 160px;
            margin: 0;
        }
    `,
    shadowTriangle: css`
        width: 100px;
        position: absolute;
        top: 0;
        right: 0;
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[3]}px;
    `,
    closeButton: css`
        background-color: ${neutral[100]};
        color: ${neutral[0]};
    `,
    bottomContainer: css`
        padding: ${space[2]}px ${space[3]}px ${space[3]}px;
    `,
    articleCount: css`
        ${headline.xxxsmall({ fontWeight: 'bold' })}
        font-size: 15px;
        color: ${brandAlt[400]};
    `,
    body: css`
        ${body.small()}
        margin-top: ${space[1]}px;
        color: ${neutral[100]};

        p {
            margin: 0;
        }
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        margin-top: ${space[4]}px;

        & > * + * {
            margin-left: ${space[4]}px;
        }
    `,
    primaryCtaContainer: css`
        display: flex;
        flex-direction: column;
    `,
    paymentIconsContainer: css`
        margin-top: ${space[1]}px;
        margin-left: ${space[4]}px;

        img {
            height: 12px;
            width: auto;
        }
    `,
    secondaryCta: css`
        background-color: ${neutral[0]};
        border: 1px solid ${neutral[100]};
    `,
};

function InvestigationsMomentBanner({ content, onCloseClick, numArticles }: BannerRenderProps) {
    return (
        <div css={bannerStyles.container}>
            <div css={bannerStyles.headerContainer}>
                <header css={bannerStyles.header}>
                    <h2>{content.mainContent.heading}</h2>
                </header>

                <div css={bannerStyles.shadowTriangle}>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 130 0, 130 100" />
                    </svg>
                </div>

                <div css={bannerStyles.closeButtonContainer}>
                    <Button
                        onClick={onCloseClick}
                        cssOverrides={bannerStyles.closeButton}
                        icon={<SvgCross />}
                        size="xsmall"
                        hideLabel
                    >
                        Close
                    </Button>
                </div>
            </div>

            <div css={bannerStyles.bottomContainer}>
                {numArticles && (
                    <section css={bannerStyles.articleCount}>
                        You have read{' '}
                        <ArticleCountOptOutPopup
                            numArticles={numArticles}
                            nextWord=" articles"
                            type="banner"
                        />{' '}
                        in the past year
                    </section>
                )}

                <section css={bannerStyles.body}>
                    <p>{content.mainContent.messageText}</p>
                </section>

                <section css={bannerStyles.ctasContainer}>
                    <div css={bannerStyles.primaryCtaContainer}>
                        <ThemeProvider theme={buttonReaderRevenue}>
                            <LinkButton size="small" priority="primary">
                                {content.mainContent.primaryCta?.ctaText}
                            </LinkButton>
                        </ThemeProvider>

                        <div css={bannerStyles.paymentIconsContainer}>
                            <img
                                width={422}
                                height={60}
                                src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                                alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                            />
                        </div>
                    </div>

                    {content.mainContent.secondaryCta?.type === SecondaryCtaType.Custom && (
                        <ThemeProvider theme={buttonBrandAlt}>
                            <LinkButton
                                cssOverrides={bannerStyles.secondaryCta}
                                size="small"
                                priority="primary"
                            >
                                {content.mainContent.secondaryCta.cta.ctaText}
                            </LinkButton>
                        </ThemeProvider>
                    )}
                </section>
            </div>
        </div>
    );
}

const unvalidated = bannerWrapper(InvestigationsMomentBanner, 'investigations-moment-banner');
const validated = validatedBannerWrapper(
    InvestigationsMomentBanner,
    'investigations-moment-banner',
);

export {
    validated as InvestigationsMomentBanner,
    unvalidated as InvestigationsMomentBannerUnvalidated,
};
