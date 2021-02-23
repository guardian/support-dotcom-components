// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { styles } from './ContributionsBannerStyles';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgCross, SvgArrowRightStraight } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { Button, LinkButton, buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import contributionsBannerWrapper, {
    ContributionsBannerProps,
    ContributionsBannerRenderedContent,
} from './ContributionsBannerWrapper';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

const ContributionsBannerBody: React.FC<ContributionsBannerRenderedContent> = ({
    cleanHighlightedText,
    cleanMessageText,
    cleanHeading,
}: ContributionsBannerRenderedContent) => (
    <>
        {cleanHeading && (
            <>
                <span css={styles.heading}>{cleanHeading}</span>{' '}
            </>
        )}
        <span css={styles.messageText}>{cleanMessageText}</span>
        {cleanHighlightedText && (
            <>
                {' '}
                <span css={styles.highlightedText}>{cleanHighlightedText}</span>
            </>
        )}
    </>
);

interface ContributionsBannerCtaProps {
    ctaText: string;
    ctaUrl: string;
    onContributeClick: () => void;
}

const ContributionsBannerCta: React.FC<ContributionsBannerCtaProps> = ({
    ctaText,
    ctaUrl,
    onContributeClick,
}: ContributionsBannerCtaProps) => (
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
);

const ContributionsBanner: React.FC<ContributionsBannerProps> = ({
    onContributeClick,
    onCloseClick,
    content,
    mobileContent,
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
                            {mobileContent ? (
                                <>
                                    <Hide above="tablet">
                                        {mobileContent && (
                                            <ContributionsBannerBody {...mobileContent} />
                                        )}
                                    </Hide>
                                    <Hide below="tablet">
                                        <ContributionsBannerBody {...content} />
                                    </Hide>
                                </>
                            ) : (
                                <ContributionsBannerBody {...content} />
                            )}
                        </div>
                        <div css={styles.ctaContainer}>
                            <div css={styles.cta}>
                                <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                                    {mobileContent ? (
                                        <>
                                            <Hide above="tablet">
                                                <ContributionsBannerCta
                                                    ctaText={mobileContent.ctaText}
                                                    ctaUrl={mobileContent.ctaUrl}
                                                    onContributeClick={onContributeClick}
                                                />
                                            </Hide>
                                            <Hide below="tablet">
                                                <ContributionsBannerCta
                                                    ctaText={content.ctaText}
                                                    ctaUrl={content.ctaUrl}
                                                    onContributeClick={onContributeClick}
                                                />
                                            </Hide>
                                        </>
                                    ) : (
                                        <ContributionsBannerCta
                                            ctaText={content.ctaText}
                                            ctaUrl={content.ctaUrl}
                                            onContributeClick={onContributeClick}
                                        />
                                    )}
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
