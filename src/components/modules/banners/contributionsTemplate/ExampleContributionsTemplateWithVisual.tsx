import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, LinkButton, buttonBrandAlt } from '@guardian/src-button';
import { SvgCross } from '@guardian/src-icons';
import ContributionsTemplateWithVisual from './ContributionsTemplateWithVisual';
import ContributionsTemplateVisual from './ContributionsTemplateVisual';
import ContributionsTemplateCloseButton from './ContributionsTemplateCloseButton';
import ContributionsTemplateHeader from './ContributionsTemplateHeader';
import ContributionsTemplateBody from './ContributionsTemplateBody';
import ContributionsTemplateTicker from './ContributionsTemplateTicker';
import ContributionsTemplateCta from './ContributionsTemplateCta';
import { BannerProps } from '../../../../types/BannerTypes';
import { TickerSettings } from '../../../../lib/variants';

const visual = (
    <ContributionsTemplateVisual imageUrl="https://media.guim.co.uk/c4d243dee6813a12818f37d297c5ffea66fb38aa/0_0_320_135/320.png" />
);

const closeButton = (
    <ContributionsTemplateCloseButton
        closeButton={
            <Button size="small" priority="tertiary" icon={<SvgCross />} hideLabel>
                Close
            </Button>
        }
    />
);

const header = <ContributionsTemplateHeader copy="Lorem ipsum dolor sit amet, consectetur" />;

const body = (
    <ContributionsTemplateBody copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit ame lorem ipsum dolor" />
);

const ticker = (tickerSettings: TickerSettings): React.ReactElement => (
    <ContributionsTemplateTicker settings={tickerSettings} accentColour={'#304F9E'} />
);

const cta = (
    <ContributionsTemplateCta
        primaryCta={
            <ThemeProvider theme={buttonBrandAlt}>
                <LinkButton size="small">Support the Guardian</LinkButton>
            </ThemeProvider>
        }
        secondaryCta={
            <ThemeProvider theme={buttonBrandAlt}>
                <LinkButton size="small" priority="subdued">
                    Not now
                </LinkButton>
            </ThemeProvider>
        }
    />
);

export const ExampleWithHeadlineAndBody: React.FC<BannerProps> = ({}: BannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            visual={visual}
            closeButton={closeButton}
            header={header}
            body={body}
            cta={cta}
        />
    );
};

export const ExampleWithHeadlineAndTicker: React.FC<BannerProps> = ({
    tickerSettings,
}: BannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            visual={visual}
            closeButton={closeButton}
            header={header}
            ticker={tickerSettings && ticker(tickerSettings)}
            cta={cta}
        />
    );
};
