import React from 'react';
import * as z from 'zod';
import contributionsBannerWrapper, { ContributionsBannerProps } from './ContributionsBannerWrapper';
import { Container, Columns, Column } from '@guardian/src-layout';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { between, from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { brandAlt, neutral } from '@guardian/src-foundations';
import { ContributionsBannerMobile } from './ContributionsBannerMobile';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';
import { withParsedProps } from '../../shared/ModuleWrapper';
import { BannerProps } from '../../../../types/BannerTypes';

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
        align-items: flex-end;
        height: 100%;
        box-sizing: border-box;
        padding-top: 8px;
        padding-bottom: 16px;
    `,
    ctasContainer: css`
        & > * + * {
            margin-top: ${space[3]}px;
        }
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

            <div css={styles.ctasContainer}>
                {content.primaryCta && (
                    <ContributionsBannerCta
                        onContributeClick={onContributeClick}
                        ctaText={content.primaryCta.ctaText}
                        ctaUrl={content.primaryCta.ctaUrl}
                        stacked={true}
                    />
                )}

                {content.secondaryCta && (
                    <ContributionsBannerSecondaryCta
                        onCtaClick={onSecondaryCtaClick}
                        ctaText={content.secondaryCta.ctaText}
                        ctaUrl={content.secondaryCta.ctaUrl}
                    />
                )}
            </div>
        </div>
    );

    return (
        <div css={styles.bannerContainer}>
            <ContributionsBannerMobile
                onCloseClick={onCloseClick}
                onContributeClick={onContributeClick}
                onSecondaryCtaClick={onSecondaryCtaClick}
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

const tickerEndTypeSchema = z.enum(['unlimited', 'hardstop']);

const tickerCountTypeSchema = z.enum(['money', 'people']);

const tickerCopySchema = z.object({
    countLabel: z.string(),
    goalReachedPrimary: z.string(),
    goalReachedSecondary: z.string(),
});

const tickerDataSchema = z.object({
    total: z.number(),
    goal: z.number(),
});

const tickerSettingsSchema = z.object({
    endType: tickerEndTypeSchema,
    countType: tickerCountTypeSchema,
    currencySymbol: z.string(),
    copy: tickerCopySchema,
    tickerData: tickerDataSchema,
});

const ctaSchema = z.object({
    text: z.string(),
    baseUrl: z.string(),
});

const bannerContentSchema = z.object({
    heading: z.string().optional(),
    messageText: z.string(),
    mobileMessageText: z.string().optional(),
    highlightedText: z.string().optional(),
    cta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
});

const bannerChannelSchema = z.enum(['contributions', 'subscriptions']);

const ophanComponentTypeSchema = z.enum([
    'ACQUISITIONS_EPIC',
    'ACQUISITIONS_ENGAGEMENT_BANNER',
    'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    'ACQUISITIONS_HEADER',
    'ACQUISITIONS_OTHER',
]);

const ophanProductSchema = z.enum([
    'CONTRIBUTION',
    'MEMBERSHIP_SUPPORTER',
    'DIGITAL_SUBSCRIPTION',
    'PRINT_SUBSCRIPTION',
]);

const bannerTrackingSchema = z.object({
    abTestName: z.string(),
    abTestVariant: z.string(),
    campaignCode: z.string(),
    componentType: ophanComponentTypeSchema,
    products: z.array(ophanProductSchema).optional(),
    ophanPageId: z.string(),
    platformId: z.string(),
    referrerUrl: z.string(),
    clientName: z.string(),
});

const bannerSchema = z.object({
    tracking: bannerTrackingSchema,
    bannerChannel: bannerChannelSchema,
    content: bannerContentSchema.optional(),
    mobileContent: bannerContentSchema.optional(),
    countryCode: z.string().optional(),
    isSupporter: z.boolean().optional(),
    tickerSettings: tickerSettingsSchema.optional(),
    submitComponentEvent: z.any(),
    numArticles: z.number().optional(),
    hasOptedOutOfArticleCount: z.boolean().optional(),
});

const validate = (props: unknown): props is BannerProps => {
    const result = bannerSchema.safeParse(props);
    return result.success;
};

const banner = contributionsBannerWrapper(ContributionsBanner);
const wrapped = withParsedProps(banner, validate);

export { wrapped as ContributionsBanner, banner as ContributionsBannerUnwrapped };
