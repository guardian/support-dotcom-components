import React from 'react';
import { Hide } from '@guardian/src-layout';
import { LinkButton } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const IMPACT_REPORT_LINK =
    'https://www.theguardian.com/us-news/2020/nov/24/guardian-fundraiser-end-of-year-2020-contribute?INTCMP=us_eoy_banner';

interface GlobalEoyCtaProps {
    onContributeClick: () => void;
    onReadMoreClick: () => void;
    tracking: BannerTracking;
    countryCode: string;
    isSupporter: boolean;
}

const GlobalEoyCta: React.FC<GlobalEoyCtaProps> = ({
    onContributeClick,
    onReadMoreClick,
    tracking,
    countryCode,
    isSupporter,
}: GlobalEoyCtaProps) => {
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
                <div>
                    <Hide above="tablet">
                        <LinkButton href={landingPageUrl} onClick={onContributeClick} size="small">
                            {isSupporter ? 'Support' : 'Contribute'}
                        </LinkButton>
                    </Hide>
                    <Hide below="tablet">
                        <LinkButton
                            href={landingPageUrl}
                            onClick={onContributeClick}
                            size="default"
                        >
                            {isSupporter ? 'Support us again' : 'Support the Guardian'}
                        </LinkButton>
                    </Hide>
                </div>
            }
            secondaryCta={
                <div>
                    <Hide above="tablet">
                        <LinkButton
                            href={IMPACT_REPORT_LINK}
                            onClick={onReadMoreClick}
                            size="small"
                            priority="tertiary"
                        >
                            Read more
                        </LinkButton>
                    </Hide>
                    <Hide below="tablet">
                        <LinkButton
                            href={IMPACT_REPORT_LINK}
                            onClick={onReadMoreClick}
                            size="default"
                            priority="tertiary"
                        >
                            Read more
                        </LinkButton>
                    </Hide>
                </div>
            }
        />
    );
};
export default GlobalEoyCta;
