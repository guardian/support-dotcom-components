import React, { useState } from 'react';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { Container, Columns, Column } from '@guardian/src-layout';
import { commonStyles } from './ContributionsBannerCommonStyles';
import { css } from '@emotion/react';
import { between, from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import { brandAlt, neutral, space } from '@guardian/src-foundations';
import { ContributionsBannerCta } from './ContributionsBannerCta';
import { ContributionsBannerSecondaryCta } from './ContributionsBannerSecondaryCta';
import {
    ContributionsBannerExpandButton,
    ContributionsBannerCollapseButton,
} from './ContributionsBannerExpandButton';
import { BannerText } from '../common/BannerText';
import {
    ContributionsEpicChoiceCards,
    ChoiceCardSelection,
} from '../../epics/ContributionsEpicChoiceCards';

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
        ${body.small({ fontWeight: 'bold' })}
        padding-bottom: 10px;
        ${from.leftCol} {
            padding-left: 12px;
        }
    `,
    body: css`
        /* padding-bottom: 16px; */
    `,
    bodyAndHeading: css`
        position: relative; // for positioning the opt-out popup

        ${from.tablet} {
            /* padding-bottom: ${space[5]}px; */
        }
        ${from.leftCol} {
            /* margin-left: -9px; */
            /* border-left: 1px solid ${neutral[7]}; */
        }
        ${from.wide} {
            /* margin-left: -10px; */
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
    copy: css`
        ${from.leftCol} {
            padding-left: 12px;
        }
        padding-top: 2px;
    `,
    buttonsContainer: css`
        display: flex;
        flex-direction: row;
        height: 100%;
        box-sizing: border-box;
        padding-top: 8px;
        padding-bottom: 16px;
    `,
    ctasContainer: css`
        & > * + * {
            margin-top: ${space[3]}px;
        }
        display: flex;
        flex-direction: row;
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
};

const columnCounts = {
    tablet: 12,
    desktop: 12,
    leftCol: 14,
    wide: 16,
};

const BannerCheckoutReminder: React.FC<BannerRenderProps> = ({
    onCtaClick,
    onSecondaryCtaClick,
    content,
    abandonedCart,
    choiceCardAmounts,
    countryCode,
}: BannerRenderProps) => {
    const [isReminderOpen, setIsReminderOpen] = useState(false);
    const [isBannerOpen, setIsBannerOpen] = useState(false);

    const getDefaultChoiceCardSelection = (): ChoiceCardSelection | undefined => {
        if (choiceCardAmounts) {
            if (abandonedCart && abandonedCart.type === 'CONTRIBUTION') {
                const amount = choiceCardAmounts[abandonedCart.contributionType].includes(
                    abandonedCart.amount,
                )
                    ? abandonedCart.amount
                    : 'other';
                return { frequency: abandonedCart.contributionType, amount: amount };
            }
            return {
                frequency: 'MONTHLY',
                amount: choiceCardAmounts['MONTHLY'][1],
            };
        }
        return undefined;
    };

    const [choiceCardSelection, setChoiceCardSelection] = useState<ChoiceCardSelection | undefined>(
        getDefaultChoiceCardSelection(),
    );

    const onReminderCtaClick = () => {
        // reminderTracking.onReminderCtaClick();
        setIsReminderOpen(!isReminderOpen);
    };

    const onExpandClick = () => {
        setIsBannerOpen(true);
    };

    const onCollapseClick = () => {
        setIsBannerOpen(false);
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

    const BodyAndHeadingSlim = () => (
        <BannerText
            styles={{
                desktop: {
                    container: styles.bodyAndHeading,
                    heading: styles.heading,
                },
            }}
            content={content}
        />
    );

    const getCta = (url: string): string =>
        choiceCardSelection
            ? `${url}&selected-contribution-type=${choiceCardSelection.frequency}&selected-amount=${choiceCardSelection.amount}`
            : url;

    const buttons = (
        <div css={styles.buttonsContainer}>
            <div css={styles.ctasContainer}>
                {content.mainContent.primaryCta && (
                    <ContributionsBannerCta
                        onContributeClick={onCtaClick}
                        ctaText={content.mainContent.primaryCta.ctaText}
                        ctaUrl={getCta(content.mainContent.primaryCta.ctaUrl)}
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

    const expandButton = (
        <div>
            <ContributionsBannerExpandButton onExpandClick={onExpandClick} />
            {/* <ContributionsBannerCloseButton onCloseClick={onCloseClick} /> */}
        </div>
    );

    const collapseButton = (
        <div>
            <ContributionsBannerCollapseButton onCollapseClick={onCollapseClick} />
            {/* <ContributionsBannerCloseButton onCloseClick={onCloseClick} /> */}
        </div>
    );

    return (
        <div css={styles.bannerContainer}>
            <Container>
                {isBannerOpen && (
                    <>
                        <div css={styles.tabletAndDesktop}>
                            <Columns>
                                <Column width={3 / columnCounts.desktop}>
                                    <BodyAndHeading />
                                    {buttons}
                                </Column>
                                <Column width={1 / columnCounts.desktop}>{collapseButton}</Column>
                            </Columns>
                        </div>
                        <div css={styles.leftCol}>
                            <Columns>
                                <Column width={2 / columnCounts.leftCol}> </Column>
                                <Column width={8 / columnCounts.leftCol}>
                                    <BodyAndHeading />
                                    {buttons}
                                </Column>
                                <Column width={4 / columnCounts.leftCol}>{collapseButton}</Column>
                            </Columns>
                        </div>
                        <div css={styles.wide}>
                            <Columns>
                                <Column width={3 / columnCounts.wide}> </Column>
                                <Column width={8 / columnCounts.wide}>
                                    <BodyAndHeading />
                                    {choiceCardSelection && choiceCardAmounts && (
                                        <ContributionsEpicChoiceCards
                                            amounts={choiceCardAmounts}
                                            setSelectionsCallback={setChoiceCardSelection}
                                            selection={choiceCardSelection}
                                            countryCode={countryCode}
                                            submitComponentEvent={() => {
                                                console.log('submit!');
                                            }}
                                        />
                                    )}
                                    {buttons}
                                </Column>
                                <Column width={4 / columnCounts.wide}>{collapseButton}</Column>
                                <Column width={1 / columnCounts.wide}> </Column>
                            </Columns>
                        </div>
                    </>
                )}
            </Container>

            {!isBannerOpen && (
                <Container>
                    <div css={styles.tabletAndDesktop}>
                        <Columns>
                            <Column width={3 / columnCounts.desktop}>
                                <BodyAndHeadingSlim />
                            </Column>
                            <Column width={1 / columnCounts.desktop}>{expandButton}</Column>
                        </Columns>
                    </div>
                    <div css={styles.leftCol}>
                        <Columns>
                            <Column width={2 / columnCounts.leftCol}> </Column>
                            <Column width={8 / columnCounts.leftCol}>
                                <BodyAndHeadingSlim />
                            </Column>
                            <Column width={4 / columnCounts.leftCol}>{expandButton}</Column>
                        </Columns>
                    </div>
                    <div css={styles.wide}>
                        <Columns>
                            <Column width={3 / columnCounts.wide}> </Column>
                            <Column width={8 / columnCounts.wide}>
                                <BodyAndHeadingSlim />
                            </Column>
                            <Column width={4 / columnCounts.wide}>{expandButton}</Column>
                            <Column width={1 / columnCounts.wide}> </Column>
                        </Columns>
                    </div>
                </Container>
            )}
        </div>
    );
};
const unvalidated = bannerWrapper(BannerCheckoutReminder, 'contributions-banner');
const validated = validatedBannerWrapper(BannerCheckoutReminder, 'contributions-banner');

export { validated as ContributionsBanner, unvalidated as ContributionsBannerUnvalidated };
