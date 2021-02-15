import React from 'react';
import { styles } from '../ContributionsBannerStyles';
import { css } from '@emotion/core';
import { ContributionsBannerProps } from '../ContributionsBannerWrapper';
import contributionsBannerWrapper from '../ContributionsBannerWrapper';
import { Column, Columns, Container } from '@guardian/src-layout';
import { between, from } from '@guardian/src-foundations/mq';
import { ContributionsBannerCloseButton } from '../ContributionsBannerCloseButton';
import { ContributionsBannerCta } from '../ContributionsBannerCta';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations';
import { ContributionsBannerMobile } from '../ContributionsBannerMobile';

const variantBStyles = {
    heading: css`
        ${headline.medium({ fontWeight: 'bold' })}
        margin-top: 3px;
    `,
    bodyAndCta: css`
        border-left: 1px solid ${neutral[7]};
        padding: 5px 0 24px 8px;

        > :first-child {
            margin-bottom: 20px;
        }
    `,
    copy: css`
        max-width: 95%;
        &::first-letter {
            ${headline.xlarge({ fontWeight: 'bold' })}
            font-size: 86px; // override design system
            float: left;
            vertical-align: text-top;
            margin-right: 5px;
            margin-top: 9px; //for firefox
            line-height: 53px; // for chrome
        }
    `,
    closeButtonContainer: css`
        margin-top: 8px;
    `,

    tablet: css`
        display: none;
        ${between.tablet.and.desktop} {
            display: block;
        }
    `,
    desktop: css`
        display: none;
        ${between.desktop.and.leftCol} {
            display: block;
        }
    `,
    leftCol: css`
        display: none;
        ${between.leftCol.and.wide} {
            display: block;
        }
    `,
    wide: css`
        display: none;
        ${from.wide} {
            display: block;
        }
    `,
};

const columnCounts = {
    tablet: 12,
    desktop: 12,
    leftCol: 14,
    wide: 16,
};

const ContributionsBannerVariantB: React.FC<ContributionsBannerProps> = ({
    onContributeClick,
    onCloseClick,
    cleanHighlightedText,
    cleanMessageText,
    cleanMobileMessageText,
    cleanHeading,
    ctaUrl,
    ctaText,
}: ContributionsBannerProps) => {
    const Heading = () => <div css={variantBStyles.heading}>{cleanHeading}</div>;

    const BodyAndCta = () => (
        <div css={variantBStyles.bodyAndCta}>
            <div css={[styles.copy, variantBStyles.copy]}>
                {cleanMessageText}
                {cleanHighlightedText && (
                    <>
                        {' '}
                        <span css={styles.highlightedText}>{cleanHighlightedText}</span>
                    </>
                )}
            </div>
            <ContributionsBannerCta
                onContributeClick={onContributeClick}
                ctaText={ctaText}
                ctaUrl={ctaUrl}
                stacked={false}
            />
        </div>
    );

    const CloseButton = () => (
        <div css={variantBStyles.closeButtonContainer}>
            <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
        </div>
    );

    return (
        <div css={styles.bannerContainer}>
            <ContributionsBannerMobile
                onCloseClick={onCloseClick}
                onContributeClick={onContributeClick}
                heading={cleanHeading}
                messageText={cleanMobileMessageText || cleanMessageText}
                highlightedText={cleanHighlightedText}
                ctaUrl={ctaUrl}
                ctaText={ctaText}
            />

            <Container>
                <div css={variantBStyles.tablet}>
                    <Columns>
                        <Column width={4 / columnCounts.tablet}>
                            <Heading />
                        </Column>
                        <Column width={7 / columnCounts.tablet}>
                            <BodyAndCta />
                        </Column>
                        <Column width={1 / columnCounts.tablet}>
                            <CloseButton />
                        </Column>
                    </Columns>
                </div>
                <div css={variantBStyles.desktop}>
                    <Columns>
                        <Column width={3 / columnCounts.tablet}>
                            <Heading />
                        </Column>
                        <Column width={8 / columnCounts.desktop}>
                            <BodyAndCta />
                        </Column>
                        <Column width={1 / columnCounts.desktop}>
                            <CloseButton />
                        </Column>
                    </Columns>
                </div>
                <div css={variantBStyles.leftCol}>
                    <Columns>
                        <Column width={2 / columnCounts.leftCol}> </Column>
                        <Column width={3 / columnCounts.leftCol}>
                            <Heading />
                        </Column>
                        <Column width={8 / columnCounts.leftCol}>
                            <BodyAndCta />
                        </Column>
                        <Column width={1 / columnCounts.leftCol}>
                            <CloseButton />
                        </Column>
                    </Columns>
                </div>
                <div css={variantBStyles.wide}>
                    <Columns>
                        <Column width={3 / columnCounts.wide}> </Column>
                        <Column width={3 / columnCounts.wide}>
                            <Heading />
                        </Column>
                        <Column width={8 / columnCounts.wide}>
                            <BodyAndCta />
                        </Column>
                        <Column width={2 / columnCounts.wide}>
                            <CloseButton />
                        </Column>
                    </Columns>
                </div>
            </Container>
        </div>
    );
};

const wrapped = contributionsBannerWrapper(ContributionsBannerVariantB);

export { wrapped as ContributionsBannerVariantB };
