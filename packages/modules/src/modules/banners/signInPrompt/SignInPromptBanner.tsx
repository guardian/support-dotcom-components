import React from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { brand, brandAlt, space, neutral } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { Button, LinkButton, buttonBrand } from '@guardian/src-button';
import { SvgRoundelBrandInverse } from '@guardian/src-brand';
import { SecondaryCtaType } from '@sdc/shared/types';
import { Container, Column, Columns } from '@guardian/src-layout';

import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';

const background = css`
    background-color: ${brand[400]};
`;

const mainColumn = css`
    position: relative;
`;

const headingStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    font-size: 32px;
    color: ${neutral[100]};
    margin: ${space[1]}px 0 0;
`;

const subHeadingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    color: ${brandAlt[400]};
    margin: ${space[2]}px 0;
`;

const bulletStyles = css`
    ${headline.xxsmall({ fontWeight: 'medium' })};
    color: ${neutral[100]};
    display: flex;
    flex-direction: column;

    span:not(:first-of-type) {
        margin-top: 10px;
    }

    span::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: ${space[2]}px;
        background: ${brandAlt[400]};
        border-radius: 50%;
    }
`;

const actions = css`
    margin: ${space[5]}px 0;
`;

const closeButton = css`
    margin-left: ${space[5]}px;
`;

const logo = css`
    position: absolute;
    top: ${space[2]}px;
    right: 0px;
    width: 42px;
    height: 42px;
`;

const SignInPromptBanner: React.FC<BannerRenderProps> = props => {
    const { heading, paragraphs, primaryCta, secondaryCta } = props.content.mainContent;
    const [subheading, ...bullets] = paragraphs;

    return (
        <Container cssOverrides={background}>
            <Columns>
                <Column width={[0, 0, 0, 2, 3]}> </Column>
                <Column width={[4, 12, 12, 12, 13]} cssOverrides={mainColumn}>
                    <h1 css={headingStyles}>{heading}</h1>
                    <h2 css={subHeadingStyles}>{subheading}</h2>
                    <div css={bulletStyles}>{bullets}</div>

                    <div css={actions}>
                        <ThemeProvider theme={buttonBrand}>
                            {primaryCta && (
                                <LinkButton
                                    priority="primary"
                                    href={primaryCta.ctaUrl}
                                    size="small"
                                >
                                    {primaryCta.ctaText}
                                </LinkButton>
                            )}
                            {secondaryCta && secondaryCta.type === SecondaryCtaType.Custom && (
                                <Button
                                    priority="subdued"
                                    size="small"
                                    onClick={props.onCloseClick}
                                    cssOverrides={closeButton}
                                >
                                    {secondaryCta.cta.ctaText}
                                </Button>
                            )}
                        </ThemeProvider>
                    </div>

                    <div css={logo}>
                        <SvgRoundelBrandInverse />
                    </div>
                </Column>
            </Columns>
        </Container>
    );
};

const unvalidated = bannerWrapper(SignInPromptBanner, 'sign-in-prompt-banner');
const validated = validatedBannerWrapper(SignInPromptBanner, 'sign-in-prompt-banner');

export { validated as SignInPromptBanner, unvalidated as SignInPromptBannerUnvalidated };