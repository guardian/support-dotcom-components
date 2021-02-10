// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { styles } from './ContributionsBannerStyles';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross, SvgArrowRightStraight } from '@guardian/src-icons';
import { ThemeProvider } from '@emotion/react';
import { Button, LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { replaceArticleCount } from '../../../../lib/replaceArticleCount';
import { Hide } from '@guardian/src-layout';
import ContributionsBannerWrapper, { ContributionsBannerProps } from './ContributionsBannerWrapper';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

interface ContributionsBannerBodyProps {
    cleanMessageText: string;
    cleanMobileMessageText?: string;
    numArticles: number;
}

const ContributionsBannerBody: React.FC<ContributionsBannerBodyProps> = ({
    cleanMessageText,
    cleanMobileMessageText,
    numArticles,
}) => {
    if (cleanMobileMessageText) {
        return (
            <>
                <Hide above="phablet">
                    <span css={styles.messageText}>
                        {replaceArticleCount(cleanMobileMessageText, numArticles, 'banner')}
                    </span>
                </Hide>
                <Hide below="phablet">
                    <span css={styles.messageText}>
                        {replaceArticleCount(cleanMessageText, numArticles, 'banner')}
                    </span>
                </Hide>
            </>
        );
    } else {
        return (
            <span css={styles.messageText}>
                {replaceArticleCount(cleanMessageText, numArticles, 'banner')}
            </span>
        );
    }
};

const ContributionsBanner: React.FC<ContributionsBannerProps> = ({
    onContributeClick,
    onCloseClick,
    cleanHighlightedText,
    cleanMessageText,
    cleanMobileMessageText,
    cleanHeading,
    ctaUrl,
    ctaText,
    numArticles = 0,
}: ContributionsBannerProps) => {
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
                                        {replaceArticleCount(cleanHeading, numArticles, 'banner')}
                                    </span>{' '}
                                </>
                            )}
                            <ContributionsBannerBody
                                cleanMessageText={cleanMessageText}
                                cleanMobileMessageText={cleanMobileMessageText}
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
                                        href={ctaUrl}
                                    >
                                        {ctaText}
                                    </LinkButton>
                                </ThemeProvider>
                                <img
                                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                                    css={styles.paymentMethods}
                                />
                            </div>
                        </div>
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
                                >
                                    Close
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const wrapped = ContributionsBannerWrapper(ContributionsBanner);

export { wrapped as ContributionsBanner };
