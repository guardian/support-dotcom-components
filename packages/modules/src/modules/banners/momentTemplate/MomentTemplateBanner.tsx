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
                <Container>
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </div>

                        <div css={styles.visualContainer}>
                            <MomentTemplateBannerVisual settings={templateSettings.imageSetings} />
                        </div>

                        <div css={styles.contentContainer}>
                            <div css={styles.headerContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent?.heading ?? null}
                                />
                            </div>

                            {numArticles !== undefined && numArticles > 5 && (
                                <div css={styles.articleCountContainer}>
                                    <MomentTemplateBannerArticleCount numArticles={numArticles} />
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
        padding-bottom: ${space[2]}px;

        * {
            box-sizing: border-box;
        }
    `,
    container: css`
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        ${from.tablet} {
            flex-direction: row-reverse;
        }
    `,
    visualContainer: css`
        ${from.tablet} {
            width: 294px;
            margin-left: ${space[3]}px;
        }
        ${from.desktop} {
            width: 454px;
        }
        ${from.leftCol} {
            width: 542px;
            margin-left: ${space[9]}px;
        }
        ${from.wide} {
            width: 672px;
            margin-left: ${space[12]}px;
        }
    `,
    contentContainer: css`
        ${from.tablet} {
            width: 394px;
        }
        ${from.desktop} {
            width: 474px;
        }
        ${from.leftCol} {
            width: 522px;
        }
        ${from.wide} {
            width: 540px;
        }
    `,
    headerContainer: css`
        margin-top: ${space[1]}px;
    `,
    articleCountContainer: css`
        margin-top: ${space[1]}px;
    `,
    bodyContainer: css`
        margin-top: ${space[1]}px;
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        margin-top: ${space[4]}px;
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[4]}px;
    `,
};
