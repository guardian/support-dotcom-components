import React from 'react';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';

interface GlobalEoyCtaProps {
    onContributeClick: () => void;
    tracking: BannerTracking;
    countryCode: string;
}

const GlobalEoyCta: React.FC<GlobalEoyCtaProps> = ({
    onContributeClick,
    tracking,
    countryCode,
}: GlobalEoyCtaProps) => {
    const landingPageUrl = addRegionIdAndTrackingParamsToSupportUrl(
        BASE_LANDING_PAGE_URL,
        tracking,
        countryCode,
    );

    return (
        <ContributionsTemplateCta
            primaryCta={
                <div>
                    <Hide above="desktop">
                        <LinkButton href={landingPageUrl} onClick={onContributeClick} size="small">
                            Support us
                        </LinkButton>
                    </Hide>
                    <Hide below="desktop">
                        <LinkButton
                            href={landingPageUrl}
                            onClick={onContributeClick}
                            size="default"
                        >
                            Support the Guardian
                        </LinkButton>
                    </Hide>
                </div>
            }
            secondaryCta={null}
        />
    );
};
export default GlobalEoyCta;
