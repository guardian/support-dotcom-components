import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { LinkButton, buttonBrandAlt } from '@guardian/src-button';
import ContributionsTemplateWithVisual from './ContributionsTemplateWithVisual';
import ContributionsTemplateHeader from './ContributionsTemplateHeader';
import ContributionsTemplateBody from './ContributionsTemplateBody';
import ContributionsTemplateCta from './ContributionsTemplateCta';
import { BannerProps } from '../../../../types/BannerTypes';

const ExampleContributionsTemplateWithVisual: React.FC<BannerProps> = ({}: BannerProps) => {
    return (
        <ContributionsTemplateWithVisual
            header={<ContributionsTemplateHeader copy="Lorem ipsum dolor sit amet, consectetur" />}
            body={
                <ContributionsTemplateBody copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit ame lorem ipsum dolor" />
            }
            cta={
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
            }
        />
    );
};

export default ExampleContributionsTemplateWithVisual;
