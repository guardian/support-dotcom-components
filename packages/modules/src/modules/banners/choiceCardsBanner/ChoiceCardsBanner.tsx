import React, { ReactElement } from 'react';
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
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib';

import { ChoiceCards } from './components/ChoiceCards';
import {
    useBannerChoiceCardSelection,
    useChoiceCardsTrackingInsertEvent,
    useChoiceCardsTrackingViewEvent,
} from '../../../hooks/choiceCards';

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
    const { choiceCardSelection, setChoiceCardSelection } = useBannerChoiceCardSelection(
        choiceCardAmounts,
    );

    const setNode = useChoiceCardsTrackingViewEvent(tracking, submitComponentEvent);
    useChoiceCardsTrackingInsertEvent(tracking, submitComponentEvent);

    const currencySymbol = getLocalCurrencySymbol(countryCode);

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
                                ophanEventIdPrefix="supporter-plus-banner"
                                amounts={choiceCardAmounts.amounts}
                                amountsTestName={choiceCardAmounts?.testName}
                                amountsVariantName={choiceCardAmounts?.variantName}
                                countryCode={countryCode ?? ''}
                                tracking={tracking}
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
