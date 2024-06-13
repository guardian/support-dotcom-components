import React, { ReactElement, useEffect, useState } from 'react';
import {
    Container,
    Columns,
    Column,
    Inline,
    Button,
    SvgRoundelBrand,
    SvgCross,
} from '@guardian/source/react-components';
import { BannerText } from '../common/BannerText';
import { BannerId, BannerRenderProps } from '../common/types';
import {
    banner,
    closeButtonStyles,
    containerOverrides,
    copyColumn,
    heading,
    highlightedTextBlueBanner,
    iconAndClosePosition,
    choiceCardsColumn,
    logoContainer,
    paragraph,
    columnMarginOverrides,
    choiceCardVerticalAlignment,
} from './choiceCardsButtonsBannerStyles';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib';
import { ChoiceCards } from './components/ChoiceCards';
import { ContributionFrequency } from '@sdc/shared/src/types';
import { ChoiceCardsBannerArticleCount } from './components/ChoiceCardsBannerArticleCount';
import { SerializedStyles } from '@emotion/react';
import {
    ArticleCount,
    CustomArticleCountCopy,
} from '../worldPressFreedomDay/components/ArticleCount';

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

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

export type ChoiceCardsBannerRenderProps = {
    bannerId: BannerId;
    backgroundColor: string;
    headingColor: string;
    borderTopColorStyle?: SerializedStyles;
};

export const ChoiceCardsButtonsBanner = ({
    bannerId,
    backgroundColor,
    headingColor,
    borderTopColorStyle,
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
    articleCounts,
    countType,
    isSupporter,
    separateArticleCount,
    separateArticleCountSettings,
}: Omit<
    BannerRenderProps,
    'onCtaClick' | 'onSecondaryCtaClick' | 'onNotNowClick' | 'reminderTracking'
> &
    ChoiceCardsBannerRenderProps): JSX.Element => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => {
        if (choiceCardAmounts?.amountsCardData) {
            const defaultFrequency: ContributionFrequency =
                choiceCardAmounts.defaultContributionType;
            const localAmounts = choiceCardAmounts.amountsCardData[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    const getCtaText = (contentType: 'mainContent' | 'mobileContent'): string => {
        const primaryCtaText = content[contentType]?.primaryCta?.ctaText;

        return primaryCtaText ? primaryCtaText : 'Contribute';
    };

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    const { copy, countType, type } = separateArticleCountSettings;
    const numArticles = articleCounts[countType ?? 'for52Weeks'];

    const showAboveArticleCount = !!(type === 'above');

    const showCustomArticleCount =
        separateArticleCountSettings &&
        showAboveArticleCount &&
        !isSupporter &&
        articleCounts['forTargetedWeeks'] !== undefined &&
        articleCounts['forTargetedWeeks'] > 5;

    const articleCount =
        copy && showCustomArticleCount ? (
            <CustomArticleCountCopy
                copy={copy}
                numArticles={articleCounts['forTargetedWeeks'] ?? 0}
            />
        ) : (
            <ChoiceCardsBannerArticleCount numArticles={articleCounts['for52Weeks'] ?? 0} />
        );
    return (
        <section css={banner(backgroundColor)} data-target={bannerId}>
            <Container
                cssOverrides={
                    borderTopColorStyle
                        ? [containerOverrides, borderTopColorStyle]
                        : [containerOverrides]
                }
            >
                <Columns>
                    <Column width={1} cssOverrides={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelBrand />
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
                                    highlightedText: highlightedTextBlueBanner,
                                },
                            }}
                            content={content}
                            articleCount={showArticleCount ? articleCount : undefined}
                        />
                    </Column>
                    <Column
                        width={1 / 2}
                        cssOverrides={[
                            choiceCardsColumn,
                            columnMarginOverrides,
                            choiceCardVerticalAlignment,
                        ]}
                    >
                        {choiceCardAmounts && (
                            <ChoiceCards
                                setSelectionsCallback={setChoiceCardSelection}
                                selection={choiceCardSelection}
                                submitComponentEvent={submitComponentEvent}
                                currencySymbol={currencySymbol}
                                componentId={'choice-cards-buttons-banner-blue'}
                                amounts={choiceCardAmounts.amountsCardData}
                                amountsTestName={choiceCardAmounts.testName}
                                amountsVariantName={choiceCardAmounts.variantName}
                                countryCode={countryCode}
                                bannerTracking={tracking}
                                numArticles={numArticles}
                                content={content}
                                getCtaText={getCtaText}
                            />
                        )}
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};
