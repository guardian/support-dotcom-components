import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { Button, LinkButton } from '@guardian/src-button';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerRenderedContent } from '../../common/types';
import { buttonStyles } from '../buttonStyles';
import { CtaSettings } from '../settings';
import { from } from '@guardian/src-foundations/mq';

// ---- Component ---- //

interface MomentTemplateBannerCtasProps {
    content: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    onReminderCtaClick: () => void;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
}

export function MomentTemplateBannerCtas({
    content,
    mobileContent,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
    onReminderCtaClick,
    primaryCtaSettings,
    secondaryCtaSettings,
}: MomentTemplateBannerCtasProps): JSX.Element {
    return (
        <div css={styles.container}>
            <div>
                <Hide above="tablet">
                    <div css={styles.ctasContainer}>
                        {mobileContent.primaryCta && (
                            <LinkButton
                                href={mobileContent.primaryCta.ctaUrl}
                                onClick={onPrimaryCtaClick}
                                size="small"
                                priority="primary"
                                cssOverrides={buttonStyles(primaryCtaSettings)}
                            >
                                {mobileContent.primaryCta.ctaText}
                            </LinkButton>
                        )}

                        {mobileContent.secondaryCta?.type === SecondaryCtaType.Custom && (
                            <LinkButton
                                href={mobileContent.secondaryCta.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                size="small"
                                priority="tertiary"
                                cssOverrides={buttonStyles(secondaryCtaSettings)}
                            >
                                {mobileContent.secondaryCta.cta.ctaText}
                            </LinkButton>
                        )}

                        {mobileContent.secondaryCta?.type ===
                            SecondaryCtaType.ContributionsReminder && (
                            <Button
                                priority="subdued"
                                onClick={onReminderCtaClick}
                                cssOverrides={styles.reminderCta}
                            >
                                Remind me later
                            </Button>
                        )}
                    </div>
                </Hide>

                <Hide below="tablet">
                    <div css={styles.ctasContainer}>
                        {content.primaryCta && (
                            <LinkButton
                                href={content.primaryCta.ctaUrl}
                                onClick={onPrimaryCtaClick}
                                size="small"
                                priority="primary"
                                cssOverrides={buttonStyles(primaryCtaSettings)}
                            >
                                {content.primaryCta.ctaText}
                            </LinkButton>
                        )}

                        {content.secondaryCta?.type === SecondaryCtaType.Custom && (
                            <LinkButton
                                href={content.secondaryCta.cta.ctaUrl}
                                onClick={onSecondaryCtaClick}
                                size="small"
                                priority="tertiary"
                                cssOverrides={buttonStyles(secondaryCtaSettings)}
                            >
                                {content.secondaryCta.cta.ctaText}
                            </LinkButton>
                        )}

                        {content.secondaryCta?.type === SecondaryCtaType.ContributionsReminder && (
                            <Button
                                priority="subdued"
                                onClick={onReminderCtaClick}
                                cssOverrides={styles.reminderCta}
                            >
                                Remind me later
                            </Button>
                        )}
                    </div>
                </Hide>
            </div>

            <div>
                <Hide above="tablet">{mobileContent.primaryCta && <PaymentCards />}</Hide>
                <Hide below="tablet">{content.primaryCta && <PaymentCards />}</Hide>
            </div>
        </div>
    );
}

// ---- Helper Components ---- //

function PaymentCards() {
    return (
        <svg viewBox="0 0 132 18" css={styles.paymentMethods}>
            <g clipPath="url(#clip0_454_41729)">
                <rect y="-0.359375" width="30.75" height="18.9811" rx="3.18182" fill="#1A1F70" />
                <rect
                    x="67.5"
                    y="-0.359375"
                    width="30.75"
                    height="18.9811"
                    rx="3.18182"
                    fill="white"
                />
                <path
                    d="M11.664 5.2678L8.39944 13.0582L6.27268 13.0582L4.66166 6.84004C4.56419 6.4576 4.48444 6.31773 4.18315 6.15661C3.55129 5.85357 2.88381 5.6311 2.1964 5.49443L2.24248 5.2678L5.67188 5.2678C5.89603 5.26794 6.11281 5.34786 6.28333 5.49322C6.45384 5.63858 6.56694 5.83988 6.60233 6.061L7.45126 10.5652L9.54612 5.2678L11.664 5.2678ZM20.0098 10.5086C20.0186 8.45654 17.1741 8.34145 17.1883 7.42432C17.1883 7.14634 17.4594 6.84889 18.0425 6.77276C18.7246 6.70974 19.4111 6.83209 20.0293 7.12687L20.3837 5.47496C19.7809 5.24763 19.1423 5.12952 18.498 5.12616C16.5006 5.12616 15.104 6.18848 15.0828 7.69875C15.0704 8.8195 16.0841 9.44273 16.8551 9.82339C17.626 10.2041 17.906 10.4378 17.9007 10.7919C17.9007 11.3142 17.2751 11.5461 16.6956 11.5532C15.9755 11.5693 15.2633 11.4004 14.6273 11.0628L14.2604 12.7678C14.9752 13.0415 15.7352 13.1784 16.5006 13.1715C18.6274 13.1715 20.0044 12.1269 20.0098 10.5157L20.0098 10.5086ZM25.2699 13.0493L27.1344 13.0493L25.5057 5.2678L23.7865 5.2678C23.6033 5.26592 23.4236 5.31887 23.2708 5.41985C23.1179 5.52082 22.9988 5.66519 22.9287 5.83437L19.9052 13.0493L22.0213 13.0493L22.4414 11.8878L25.0271 11.8878L25.2699 13.0493ZM23.0209 10.2926L24.0843 7.3712L24.6939 10.2926L23.0209 10.2926ZM14.5511 5.2678L12.8851 13.0582L10.8629 13.0582L12.5289 5.2678L14.5511 5.2678Z"
                    fill="white"
                />
                <rect
                    x="33.7501"
                    y="-0.359375"
                    width="30.75"
                    height="18.9811"
                    rx="3.18182"
                    fill="#121212"
                />
                <path d="M52.4092 3.96899H45.8426V14.6835H52.4092V3.96899Z" fill="#FF5F00" />
                <path
                    d="M46.5192 9.32735C46.5183 8.29563 46.7525 7.27725 47.2038 6.34927C47.6551 5.42129 48.3118 4.60802 49.1242 3.97102C48.118 3.18105 46.9097 2.68981 45.6372 2.55346C44.3648 2.4171 43.0796 2.64112 41.9286 3.19992C40.7776 3.75872 39.8072 4.62975 39.1283 5.71346C38.4493 6.79717 38.0893 8.04984 38.0893 9.3283C38.0893 10.6068 38.4493 11.8594 39.1283 12.9431C39.8072 14.0268 40.7776 14.8979 41.9286 15.4567C43.0796 16.0155 44.3648 16.2395 45.6372 16.1031C46.9097 15.9668 48.118 15.4755 49.1242 14.6856C48.3116 14.0484 47.6547 13.2348 47.2034 12.3065C46.752 11.3781 46.5181 10.3594 46.5192 9.32735V9.32735Z"
                    fill="#EB001B"
                />
                <path
                    d="M59.509 13.55V13.3304H59.6038V13.285H59.3783V13.3304H59.4673V13.55H59.509ZM59.9467 13.55V13.285H59.8785L59.7989 13.4742L59.7193 13.285H59.6511V13.55H59.7004V13.3493L59.7743 13.5216H59.8254L59.8993 13.3493V13.55H59.9467Z"
                    fill="#F79E1B"
                />
                <path
                    d="M60.1602 9.32729C60.1602 10.6058 59.8001 11.8586 59.121 12.9423C58.442 14.0261 57.4714 14.8971 56.3203 15.4558C55.1691 16.0145 53.8838 16.2384 52.6113 16.1019C51.3388 15.9653 50.1304 15.4738 49.1243 14.6836C49.9364 14.0461 50.5929 13.2326 51.0444 12.3045C51.4958 11.3765 51.7304 10.3582 51.7304 9.32634C51.7304 8.29453 51.4958 7.27619 51.0444 6.34815C50.5929 5.42012 49.9364 4.60663 49.1243 3.96906C50.1304 3.17885 51.3388 2.68737 52.6113 2.55082C53.8838 2.41426 55.1691 2.63814 56.3203 3.19686C57.4714 3.75558 58.442 4.6266 59.121 5.71034C59.8001 6.79409 60.1602 8.04684 60.1602 9.3254V9.32729Z"
                    fill="#F79E1B"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.0382 1.64511L94.313 3.5599L93.6396 1.69686H89.34V3.50815L88.5111 1.69686H85.0403L81.466 9.71828H84.3151V16.6529H92.9143L94.054 15.3592L95.1936 16.6529H98.0106C97.5337 17.8085 96.3959 18.6218 95.0682 18.6218H70.6818C68.9245 18.6218 67.5 17.1972 67.5 15.4399V2.82244C67.5 1.06517 68.9245 -0.359375 70.6818 -0.359375H95.0682C96.4095 -0.359375 97.557 0.470651 98.0251 1.64511H95.0382ZM98.2498 2.78363H95.7635L94.6238 5.73344L94.313 6.56146L94.0022 5.73344L92.8625 2.78363H90.376V8.51455L87.8377 2.78363H85.8174L83.2273 8.63151H84.9367L85.403 7.49298H88.2521L88.7183 8.63151H90.376H90.4278H91.9301V4.85367V4.07741L92.2409 4.85367L93.6914 8.68326H95.0382L96.4887 4.85367L96.7477 4.07741V8.63151H98.25V2.82244C98.25 2.80949 98.2499 2.79655 98.2498 2.78363ZM98.25 10.9603L96.5923 12.6163L98.25 14.3241V10.9603ZM86.8534 4.07741L86.5426 4.80192L85.9728 6.30271H87.7859L87.1643 4.80192L86.8534 4.07741ZM85.5066 15.5662V9.71828L90.376 9.77003V11.0121H86.957V12.0471H90.2724V13.2891H86.957V14.3241H90.376V15.5662H85.5066ZM90.376 15.5662H92.2409L94.0022 13.6514L95.8671 15.5144H97.7838L95.0382 12.6163L97.7838 9.71828H95.8671L94.1058 11.6331L92.3445 9.71828H90.376L93.1215 12.6681L90.376 15.5662Z"
                    fill="#006FCF"
                />
                <path
                    d="M101.25 2.63765C101.25 0.982439 102.593 -0.359375 104.25 -0.359375H129C130.657 -0.359375 132 0.982437 132 2.63765V15.6247C132 17.2799 130.657 18.6218 129 18.6218H104.25C102.593 18.6218 101.25 17.2799 101.25 15.6247V2.63765Z"
                    fill="white"
                />
                <path
                    d="M113.636 16.1653L113.88 14.6188L113.337 14.6063H110.745L112.546 3.19453C112.552 3.16008 112.57 3.12796 112.596 3.10514C112.623 3.08233 112.657 3.06976 112.692 3.06976H117.064C118.515 3.06976 119.516 3.37143 120.039 3.96685C120.284 4.24618 120.44 4.53807 120.516 4.85929C120.595 5.19634 120.596 5.59903 120.519 6.09017L120.513 6.12602V6.44072L120.758 6.57945C120.965 6.68885 121.129 6.81408 121.255 6.95747C121.464 7.19629 121.6 7.49982 121.657 7.85968C121.717 8.22979 121.697 8.67018 121.6 9.16878C121.488 9.74232 121.307 10.2418 121.063 10.6506C120.839 11.0272 120.552 11.3396 120.213 11.5817C119.888 11.8116 119.503 11.9862 119.067 12.0979C118.645 12.2078 118.164 12.2632 117.636 12.2632H117.296C117.052 12.2632 116.816 12.3507 116.631 12.5076C116.445 12.6678 116.322 12.8866 116.284 13.1258L116.258 13.265L115.828 15.9908L115.808 16.0909C115.803 16.1225 115.794 16.1383 115.781 16.1491C115.769 16.1588 115.753 16.1653 115.736 16.1653H113.636Z"
                    fill="#253B80"
                />
                <path
                    d="M120.991 6.16229C120.978 6.24562 120.963 6.33082 120.946 6.41834C120.369 9.37497 118.397 10.3964 115.879 10.3964H114.596C114.288 10.3964 114.029 10.6198 113.981 10.9233L113.324 15.0834L113.138 16.2626C113.107 16.4619 113.261 16.6416 113.462 16.6416H115.736C116.006 16.6416 116.235 16.446 116.277 16.1807L116.299 16.0652L116.728 13.3502L116.755 13.2012C116.797 12.9349 117.026 12.7394 117.296 12.7394H117.636C119.84 12.7394 121.565 11.8456 122.069 9.25905C122.28 8.17854 122.171 7.27632 121.613 6.6418C121.444 6.45046 121.235 6.29171 120.991 6.16229Z"
                    fill="#179BD7"
                />
                <path
                    d="M120.387 5.92209C120.299 5.89649 120.208 5.87321 120.115 5.85226C120.022 5.83178 119.926 5.81362 119.827 5.79779C119.481 5.74193 119.102 5.71539 118.696 5.71539H115.27C115.186 5.71539 115.106 5.73448 115.034 5.76893C114.876 5.84481 114.759 5.99425 114.73 6.17721L114.001 10.7888L113.98 10.9234C114.028 10.6198 114.288 10.3964 114.596 10.3964H115.878C118.397 10.3964 120.369 9.37452 120.946 6.41836C120.963 6.33083 120.977 6.24564 120.99 6.16231C120.845 6.08503 120.687 6.01892 120.516 5.96259C120.475 5.94863 120.431 5.93513 120.387 5.92209Z"
                    fill="#222D65"
                />
                <path
                    d="M114.73 6.17732C114.759 5.99436 114.876 5.84492 115.034 5.7695C115.106 5.73505 115.186 5.71597 115.27 5.71597H118.696C119.102 5.71597 119.481 5.7425 119.827 5.79837C119.926 5.8142 120.022 5.83235 120.115 5.85284C120.209 5.87378 120.299 5.89706 120.387 5.92267C120.431 5.9357 120.475 5.9492 120.517 5.9627C120.687 6.01903 120.845 6.0856 120.991 6.16242C121.162 5.0698 120.99 4.32587 120.398 3.65224C119.746 2.91064 118.57 2.59314 117.064 2.59314H112.693C112.385 2.59314 112.123 2.8166 112.075 3.12059L110.255 14.6496C110.219 14.8778 110.395 15.0835 110.625 15.0835H113.324L114.001 10.7889L114.73 6.17732Z"
                    fill="#253B80"
                />
            </g>
            <defs>
                <clipPath id="clip0_454_41729">
                    <rect width="132" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        padding-bottom: ${space[5]}px;

        ${from.tablet} {
            padding-bottom: ${space[6]}px;
        }
    `,
    ctasContainer: css`
        display: flex;
        flex-direction: row;
        align-items: center;

        & > * + * {
            margin-left: ${space[3]}px;
        }
    `,
    paymentMethods: css`
        display: block;
        height: 1.1rem;
        width: auto;
        margin-top: ${space[2]}px;
        margin-left: ${space[1]}px;

        ${from.tablet} {
            margin-left: ${space[2]}px;
            height: 1.25rem;
        }
    `,
    reminderCta: css`
        color: ${neutral[0]};
    `,
};
