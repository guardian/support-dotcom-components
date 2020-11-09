import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { Stack, Container } from '@guardian/src-layout';

const visualContainer = css`
    position: relative;
`;

const closeButtonContainer = css`
    position: absolute;
    top: ${space[3]}px;
    right: ${space[3]}px;
`;

const contentContainer = css`
    background-color: #dddbd1;
    padding-top: ${space[1]}px;
    padding-bottom: ${space[5]}px;
`;

export interface ContributionsTemplateWithVisualProps {
    visual: React.ReactElement;
    closeButton: React.ReactElement;
    header: React.ReactElement;
    body: React.ReactElement;
    ticker?: React.ReactElement;
    cta: React.ReactElement;
}

const ContributionsTemplateWithVisual: React.FC<ContributionsTemplateWithVisualProps> = ({
    visual,
    closeButton,
    header,
    body,
    ticker,
    cta,
}: ContributionsTemplateWithVisualProps) => {
    return (
        <div>
            <div css={visualContainer}>
                {visual}
                <div css={closeButtonContainer}>{closeButton}</div>
            </div>
            <Container cssOverrides={contentContainer}>
                <Stack space={4}>
                    <Stack space={1}>
                        {header}
                        {body}
                        {ticker}
                    </Stack>
                    {cta}
                </Stack>
            </Container>
        </div>
    );
};

export default ContributionsTemplateWithVisual;
