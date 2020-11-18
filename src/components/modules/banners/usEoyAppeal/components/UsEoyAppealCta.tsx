import React from 'react';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from 'emotion-theming';
import { LinkButton, Button, buttonBrandAlt } from '@guardian/src-button';
import ContributionsTemplateCta from '../../contributionsTemplate/ContributionsTemplateCta';

interface UsEoyAppealCtaProps {
    onContributeClick: () => void;
    onNotNowClick: () => void;
}

const UsEoyAppealCta: React.FC<UsEoyAppealCtaProps> = ({
    onContributeClick,
    onNotNowClick,
}: UsEoyAppealCtaProps) => (
    <ContributionsTemplateCta
        primaryCta={
            <ThemeProvider theme={buttonBrandAlt}>
                <div>
                    <Hide above="tablet">
                        <LinkButton onClick={onContributeClick} size="small">
                            Support the Guardian
                        </LinkButton>
                    </Hide>
                    <Hide below="tablet">
                        <LinkButton onClick={onContributeClick} size="default">
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

export default UsEoyAppealCta;
