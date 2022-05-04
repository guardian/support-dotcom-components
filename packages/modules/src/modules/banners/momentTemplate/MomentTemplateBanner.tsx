import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Container, Hide } from '@guardian/src-layout';
import { BannerRenderProps } from '../common/types';
import { MomentTemplateBannerHeader } from './components/MomentTemplateBannerHeader';
import { MomentTemplateBannerArticleCount } from './components/MomentTemplateBannerArticleCount';
import { MomentTemplateBannerBody } from './components/MomentTemplateBannerBody';
import { MomentTemplateBannerCtas } from './components/MomentTemplateBannerCtas';
import { MomentTemplateBannerCloseButton } from './components/MomentTemplateBannerCloseButton';
import { MomentTemplateBannerVisual } from './components/MomentTemplateBannerVisual';
import { BannerTemplateSettings } from './settings';
import { from } from '@guardian/src-foundations/mq';
import { SecondaryCtaType } from '@sdc/shared/types';
import { MomentTemplateBannerReminder } from './components/MomentTemplateBannerReminder';
import { defineFetchEmail } from '../../shared/helpers/definedFetchEmail';

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
        reminderTracking,
        email: deprecatedEmail,
        fetchEmail,
    }: BannerRenderProps): JSX.Element {
        const [isReminderActive, setIsReminderActive] = useState(false);

        const onReminderCtaClick = () => {
            reminderTracking.onReminderCtaClick();
            setIsReminderActive(!isReminderActive);
        };

        const [email, setEmail] = useState<string | undefined>(undefined);

        useEffect(() => {
            (async () => {
                const definedFetchEmail = await defineFetchEmail(deprecatedEmail, fetchEmail);
                const email = await definedFetchEmail();
                setEmail(email ?? undefined);
            })();
        });

        const reminderRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (reminderRef.current && isReminderActive) {
                reminderRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [reminderRef.current, isReminderActive]);

        return (
            <div css={styles.outerContainer(templateSettings.backgroundColour)}>
                <Container
                    cssOverrides={styles.mobileStickyHeaderContainer(
                        templateSettings.backgroundColour,
                    )}
                >
                    <div css={styles.closeButtonContainer}>
                        <Hide below="mobileMedium">
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>

                    <div css={styles.visualContainer}>
                        <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                    </div>

                    <div css={styles.headerContainer}>
                        <MomentTemplateBannerHeader
                            heading={content.mainContent.heading}
                            mobileHeading={content.mobileContent?.heading ?? null}
                        />

                        <Hide above="mobileMedium" cssOverrides={styles.mobileCloseButtonContainer}>
                            <MomentTemplateBannerCloseButton
                                onCloseClick={onCloseClick}
                                settings={templateSettings.closeButtonSettings}
                            />
                        </Hide>
                    </div>
                </Container>

                <Container cssOverrides={styles.containerOverrides}>
                    <div css={styles.container}>
                        <div css={styles.closeButtonContainer}>
                            <Hide below="tablet">
                                <MomentTemplateBannerCloseButton
                                    onCloseClick={onCloseClick}
                                    settings={templateSettings.closeButtonSettings}
                                />
                            </Hide>
                        </div>

                        <div css={styles.desktopVisualContainer}>
                            <MomentTemplateBannerVisual settings={templateSettings.imageSettings} />
                        </div>

                        <div css={styles.contentContainer}>
                            <div css={styles.desktopHeaderContainer}>
                                <MomentTemplateBannerHeader
                                    heading={content.mainContent.heading}
                                    mobileHeading={content.mobileContent?.heading ?? null}
                                />
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
                                    onReminderCtaClick={onReminderCtaClick}
                                    primaryCtaSettings={templateSettings.primaryCtaSettings}
                                    secondaryCtaSettings={templateSettings.secondaryCtaSettings}
                                />
                            </section>
                        </div>
                    </div>
                </Container>

                <div ref={reminderRef}>
                    {content.mainContent.secondaryCta?.type ===
                        SecondaryCtaType.ContributionsReminder &&
                        isReminderActive && (
                            <MomentTemplateBannerReminder
                                reminderCta={content.mainContent.secondaryCta}
                                trackReminderSetClick={reminderTracking.onReminderSetClick}
                                setReminderCtaSettings={templateSettings.setReminderCtaSettings}
                                email={email}
                            />
                        )}
                </div>
            </div>
        );
    }

    return MomentTemplateBanner;
}

// ---- Styles ---- //

const styles = {
    outerContainer: (background: string) => css`
        background: ${background};

        * {
            box-sizing: border-box;
        }

        ${from.tablet} {
            border-top: 3px solid ${neutral[0]};
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
    mobileStickyHeaderContainer: (background: string) => css`
        background: ${background};
        position: sticky;
        top: 0px;
        z-index: 100;
        border-top: 3px solid ${neutral[0]};
        border-bottom: 1px solid ${neutral[0]};
        padding-top: ${space[2]}px;
        padding-bottom: ${space[2]}px;

        ${from.tablet} {
            display: none;
        }
    `,
    visualContainer: css`
        display: none;

        ${from.mobileMedium} {
            display: block;
        }
        ${from.tablet} {
            display: none;
        }
    `,
    desktopVisualContainer: css`
        display: none;

        ${from.tablet} {
            display: block;
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
        display: flex;
        align-items: center;

        ${from.mobileMedium} {
            margin-top: ${space[2]}px;
        }
    `,
    desktopHeaderContainer: css`
        display: none;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            display: block;
        }
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
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[4]}px;
    `,
};
