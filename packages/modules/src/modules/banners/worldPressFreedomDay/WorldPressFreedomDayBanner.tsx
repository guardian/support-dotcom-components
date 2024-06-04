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
import { BannerRenderProps } from '../common/types';
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
} from './worldPressFreedomDayBannerStyles';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib';
import { ChoiceCards } from './components/ChoiceCards';
import { ContributionFrequency } from '@sdc/shared/src/types';
import { ArticleCount } from './components/ArticleCount';
import { TopImage } from './components/TopImage';
import { BottomImage } from './components/BottomImage';
import { validatedBannerWrapper, bannerWrapper } from '../common/BannerWrapper';

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

const WorldPressFreedomDayBanner = ({
    onCloseClick,
    content,
    choiceCardAmounts,
    countryCode,
    submitComponentEvent,
    tracking,
    numArticles,
    isSupporter,
    separateArticleCount,
}: BannerRenderProps): JSX.Element => {
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

    const showArticleCount =
        separateArticleCount && !isSupporter && numArticles !== undefined && numArticles > 5;

    const articleCount = <ArticleCount numArticles={numArticles ?? 0} />;

    return (
        <section css={banner} data-target="wpfd-banner">
            <Container cssOverrides={containerOverrides}>
                <Columns>
                    <Column width={1} cssOverrides={iconAndClosePosition}>
                        <Inline space={1}>
                            <div css={logoContainer}>
                                <SvgRoundelBrand />
                            </div>
                            <CloseButton onClick={onCloseClick} bannerId="wpfd-banner" />
                        </Inline>
                    </Column>
                </Columns>
                <Columns collapseBelow="tablet" css={columnMarginOverrides}>
                    <Column width={1 / 2} cssOverrides={copyColumn}>
                        <TopImage />
                        <BannerText
                            styles={{
                                desktop: {
                                    heading: heading,
                                    copy: paragraph,
                                    highlightedText: highlightedTextBlueBanner,
                                },
                            }}
                            content={content}
                            articleCount={showArticleCount ? articleCount : undefined}
                        />
                        <BottomImage />
                    </Column>
                    <Column width={1 / 2} cssOverrides={[choiceCardsColumn, columnMarginOverrides]}>
                        {choiceCardAmounts && (
                            <ChoiceCards
                                setSelectionsCallback={setChoiceCardSelection}
                                selection={choiceCardSelection}
                                submitComponentEvent={submitComponentEvent}
                                currencySymbol={currencySymbol}
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

const validated = validatedBannerWrapper(WorldPressFreedomDayBanner, 'wpfd-banner');
const unvalidated = bannerWrapper(WorldPressFreedomDayBanner, 'wpfd-banner');

export {
    validated as WorldPressFreedomDayBanner,
    unvalidated as WorldPressFreedomDayBannerUnValidated,
};
