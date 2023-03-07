import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgRoundelDefault } from '@guardian/src-brand';
import { SvgCross } from '@guardian/src-icons';
import { BannerText } from '../common/BannerText';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import {
    banner,
    closeButtonStyles,
    containerOverrides,
    copyColumn,
    heading,
    highlightedText,
    iconAndClosePosition,
    imageColumn,
    imageContainer,
    logoContainer,
    paragraph,
} from './choiceCardsBannerStyles';
import {
    ChoiceCardSelection,
    ContributionsEpicChoiceCards,
} from '../../epics/ContributionsEpicChoiceCards';
import {
    createInsertEventFromTracking,
    createViewEventFromTracking,
    getLocalCurrencySymbol,
} from '@sdc/shared/src/lib';
import { ContributionFrequency } from '@sdc/shared/src/types';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';

const bannerId = 'price-cards-banner';
const closeComponentId = `${bannerId} : close`;

type ButtonPropTypes = {
    onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const CloseButton = (props: ButtonPropTypes): ReactElement => (
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

const ChoiceCardsBanner = ({
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
}: BannerRenderProps): JSX.Element => {
    console.log({ choiceCardAmounts });

    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    useEffect(() => {
        if (choiceCardAmounts?.amounts) {
            const defaultFrequency: ContributionFrequency = 'MONTHLY';
            const localAmounts = choiceCardAmounts.amounts[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;
            console.log('in here', defaultFrequency, localAmounts, defaultAmount);

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    useEffect(() => {
        if (hasBeenSeen && tracking) {
            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    useEffect(() => {
        if (submitComponentEvent && tracking) {
            submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [submitComponentEvent]);

    return (
        <section ref={setNode} css={banner} data-target={bannerId}>
            <Container cssOverrides={containerOverrides}>
                <Columns>
                    <Column width={1} cssOverrides={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelDefault />
                            </div>
                            <CloseButton onClick={onCloseClick} />
                        </Inline>
                    </Column>
                </Columns>
                <Columns collapseBelow="tablet">
                    <Column width={1 / 2} cssOverrides={copyColumn}>
                        <BannerText
                            styles={{
                                desktop: {
                                    heading,
                                    copy: paragraph,
                                    highlightedText,
                                },
                            }}
                            content={content}
                        />
                    </Column>
                    <Column width={1 / 2} cssOverrides={imageColumn}>
                        <div css={imageContainer}>
                            {choiceCardAmounts && (
                                <ContributionsEpicChoiceCards
                                    setSelectionsCallback={setChoiceCardSelection}
                                    selection={choiceCardSelection}
                                    submitComponentEvent={submitComponentEvent}
                                    currencySymbol={currencySymbol}
                                    amounts={choiceCardAmounts.amounts}
                                    amountsTestName={choiceCardAmounts?.testName}
                                    amountsVariantName={choiceCardAmounts?.variantName}
                                />
                            )}
                        </div>
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBanner, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBanner, bannerId);

export { validated as ChoiceCardsBanner, unvalidated as ChoiceCardsBannerUnValidated };
