import React from 'react';
import contributionsBannerWrapper, { ContributionsBannerProps } from './ContributionsBannerWrapper';
import { Container, Columns, Column } from '@guardian/src-layout';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/core';
import { between, from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { brandAlt, neutral } from '@guardian/src-foundations';
import { ContributionsBannerMobile } from './ContributionsBannerMobile';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';

const styles = {
    bannerContainer: css`
        overflow: hidden;
        width: 100%;
        background-color: ${brandAlt[400]};
        border-top: 1px solid ${neutral[7]};
    `,
    columnsContainer: css`
        ${between.tablet.and.leftCol} {
            border-left: 1px solid ${neutral[7]};
        }
    `,
    heading: css`
        ${headline.large({ fontWeight: 'bold' })}
        padding-bottom: 10px;
        ${from.leftCol} {
            padding-left: 12px;
        }
    `,
    body: css`
        padding-bottom: 16px;
    `,
    bodyAndHeading: css`
        position: relative; // for positioning the opt-out popup
        ${from.leftCol} {
            margin-left: -9px;
            border-left: 1px solid ${neutral[7]};
        }
        ${from.wide} {
            margin-left: -10px;
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
        box-sizing: border-box;
        padding-top: 8px;
        padding-bottom: 16px;
    `,
    ctaContainer: css`
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

const ContributionsBanner: React.FC<ContributionsBannerProps> = ({
    onContributeClick,
    onSecondaryCtaClick,
    onCloseClick,
    content,
    mobileContent,
}: ContributionsBannerProps) => {
    const BodyAndHeading = () => (
        <div css={styles.bodyAndHeading}>
            <div css={styles.heading}>{content.heading}</div>
            <div css={styles.body}>
                <div css={[commonStyles.copy, styles.copy]}>
                    {content.messageText}
                    {content.highlightedText && (
                        <>
                            {' '}
                            <span css={commonStyles.highlightedText}>
                                {content.highlightedText}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const buttons = (
        <div css={styles.buttonsContainer}>
            <ContributionsBannerCloseButton onCloseClick={onCloseClick} />
            {content.primaryCta && (
                <div css={styles.ctaContainer}>
                    <ContributionsBannerCta
                        onContributeClick={onContributeClick}
                        ctaText={content.primaryCta.ctaText}
                        ctaUrl={content.primaryCta.ctaUrl}
                        stacked={true}
                    />
                </div>
            )}
            {content.secondaryCta && (
                <div css={styles.ctaContainer}>
                    <ContributionsBannerCta
                        onContributeClick={onSecondaryCtaClick}
                        ctaText={content.secondaryCta.ctaText}
                        ctaUrl={content.secondaryCta.ctaUrl}
                        stacked={true}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div css={styles.bannerContainer}>
            <ContributionsBannerMobile
                onCloseClick={onCloseClick}
                onContributeClick={onContributeClick}
                content={mobileContent || content}
            />

            <Container cssOverrides={styles.columnsContainer}>
                <div css={styles.tabletAndDesktop}>
                    <Columns>
                        <Column width={8 / columnCounts.tablet}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.tablet}>{buttons}</Column>
                    </Columns>
                </div>
                <div css={styles.leftCol}>
                    <Columns>
                        <Column width={2 / columnCounts.leftCol}> </Column>
                        <Column width={8 / columnCounts.leftCol}>
                            <BodyAndHeading />
                        </Column>
                        <Column width={4 / columnCounts.leftCol}>{buttons}</Column>
                    </Columns>
                </div>
                <div css={styles.wide}>
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

const wrapped = contributionsBannerWrapper(ContributionsBanner);

export { wrapped as ContributionsBanner };
