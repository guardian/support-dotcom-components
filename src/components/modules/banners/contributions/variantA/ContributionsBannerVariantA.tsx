import React from 'react';
import contributionsBannerWrapper, {
    ContributionsBannerProps,
} from '../ContributionsBannerWrapper';
import { Container, Columns, Column } from '@guardian/src-layout';
import { styles } from '../ContributionsBannerStyles';
import { css } from '@emotion/core';
import { between, from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations';
import { ContributionsBannerMobile } from '../ContributionsBannerMobile';
import { ContributionsBannerCta } from '../ContributionsBannerCta';
import {ContributionsBannerCloseButton} from "../ContributionsBannerCloseButton";

const variantAStyles = {
    heading: css`
        ${headline.large({ fontWeight: 'bold' })}
        padding-bottom: 13px;
        padding-left: 12px;
    `,
    body: css`
        padding-bottom: 16px;
    `,
    bodyAndHeading: css`
        border-left: 1px solid ${neutral[7]};
    `,
    rule: css`
        border-top: 1px solid ${neutral[7]};
        width: 100%;
        position: absolute;
    `,
    copy: css`
        padding-left: 12px;
        padding-top: 2px;
    `,
    buttonsContainer: css`
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-top: 8px;
    `,
    ctaContainer: css`
        margin-bottom: 16px;
        display: flex;
        justify-content: flex-end;
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

const ContributionsBannerVariantA: React.FC<ContributionsBannerProps> = ({
    onContributeClick,
    onCloseClick,
    cleanHighlightedText,
    cleanMessageText,
    cleanMobileMessageText,
    cleanHeading,
    ctaUrl,
    ctaText,
}: ContributionsBannerProps) => {
    const BodyAndHeading = () => (
        <div css={variantAStyles.bodyAndHeading}>
            <div css={variantAStyles.heading}>{cleanHeading}</div>
            <div css={variantAStyles.body}>
                <div css={variantAStyles.rule} />
                <div css={[styles.copy, variantAStyles.copy]}>
                    {cleanMessageText}
                    {cleanHighlightedText && (
                        <>
                            {' '}
                            <span css={styles.highlightedText}>{cleanHighlightedText}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const buttons = (
        <div css={variantAStyles.buttonsContainer}>
            <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
            <div css={variantAStyles.ctaContainer}>
                <ContributionsBannerCta
                    onContributeClick={onContributeClick}
                    ctaText={ctaText}
                    ctaUrl={ctaUrl}
                />
            </div>
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
                <div css={variantAStyles.tablet}>
                    <Columns>
                        <Column width={8 / columnCounts.tablet}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.tablet}>{buttons}</Column>
                    </Columns>
                </div>
                <div css={variantAStyles.desktop}>
                    <Columns>
                        <Column width={8 / columnCounts.desktop}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={1 / columnCounts.desktop}> </Column>
                        <Column width={3 / columnCounts.desktop}>{buttons}</Column>
                    </Columns>
                </div>
                <div css={variantAStyles.leftCol}>
                    <Columns>
                        <Column width={2 / columnCounts.leftCol}> </Column>
                        <Column width={8 / columnCounts.leftCol}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.leftCol}>{buttons}</Column>
                    </Columns>
                </div>
                <div css={variantAStyles.wide}>
                    <Columns>
                        <Column width={3 / columnCounts.wide}> </Column>
                        <Column width={8 / columnCounts.wide}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.wide}>{buttons}</Column>
                        <Column width={1 / columnCounts.wide}> </Column>
                    </Columns>
                </div>
            </Container>
        </div>
    );
};

const wrapped = contributionsBannerWrapper(ContributionsBannerVariantA);

export { wrapped as ContributionsBannerVariantA };
