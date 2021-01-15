import React from 'react';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const IMPACT_REPORT_LINK =
    'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=global_eoy_banner';

interface GlobalEoyCtaProps {
    onContributeClick: () => void;
    onReadMoreClick: () => void;
    tracking: BannerTracking;
    countryCode: string;
}

const GlobalEoyCta: React.FC<GlobalEoyCtaProps> = ({
    onContributeClick,
    onReadMoreClick,
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
            secondaryCta={ countryCode === 'US' ? null : (
                <div>
                    <Hide above="desktop">
                        <LinkButton
                            href={IMPACT_REPORT_LINK}
                            onClick={onReadMoreClick}
                            size="small"
                            priority="tertiary"
                        >
                            2020 highlights
                        </LinkButton>
                    </Hide>
                    <Hide below="desktop">
                        <LinkButton
                            href={IMPACT_REPORT_LINK}
                            onClick={onReadMoreClick}
                            size="default"
                            priority="tertiary"
                        >
                            2020 highlights
                        </LinkButton>
                    </Hide>
                </div>
            )}
        />
    );
};
export default GlobalEoyCta;
