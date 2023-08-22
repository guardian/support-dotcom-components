import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Columns, Column, Inline } from '@guardian/src-layout';
import { Button } from '@guardian/src-button';
import { SvgRoundelBrand } from '@guardian/src-brand';
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
    iconAndClosePosition,
    choiceCardsColumn,
    logoContainer,
    paragraph,
    columnMarginOverrides,
} from './choiceCardsBannerStyles';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib';
import { ChoiceCards } from './components/ChoiceCards';
import { ContributionFrequency } from '@sdc/shared/src/types';
import { ChoiceCardsBannerArticleCount } from './components/ChoiceCardsBannerArticleCount';
import { SerializedStyles } from '@emotion/react';

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

export const ChoiceCardsBanner = ({
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
    numArticles,
    isSupporter,
    separateArticleCount,
}: Omit<
    BannerRenderProps,
    'onCtaClick' | 'onSecondaryCtaClick' | 'onNotNowClick' | 'reminderTracking'
> &
    ChoiceCardsBannerRenderProps): JSX.Element => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

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

    const getCtaText = (contentType: 'mainContent' | 'mobileContent'): string => {
        const primaryCtaText = content[contentType]?.primaryCta?.ctaText;

        return primaryCtaText ? primaryCtaText : 'Contribute';
    };

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    const id = bannerId === 'choice-cards-banner-blue';

    const showArticleCount =
        separateArticleCount && !isSupporter && numArticles !== undefined && numArticles > 5;

    const articleCount = <ChoiceCardsBannerArticleCount numArticles={numArticles ?? 0} />;

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
                                getCtaText={getCtaText}
                                cssCtaOverides={undefined}
                            />
                        )}
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};
