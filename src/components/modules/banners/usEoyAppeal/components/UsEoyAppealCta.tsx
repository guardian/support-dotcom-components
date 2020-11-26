import React from 'react';
import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from 'emotion-theming';
import { LinkButton, buttonBrandAlt } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';
import { BannerTracking } from '../../../../../types/BannerTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../../../lib/tracking';

const readMoreButtonStyles = css`
    color: ${neutral[7]};
    border-color: ${neutral[7]};
`;

const BASE_LANDING_PAGE_URL = 'https://support.theguardian.com/contribute';
const IMPACT_REPORT_LINK =
    'https://www.theguardian.com/us-news/2020/nov/24/guardian-fundraiser-end-of-year-2020-contribute?INTCMP=us_eoy_banner';

interface UsEoyAppealCtaProps {
    onContributeClick: () => void;
    onReadMoreClick: () => void;
    tracking: BannerTracking;
    countryCode: string;
    isSupporter: boolean;
}

const UsEoyAppealCta: React.FC<UsEoyAppealCtaProps> = ({
    onContributeClick,
    onReadMoreClick,
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
                </ThemeProvider>
            }
            secondaryCta={
                <div>
                    <Hide above="tablet">
                        <LinkButton
                            href={IMPACT_REPORT_LINK}
                            onClick={onReadMoreClick}
                            css={readMoreButtonStyles}
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
                            css={readMoreButtonStyles}
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
export default UsEoyAppealCta;
