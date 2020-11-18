import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { css } from '@emotion/core';
import { Button, LinkButton, buttonBrandAlt } from '@guardian/src-button';
import { neutral, lifestyle } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { SvgCross } from '@guardian/src-icons';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateWithVisual from '../contributionsTemplate/ContributionsTemplateWithVisual';
import ContributionsTemplateVisual from '../contributionsTemplate/ContributionsTemplateVisual';
import ContributionsTemplateCloseButton from '../contributionsTemplate/ContributionsTemplateCloseButton';
import ContributionsTemplateHeader from '../contributionsTemplate/ContributionsTemplateHeader';
import ContributionsTemplateBody from '../contributionsTemplate/ContributionsTemplateBody';
import ContributionsTemplateTicker from '../contributionsTemplate/ContributionsTemplateTicker';
import ContributionsTemplateCta from '../contributionsTemplate/ContributionsTemplateCta';
import { TickerSettings } from '../../../../lib/variants';
import withCloseable, { CloseableBannerProps } from '../hocs/withCloseable';

const closeButtonStyles = css`
    color: ${neutral[7]};
    border-color: ${neutral[7]};
`;

const visualStyles = css`
    img {
        ${from.tablet} {
            object-fit: contain;
        }

        ${from.desktop} {
            margin-top: 1%;
            height: 105%;
        }
    }
`;

const UsEoyAppealBannerWithVisual: React.FC<CloseableBannerProps> = ({
    isSupporter,
    tickerSettings,
    onClose,
}: CloseableBannerProps) => {
    const visual = (
        <ContributionsTemplateVisual
            image={
                <picture css={visualStyles}>
                    <source
                        media="(max-width: 739px)"
                        srcSet="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png"
                    />
                    <source srcSet="https://media.guim.co.uk/cdba08ee85134397376c8ad1a20a78c670431f26/0_122_720_681/720.png" />
                    <img src="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png" />
                </picture>
            }
        />
    );

    const Roundel = (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0001 0C8.05903 0 0 8.05873 0 18C0 27.9412 8.05903 36 18.0001 36C27.9412 36 36 27.9412 36 18C36 8.05873 27.9412 0 18.0001 0Z"
                fill="black"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.8837 18.9866L27.0361 19.8125V28.3322C25.9968 29.3221 23.3408 30.8651 20.8003 31.3954V30.7765V29.6149V19.6268L18.8372 18.9332V18.4187H28.8837V18.9866ZM19.6745 4.79612C19.6745 4.79612 19.6365 4.79577 19.6178 4.79577C15.4528 4.79577 13.07 10.4117 13.1901 17.9868C13.07 25.5895 15.4528 31.2052 19.6178 31.2052C19.6365 31.2052 19.6745 31.205 19.6745 31.205V31.7887C13.4303 32.2062 4.90449 27.5543 5.02457 18.0142C4.90449 8.44674 13.4303 3.79484 19.6745 4.21235V4.79612ZM20.9301 4.18604C23.3719 4.55897 26.1626 6.1627 27.2092 7.30124V12.5581H26.6079L20.9301 4.76617V4.18604Z"
                fill="white"
            />
        </svg>
    );

    const closeButton = (
        <ContributionsTemplateCloseButton
            closeButton={
                <Button
                    onClick={onClose}
                    cssOverrides={closeButtonStyles}
                    size="small"
                    priority="tertiary"
                    icon={<SvgCross />}
                    hideLabel
                >
                    Close
                </Button>
            }
            roundel={Roundel}
        />
    );

    const header = (
        <ContributionsTemplateHeader
            copy={
                <>
                    <Hide above="tablet">As America begins a new chapter…</Hide>
                    <Hide below="tablet">America’s future: what’s next?</Hide>
                </>
            }
        />
    );

    const body = (
        <ContributionsTemplateBody
            copy={
                <>
                    <Hide above="tablet">
                        …the need for robust, fact-based journalism that highlights injustice and
                        offers solutions is as great as ever.
                    </Hide>
                    <Hide below="tablet">
                        {isSupporter ? (
                            <>
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From a broken healthcare system to corrosive racial
                                inequality, from rapacious corporations to a climate crisis, the
                                need for robust, fact-based reporting that highlights injustice and
                                offers solutions is as great as ever. We value your ongoing support
                                and hope you’ll consider a year-end gift.
                            </>
                        ) : (
                            <>
                                Trump’s presidency is ending, but America’s systemic challenges
                                remain. From a broken healthcare system to corrosive racial
                                inequality, from rapacious corporations to a climate crisis, the
                                need for robust, fact-based reporting that highlights injustice and
                                offers solutions is as great as ever. We hope you’ll consider a
                                year-end gift.
                            </>
                        )}
                    </Hide>
                </>
            }
        />
    );

    const ticker = (tickerSettings: TickerSettings): React.ReactElement => (
        <ContributionsTemplateTicker settings={tickerSettings} accentColour={lifestyle[300]} />
    );

    const cta = (
        <ContributionsTemplateCta
            primaryCta={
                <ThemeProvider theme={buttonBrandAlt}>
                    <div>
                        <Hide above="tablet">
                            <LinkButton size="small">Support the Guardian</LinkButton>
                        </Hide>
                        <Hide below="tablet">
                            <LinkButton size="default">Support the Guardian</LinkButton>
                        </Hide>
                    </div>
                </ThemeProvider>
            }
            secondaryCta={
                <ThemeProvider theme={buttonBrandAlt}>
                    <div>
                        <Hide above="tablet">
                            <LinkButton size="small" priority="subdued">
                                Not now
                            </LinkButton>
                        </Hide>
                        <Hide below="tablet">
                            <LinkButton size="default" priority="subdued">
                                Not now
                            </LinkButton>
                        </Hide>
                    </div>
                </ThemeProvider>
            }
        />
    );

    return (
        <ContributionsTemplateWithVisual
            visual={visual}
            closeButton={closeButton}
            header={header}
            body={body}
            ticker={tickerSettings && ticker(tickerSettings)}
            cta={cta}
        />
    );
};

const wrapped = withCloseable(UsEoyAppealBannerWithVisual, 'contributions');

export { wrapped as UsEoyAppealBannerWithVisual };
