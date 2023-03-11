import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import { BannerText } from '../common/BannerText';
import { BannerId, BannerRenderProps } from '../common/types';
import {
    banner,
    closeButtonStyles,
    containerOverrides,
    copyColumn,
    heading,
    highlightedTextBlueBanner,
    highlightedTextYellowBanner,
    iconAndClosePosition,
    choiceCardsColumn,
    logoContainer,
    paragraph,
    columnMarginOverrides,
} from './choiceCardsBannerStyles';
import { createInsertEventFromTracking, getLocalCurrencySymbol } from '@sdc/shared/dist/lib';
import { createViewEventFromTracking } from '@sdc/shared/dist/lib';
import { ChoiceCards } from './components/ChoiceCards';
import { ChoiceCardSelection } from '../../../hooks/choiceCards';
import { ContributionFrequency } from '@sdc/shared/src/types';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';

type ButtonPropTypes = {
    onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    bannerId: string;
};

const CloseButton = (props: ButtonPropTypes): ReactElement => {
    const closeComponentId = `${props.bannerId} : close`;
    return (
        <Button
            css={closeButtonStyles}
            data-link-name={closeComponentId}
            onClick={props.onClick}
            icon={<SvgCross />}
            size="small"
            priority="tertiary"
            hideLabel
        >
            Close this banner
        </Button>
    );
};

export type ChoiceCardsBannerRenderProps = {
    bannerId: BannerId;
    backgroundColor: string;
    headingColor: string;
};

export const ChoiceCardsBanner = ({
    bannerId,
    backgroundColor,
    headingColor,
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
    numArticles,
}: Omit<
    BannerRenderProps,
    'onCtaClick' | 'onSecondaryCtaClick' | 'onNotNowClick' | 'reminderTracking'
> &
    ChoiceCardsBannerRenderProps): JSX.Element => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();
    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen && tracking) {
            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }
        }

        if (submitComponentEvent && tracking) {
            submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [hasBeenSeen, submitComponentEvent]);

    useEffect(() => {
        if (choiceCardAmounts?.amounts) {
            const defaultFrequency: ContributionFrequency = 'MONTHLY';
            const localAmounts = choiceCardAmounts.amounts[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    const id = bannerId === 'choice-cards-banner-blue' || bannerId === 'choice-cards-banner-yellow';

    return (
        <section ref={setNode} css={banner(backgroundColor)} data-target={bannerId}>
            <Container cssOverrides={containerOverrides}>
                <Columns>
                    <Column width={1} cssOverrides={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelDefault />
                            </div>
                            <CloseButton onClick={onCloseClick} bannerId={bannerId} />
                        </Inline>
                    </Column>
                </Columns>
                <Columns collapseBelow="tablet" css={columnMarginOverrides}>
                    <Column width={1 / 2} cssOverrides={copyColumn}>
                        <BannerText
                            styles={{
                                desktop: {
                                    heading: heading(headingColor),
                                    copy: paragraph,
                                    highlightedText:
                                        bannerId === 'choice-cards-banner-blue'
                                            ? highlightedTextBlueBanner
                                            : highlightedTextYellowBanner,
                                },
                            }}
                            content={content}
                        />
                    </Column>
                    <Column width={1 / 2} cssOverrides={[choiceCardsColumn, columnMarginOverrides]}>
                        {choiceCardAmounts && (
                            <ChoiceCards
                                setSelectionsCallback={setChoiceCardSelection}
                                selection={choiceCardSelection}
                                submitComponentEvent={submitComponentEvent}
                                currencySymbol={currencySymbol}
                                componentId={id ? bannerId : 'choice-cards-banner-blue'}
                                amounts={choiceCardAmounts.amounts}
                                amountsTestName={choiceCardAmounts?.testName}
                                amountsVariantName={choiceCardAmounts?.variantName}
                                countryCode={countryCode}
                                bannerTracking={tracking}
                                numArticles={numArticles}
                                content={content}
                            />
                        )}
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};
