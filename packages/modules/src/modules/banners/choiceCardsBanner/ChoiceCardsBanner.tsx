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
    copyColumn,
    heading,
    highlightedText,
    iconAndClosePosition,
    imageColumn,
    imageContainer,
    logoContainer,
    paragraph,
} from './choiceCardsBannerStyles';

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
}: BannerRenderProps): JSX.Element => {
    console.log({ choiceCardAmounts });

    return (
        <section css={banner} data-target={bannerId}>
            <Container>
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
                        <div css={imageContainer}>{/* price cards */}</div>
                    </Column>
                </Columns>
            </Container>
        </section>
    );
};

const validated = validatedBannerWrapper(ChoiceCardsBanner, bannerId);
const unvalidated = bannerWrapper(ChoiceCardsBanner, bannerId);

export { validated as ChoiceCardsBanner, unvalidated as ChoiceCardsBannerUnValidated };
