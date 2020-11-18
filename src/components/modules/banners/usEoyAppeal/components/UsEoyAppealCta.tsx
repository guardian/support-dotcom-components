import React from 'react';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from 'emotion-theming';
import { LinkButton, buttonBrandAlt } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';

const UsEoyAppealCta: React.FC = () => (
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

export default UsEoyAppealCta;
