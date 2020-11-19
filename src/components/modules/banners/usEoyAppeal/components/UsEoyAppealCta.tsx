import React from 'react';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from 'emotion-theming';
import { LinkButton, Button, buttonBrandAlt } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';

interface UsEoyAppealCtaProps {
    onContributeClick: () => void;
    onNotNowClick: () => void;
    tracking: BannerTracking;
    countryCode: string;
    isSupporter: boolean;
}

const UsEoyAppealCta: React.FC<UsEoyAppealCtaProps> = ({
    onContributeClick,
    onNotNowClick,
    tracking,
    countryCode,
    isSupporter,
}: UsEoyAppealCtaProps) => {
    let landingPageUrl = addRegionIdAndTrackingParamsToSupportUrl(
        BASE_LANDING_PAGE_URL,
        tracking,
        countryCode,
    );

    if (isSupporter) {
        landingPageUrl += '&selected-contribution-type=ONE_OFF';
    }

    return (
        <ContributionsTemplateCta
            primaryCta={
                <ThemeProvider theme={buttonBrandAlt}>
                    <div>
                        <Hide above="tablet">
                            <LinkButton
                                href={landingPageUrl}
                                onClick={onContributeClick}
                                size="small"
                            >
                                Support the Guardian
                            </LinkButton>
                        </Hide>
                        <Hide below="tablet">
                            <LinkButton
                                href={landingPageUrl}
                                onClick={onContributeClick}
                                size="default"
                            >
                                Support the Guardian
                            </LinkButton>
                        </Hide>
                    </div>
                </ThemeProvider>
            }
            secondaryCta={
                <ThemeProvider theme={buttonBrandAlt}>
                    <div>
                        <Hide above="tablet">
                            <Button onClick={onNotNowClick} size="small" priority="subdued">
                                Not now
                            </Button>
                        </Hide>
                        <Hide below="tablet">
                            <Button onClick={onNotNowClick} size="default" priority="subdued">
                                Not now
                            </Button>
                        </Hide>
                    </div>
                </ThemeProvider>
            }
        />
    );
};
export default UsEoyAppealCta;
