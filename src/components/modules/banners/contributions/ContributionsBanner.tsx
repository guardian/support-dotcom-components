// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { styles } from './ContributionsBannerStyles';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross, SvgArrowRightStraight } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { Button, LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import contributionsBannerWrapper, { ContributionsBannerProps } from './ContributionsBannerWrapper';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

interface ContributionsBannerBodyProps {
    cleanMessageText: JSX.Element[];
    cleanMobileMessageText: JSX.Element[] | null;
}

const ContributionsBannerBody: React.FC<ContributionsBannerBodyProps> = ({
    cleanMessageText,
    cleanMobileMessageText,
}) => {
    if (cleanMobileMessageText) {
        return (
            <>
                <Hide above="tablet">
                    <span css={styles.messageText}>{cleanMessageText}</span>
                </Hide>
                <Hide below="tablet">
                    <span css={styles.messageText}>{cleanMobileMessageText}</span>
                </Hide>
            </>
        );
    } else {
        return <span css={styles.messageText}>{cleanMessageText}</span>;
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
                                    <span css={styles.heading}>{cleanHeading}</span>{' '}
                                </>
                            )}
                            <ContributionsBannerBody
                                cleanMessageText={cleanMessageText}
                                cleanMobileMessageText={cleanMobileMessageText}
                            />
                            {cleanHighlightedText && (
                                <>
                                    {' '}
                                    <span css={styles.highlightedText}>{cleanHighlightedText}</span>
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

const wrapped = contributionsBannerWrapper(ContributionsBanner);

export { wrapped as ContributionsBanner };
