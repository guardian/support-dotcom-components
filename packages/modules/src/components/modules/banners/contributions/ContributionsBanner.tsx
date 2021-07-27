import React, { useState } from 'react';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { Container, Columns, Column, Hide } from '@guardian/src-layout';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/react';
import { between, from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { ContributionsBannerMobile } from './ContributionsBannerMobile';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import { ContributionsBannerCloseButton } from './ContributionsBannerCloseButton';
import { BannerText } from '../common/BannerText';
import { ContributionsBannerReminder } from './ContributionsBannerReminder';
import { SecondaryCtaType } from '../../../../types/shared';

const styles = {
    bannerContainer: css`
        overflow: hidden;
        width: 100%;
        background-color: ${brandAlt[400]};
        ${from.tablet} {
            border-top: 1px solid ${neutral[7]};
            padding-bottom: 0;
        }
    `,
    heading: css`
        margin: 0;
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

        ${from.tablet} {
            padding-bottom: ${space[5]}px;
        }
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
    ctasContainer: css`
        & > * + * {
            margin-top: ${space[3]}px;
        }
    `,
    reminderContainer: css`
        position: relative;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            margin-top: 0;
        }
    `,
    reminderLine: css`
        border-top: 1px solid black;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        ${from.leftCol} {
            left: calc(50% - 550px + 1120px * 0.14285714285714285 - 20px + 10px + 1px);
        }

        ${from.wide} {
            left: calc(50% - 630px + 1280px * 0.1875 - 20px + 10px);
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 90px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom-color: black;

            ${from.tablet} {
                left: calc(50% + 210px);
            }

            ${from.desktop} {
                left: calc(50% + 253px);
            }

            ${from.leftCol} {
                left: 732px;
            }

            ${from.wide} {
                left: 733px;
            }
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            left: 91px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 9px solid transparent;
            border-bottom-color: ${brandAlt[400]};

            ${from.tablet} {
                left: calc(50% + 211px);
            }

            ${from.desktop} {
                left: calc(50% + 254px);
            }

            ${from.leftCol} {
                left: 733px;
            }

            ${from.wide} {
                left: 734px;
            }
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

const ContributionsBanner: React.FC<BannerRenderProps> = ({
    onCtaClick,
    onSecondaryCtaClick,
    reminderTracking,
    onCloseClick,
    content,
    email,
}: BannerRenderProps) => {
    const [isReminderOpen, setIsReminderOpen] = useState(false);

    const onReminderCtaClick = () => {
        reminderTracking.onReminderCtaClick();
        setIsReminderOpen(!isReminderOpen);
    };

    const onReminderCloseClick = () => {
        reminderTracking.onReminderCloseClick();
        setIsReminderOpen(false);
    };

    const BodyAndHeading = () => (
        <BannerText
            styles={{
                desktop: {
                    container: styles.bodyAndHeading,
                    heading: styles.heading,
                    body: styles.body,
                    copy: [commonStyles.copy, styles.copy],
                    highlightedText: commonStyles.highlightedText,
                },
            }}
            content={content}
        />
    );

    const buttons = (
        <div css={styles.buttonsContainer}>
            <ContributionsBannerCloseButton onCloseClick={onCloseClick} />

            <div css={styles.ctasContainer}>
                {content.mainContent.primaryCta && (
                    <ContributionsBannerCta
                        onContributeClick={onCtaClick}
                        ctaText={content.mainContent.primaryCta.ctaText}
                        ctaUrl={content.mainContent.primaryCta.ctaUrl}
                        stacked={true}
                    />
                )}

                {content.mainContent.secondaryCta && (
                    <ContributionsBannerSecondaryCta
                        secondaryCta={content.mainContent.secondaryCta}
                        onReminderCtaClick={onReminderCtaClick}
                        onCustomCtaClick={onSecondaryCtaClick}
                    />
                )}
            </div>
        </div>
    );

    return (
        <div css={styles.bannerContainer}>
            <ContributionsBannerMobile
                onCloseClick={onCloseClick}
                onContributeClick={onCtaClick}
                onSecondaryCtaClick={onSecondaryCtaClick}
                content={content.mobileContent || content.mainContent}
                onReminderCtaClick={onReminderCtaClick}
                isReminderOpen={isReminderOpen}
                onReminderCloseClick={onReminderCloseClick}
                trackReminderSetClick={reminderTracking.onReminderSetClick}
                email={email}
            />

            <Container>
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

            <Hide below="tablet">
                {isReminderOpen &&
                    content.mainContent.secondaryCta?.type ===
                        SecondaryCtaType.ContributionsReminder && (
                        <div css={styles.reminderContainer}>
                            <div css={styles.reminderLine} />

                            <Container>
                                <Columns>
                                    <Column width={1}>
                                        <ContributionsBannerReminder
                                            reminderCta={content.mainContent.secondaryCta}
                                            trackReminderSetClick={
                                                reminderTracking.onReminderSetClick
                                            }
                                            onReminderCloseClick={onReminderCloseClick}
                                            email={email}
                                        />
                                    </Column>
                                </Columns>
                            </Container>
                        </div>
                    )}
            </Hide>
        </div>
    );
};

const unvalidated = bannerWrapper(ContributionsBanner, 'contributions-banner', 'contributions');
const validated = validatedBannerWrapper(
    ContributionsBanner,
    'contributions-banner',
    'contributions',
);

export { validated as ContributionsBanner, unvalidated as ContributionsBannerUnvalidated };
