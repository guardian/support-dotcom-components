import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { css } from '@emotion/react';
import { Button, LinkButton, buttonBrandAlt } from '@guardian/src-button';
import { neutral } from '@guardian/source-foundations';
import { SvgCross } from '@guardian/src-icons';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateWithVisual from './ContributionsTemplateWithVisual';
import ContributionsTemplateVisual from './ContributionsTemplateVisual';
import ContributionsTemplateCloseButton from './ContributionsTemplateCloseButton';
import ContributionsTemplateHeader from './ContributionsTemplateHeader';
import ContributionsTemplateBody from './ContributionsTemplateBody';
import ContributionsTemplateTicker from './ContributionsTemplateTicker';
import ContributionsTemplateCta from './ContributionsTemplateCta';
import { BannerProps, TickerSettings } from '@sdc/shared/types';
import { ReactComponent } from '../../../types';

const closeButtonStyles = css`
    color: ${neutral[7]};
    border-color: ${neutral[7]};
`;

const visual = (
    <ContributionsTemplateVisual
        image={
            <picture>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/c4d243dee6813a12818f37d297c5ffea66fb38aa/0_0_320_135/320.png"
                />
                <source
                    media="(max-width: 979px)"
                    srcSet="https://media.guim.co.uk/0410464a8813131d3c878beeebf6938628bbc18a/0_0_360_439/360.png"
                />
                <source
                    media="(max-width: 1299px)"
                    srcSet="https://media.guim.co.uk/5894dcdff5be591627bb69f74688896fdec503a1/0_0_481_422/481.png"
                />
                <source srcSet="https://media.guim.co.uk/646365f26cafa1179b6799daaa3621cf04f511d5/0_0_719_395/719.png" />
                <img src="https://media.guim.co.uk/c4d243dee6813a12818f37d297c5ffea66fb38aa/0_0_320_135/320.png" />
            </picture>
        }
    />
);

const Roundel = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
const header = <ContributionsTemplateHeader copy={<>Lorem ipsum dolor sit amet, consectetur</>} />;

const body = (
    <ContributionsTemplateBody
        copy={
            <>
                <Hide above="tablet">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
                    ame lorem ipsum dolor
                </Hide>
                <Hide below="tablet">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus enim porttitor
                    dolor at fermentum ut. Placerat est fermentum nulla porttitor est suspendisse
                    proin volutpat. Habitant maecenas massa ullamcorper volutpat. Elit proin
                    Placerat est fermentum nulla porttitor est suspendisse suspendisse porttitor est
                </Hide>
            </>
        }
    />
);

const ticker = (tickerSettings: TickerSettings): React.ReactElement => (
    <ContributionsTemplateTicker settings={tickerSettings} accentColour={'#304F9E'} />
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

const bannerStyles = css`
    background-color: #dddbd1;
`;

export const Example: ReactComponent<BannerProps> = ({}: BannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            cssOverrides={bannerStyles}
            visual={visual}
            closeButton={closeButton}
            header={header}
            body={body}
            cta={cta}
        />
    );
};

export const ExampleWithTicker: ReactComponent<BannerProps> = ({ tickerSettings }: BannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            cssOverrides={bannerStyles}
            visual={visual}
            closeButton={closeButton}
            header={header}
            body={body}
            ticker={tickerSettings && ticker(tickerSettings)}
            cta={cta}
        />
    );
};
