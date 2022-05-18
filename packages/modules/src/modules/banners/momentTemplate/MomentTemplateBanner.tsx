import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { MomentTemplateBannerHeader } from './components/MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './components/MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './components/MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './components/MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './components/MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './components/MomentTemplateBannerVisual';
import { BannerTemplateSettings } from './settings';
import { from } from '@guardian/src-foundations/mq';

// ---- Banner ---- //

export function getMomentTemplateBanner(
    templateSettings: BannerTemplateSettings,
): React.FC<BannerRenderProps> {
    function MomentTemplateBanner({
        content,
        onCloseClick,
        numArticles,
        onCtaClick,
        onSecondaryCtaClick,
    }: BannerRenderProps): JSX.Element {
        return (
            <div css={styles.outerContainer(templateSettings.backgroundColour)}>
                <Container cssOverrides={styles.containerOverrides}>
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </div>

                        <div css={styles.visualContainer}>
                            <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                        </div>

                        <div css={styles.contentContainer}>
                            <div css={styles.headerContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent?.heading ?? null}
                                />

                                <div css={styles.mobileCloseButtonContainer}>
                                    <MomentTemplateBannerCloseButton
                                        onCloseClick={onCloseClick}
                                        settings={templateSettings.closeButtonSettings}
                                    />
                                </div>
                            </div>

                            {numArticles !== undefined && numArticles > 5 && (
                                <div css={styles.articleCountContainer}>
                                    <MomentTemplateBannerArticleCount
                                        numArticles={numArticles}
                                        settings={templateSettings}
                                    />
                                </div>
                            )}

                            <div css={styles.bodyContainer}>
                                <MomentTemplateBannerBody
                                    paragraphs={content.mainContent.paragraphs}
                                    mobileParagraphs={content.mobileContent?.paragraphs ?? null}
                                    highlightedText={content.mainContent.highlightedText ?? null}
                                    mobileHighlightedText={
                                        content.mobileContent?.highlightedText ?? null
                                    }
                                    highlightedTextSettings={
                                        templateSettings.highlightedTextSettings
                                    }
                                />
                            </div>

                            <section css={styles.ctasContainer}>
                                <MomentTemplateBannerCtas
                                    desktopCtas={{
                                        primary: content.mainContent.primaryCta,
                                        secondary: content.mainContent.secondaryCta,
                                    }}
                                    mobileCtas={
                                        content.mobileContent
                                            ? {
                                                  primary: content.mobileContent.primaryCta,
                                                  secondary: content.mobileContent.secondaryCta,
                                              }
                                            : null
                                    }
                                    onPrimaryCtaClick={onCtaClick}
                                    onSecondaryCtaClick={onSecondaryCtaClick}
                                    primaryCtaSettings={templateSettings.primaryCtaSettings}
                                    secondaryCtaSettings={templateSettings.secondaryCtaSettings}
                                />
                            </section>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return MomentTemplateBanner;
}

// ---- Styles ---- //

const styles = {
    outerContainer: (background: string) => css`
        background: ${background};
        border-top: 3px solid ${neutral[0]};
        padding-bottom: ${space[5]}px;

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            padding-bottom: ${space[6]}px;
        }
    `,
    containerOverrides: css`
        position: relative;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
    `,
    container: css`
        overflow: hidden;
        display: flex;
        flex-direction: column;

        ${from.tablet} {
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
    `,
    visualContainer: css`
        display: none;

        ${from.mobileMedium} {
            display: block;
        }
        ${from.tablet} {
            width: 238px;
            margin-left: ${space[3]}px;
        }
        ${from.desktop} {
            width: 320px;
            margin-left: ${space[5]}px;
        }
        ${from.leftCol} {
            width: 370px;
            margin-left: ${space[9]}px;
        }
    `,
    contentContainer: css`
        ${from.tablet} {
            width: 450px;
        }
        ${from.desktop} {
            width: 600px;
        }
        ${from.leftCol} {
            width: 700px;
        }
        ${from.wide} {
            width: 780px;
        }
    `,
    headerContainer: css`
        margin-top: ${space[2]}px;
        display: flex;
        align-items: center;
    `,
    articleCountContainer: css`
        margin-top: ${space[4]}px;

        ${from.tablet} {
            margin-top: ${space[3]}px;
        }
    `,
    bodyContainer: css`
        margin-top: ${space[1]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        margin-top: ${space[5]}px;

        ${from.tablet} {
            margin-top: ${space[6]}px;
        }
    `,
    mobileCloseButtonContainer: css`
        margin-left: ${space[3]}px;

        ${from.mobileMedium} {
            display: none;
        }
    `,
    closeButtonContainer: css`
        display: none;
        position: absolute;
        top: ${space[2]}px;
        right: ${space[4]}px;

        ${from.mobileMedium} {
            display: block;
        }
    `,
};
