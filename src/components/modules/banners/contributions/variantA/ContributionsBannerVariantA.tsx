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
import { ContributionsBannerCloseButton } from '../ContributionsBannerCloseButton';

const variantAStyles = {
    columnsContainer: css`
        ${between.tablet.and.leftCol} {
            border-left: 1px solid ${neutral[7]};
        }
    `,
    heading: css`
        ${headline.large({ fontWeight: 'bold' })}
        padding-bottom: 13px;
        ${from.leftCol} {
            padding-left: 12px;
        }
    `,
    body: css`
        padding-bottom: 16px;
    `,
    bodyAndHeading: css`
        ${from.leftCol} {
            margin-left: -9px;
            border-left: 1px solid ${neutral[7]};
        }
        ${from.wide} {
            margin-left: -10px;
        }
    `,
    rule: css`
        border-top: 1px solid ${neutral[7]};
        width: 100%;
        position: absolute;
        ${between.tablet.and.leftCol} {
            margin-left: -20px;
        }
    `,
    copy: css`
        ${from.leftCol} {
            padding-left: 12px;
        }
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

    tabletAndDesktop: css`
        display: none;
        ${between.tablet.and.leftCol} {
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
                    stacked={true}
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

            <Container cssOverrides={variantAStyles.columnsContainer}>
                <div css={variantAStyles.tabletAndDesktop}>
                    <Columns>
                        <Column width={8 / columnCounts.tablet}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.tablet}>{buttons}</Column>
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
