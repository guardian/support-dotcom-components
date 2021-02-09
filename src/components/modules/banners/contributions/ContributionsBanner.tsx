// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    createClickEventFromTracking,
} from '../../../../lib/tracking';
import { setChannelClosedTimestamp } from '../localStorage';
import React, { useState } from 'react';
import { BannerProps } from '../../../../types/BannerTypes';
import { styles } from './ContributionsBannerStyles';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '../../../../lib/placeholders';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross, SvgArrowRightStraight } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { Button, LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';
import { Hide } from '@guardian/src-layout/components/hide/hide';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

interface ContributionsBannerBodyProps {
    messageText: string;
    mobileMessageText: string;
    numArticles: number;
}

const ContributionsBannerBody: React.FC<ContributionsBannerBodyProps> = ({
    messageText,
    mobileMessageText,
    numArticles,
}) => {
    if (mobileMessageText) {
        return (
            <>
                <Hide above="phablet">
                    <span css={styles.messageText}>
                        {replaceArticleCount(mobileMessageText, numArticles, 'banner')}
                    </span>
                </Hide>
                <Hide below="phablet">
                    <span css={styles.messageText}>
                        {replaceArticleCount(messageText, numArticles, 'banner')}
                    </span>
                </Hide>
            </>
        );
    } else {
        return (
            <span css={styles.messageText}>
                {replaceArticleCount(messageText, numArticles, 'banner')}
            </span>
        );
    }
};

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const { content, countryCode } = props;
    const numArticles = props.numArticles || 0;

    const onContributeClick = (): void => {
        const componentClickEvent = createClickEventFromTracking(props.tracking, ctaComponentId);
        if (props.submitComponentEvent) {
            props.submitComponentEvent(componentClickEvent);
        }
    };

    const onCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(props.tracking, closeComponentId);
        if (props.submitComponentEvent) {
            props.submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setChannelClosedTimestamp(props.bannerChannel);
    };

    if (content && countryCode && showBanner) {
        const cleanHighlightedText =
            content.highlightedText &&
            replaceNonArticleCountPlaceholders(content.highlightedText, countryCode).trim();

        const cleanMessageText = replaceNonArticleCountPlaceholders(
            content.messageText,
            countryCode,
        ).trim();

        const cleanMobileMessageText = replaceNonArticleCountPlaceholders(
            content.mobileMessageText,
            countryCode,
        ).trim();

        const cleanHeading = replaceNonArticleCountPlaceholders(
            content.heading,
            countryCode,
        ).trim();

        const copyHasPlaceholder =
            containsNonArticleCountPlaceholder(cleanMessageText) ||
            (!!cleanMobileMessageText &&
                containsNonArticleCountPlaceholder(cleanMobileMessageText)) ||
            (!!cleanHighlightedText && containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
            (!!cleanHeading && containsNonArticleCountPlaceholder(cleanHeading));

        if (!copyHasPlaceholder) {
            return (
                <>
                    <div css={styles.bannerContainer}>
                        <div css={styles.banner}>
                            <div css={styles.leftRoundel}>
                                <div css={styles.roundelContainer}>
                                    <SvgRoundel />
                                </div>
                            </div>
                            <div css={styles.copyAndCta}>
                                <div css={styles.copy}>
                                    {cleanHeading && (
                                        <>
                                            <span css={styles.heading}>
                                                {replaceArticleCount(
                                                    cleanHeading,
                                                    numArticles,
                                                    'banner',
                                                )}
                                            </span>{' '}
                                        </>
                                    )}
                                    <ContributionsBannerBody
                                        messageText={cleanMessageText}
                                        mobileMessageText={cleanMobileMessageText}
                                        numArticles={numArticles}
                                    />
                                    {cleanHighlightedText && (
                                        <>
                                            {' '}
                                            <span css={styles.highlightedText}>
                                                {replaceArticleCount(
                                                    cleanHighlightedText,
                                                    numArticles,
                                                    'banner',
                                                )}
                                            </span>
                                        </>
                                    )}
                                </div>
                                {content.cta && (
                                    <div css={styles.ctaContainer}>
                                        <div css={styles.cta}>
                                            <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                                                <LinkButton
                                                    data-link-name={ctaComponentId}
                                                    css={styles.ctaButton}
                                                    priority="primary"
                                                    size="small"
                                                    icon={<SvgArrowRightStraight />}
                                                    iconSide="right"
                                                    nudgeIcon={true}
                                                    onClick={onContributeClick}
                                                    hideLabel={false}
                                                    aria-label="Contribute"
                                                    href={addRegionIdAndTrackingParamsToSupportUrl(
                                                        content.cta.baseUrl,
                                                        props.tracking,
                                                        props.countryCode,
                                                    )}
                                                >
                                                    {content.cta.text}
                                                </LinkButton>
                                            </ThemeProvider>
                                            <img
                                                src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                                                alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                                                css={styles.paymentMethods}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div css={styles.rightButtons}>
                                <div css={styles.rightRoundel}>
                                    <div css={styles.roundelContainer}>
                                        <SvgRoundel />
                                    </div>
                                </div>
                                <div css={styles.closeButtonContainer}>
                                    <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                                        <Button
                                            aria-label="Close"
                                            data-link-name={closeComponentId}
                                            priority="tertiary"
                                            size="small"
                                            icon={<SvgCross />}
                                            nudgeIcon={false}
                                            onClick={onCloseClick}
                                            hideLabel={true}
                                            iconSide="left"
                                        />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            console.log('Banner copy contains placeholders, abandoning.');
        }
    }

    return null;
};
