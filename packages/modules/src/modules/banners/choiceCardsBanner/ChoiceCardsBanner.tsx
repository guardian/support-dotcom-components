import React, { ReactElement } from 'react';
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
    choiceCardsColumn,
    logoContainer,
    paragraph,
} from './choiceCardsBannerStyles';
import { getLocalCurrencySymbol } from '@sdc/shared/src/lib';
import {
    useChoiceCardSelection,
    useChoiceCardsTrackingInsertEvent,
    useChoiceCardsTrackingViewEvent,
} from '../../shared/helpers/choiceCards';
import { ChoiceCards } from './components/ChoiceCards';

const bannerId = 'choice-cards-banner';
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
    const { choiceCardSelection, setChoiceCardSelection } = useChoiceCardSelection(
        choiceCardAmounts,
    );

    const setNode = useChoiceCardsTrackingViewEvent(tracking, submitComponentEvent);
    useChoiceCardsTrackingInsertEvent(tracking, submitComponentEvent);

    const currencySymbol = getLocalCurrencySymbol(countryCode);

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
                    <Column width={1 / 2} cssOverrides={choiceCardsColumn}>
                        {choiceCardAmounts && (
                            <ChoiceCards
                                setSelectionsCallback={setChoiceCardSelection}
                                selection={choiceCardSelection}
                                submitComponentEvent={submitComponentEvent}
                                currencySymbol={currencySymbol}
                                ophanEventIdPrefix="supporter-plus-banner"
                                amounts={choiceCardAmounts.amounts}
                                amountsTestName={choiceCardAmounts?.testName}
                                amountsVariantName={choiceCardAmounts?.variantName}
                            />
                        )}
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBanner, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBanner, bannerId);

export { validated as ChoiceCardsBanner, unvalidated as ChoiceCardsBannerUnValidated };