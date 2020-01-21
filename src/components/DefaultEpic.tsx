import React from 'react';
import { css } from 'emotion';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';
import { CallToAction } from './CallToAction';
import { getTrackingUrl } from '../lib/tracking';

// Spacing values below are multiples of 4.
// See https://www.theguardian.design/2a1e5182b/p/449bd5
const wrapperStyles = css`
    padding: ${space[1]}px ${space[1]}px ${space[3]}px;
    border-top: 1px solid ${palette.brandYellow.main};
    background-color: ${palette.neutral[97]};

    * {
        ::selection {
            background: ${palette.brandYellow.main};
        }
        ::-moz-selection {
            background: ${palette.brandYellow.main};
        }
    }
`;

const headingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin-top: 0;
    margin-bottom: ${space[3]}px;
`;

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
`;

const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandYellow.main};
`;

const buttonWrapperStyles = css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const imageStyles = css`
    display: inline-block;
    width: auto;
    height: 25px;
    margin: ${space[1]}px 0;
`;

export const DefaultEpic: React.FC<{}> = ({}) => {
    const dummyMeta = {
        ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
        ophanComponentId: 'ACQUISITIONS_EPIC',
        platformId: 'GUARDIAN_WEB',
        campaignCode:
            'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
        abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
        abTestVariant: 'v2_stay_quiet',
        referrerUrl:
            'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
    };

    const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';
    const buttonUrl = getTrackingUrl(buttonBaseUrl, dummyMeta);
    console.log('=== BUTTON URL ===');
    console.log(buttonUrl);

    return (
        <section className={wrapperStyles}>
            <h2 className={headingStyles}>Since you're here...</h2>
            <p className={bodyStyles}>
                ... we have a small favour to ask. More people, like you, are reading and supporting
                the Guardian’s independent, investigative journalism than ever before. And unlike
                many news organisations, we made the choice to keep our reporting open for all,
                regardless of where they live or what they can afford to pay.
            </p>
            <p className={bodyStyles}>
                The Guardian will engage with the most critical issues of our time – from the
                escalating climate catastrophe to widespread inequality to the influence of big tech
                on our lives. At a time when factual information is a necessity, we believe that
                each of us, around the world, deserves access to accurate reporting with integrity
                at its heart.
            </p>
            <p className={bodyStyles}>
                Our editorial independence means we set our own agenda and voice our own opinions.
                Guardian journalism is free from commercial and political bias and not influenced by
                billionaire owners or shareholders. This means we can give a voice to those less
                heard, explore where others turn away, and rigorously challenge those in power.
            </p>
            <p className={bodyStyles}>
                We hope you will consider supporting us today. We need your support to keep
                delivering quality journalism that’s open and independent. Every reader
                contribution, however big or small, is so valuable.{' '}
                <strong className={highlightWrapperStyles}>
                    <span className={highlightStyles}>
                        Support The Guardian from as little as £1 - and it only takes a minute.
                        Thank you.
                    </span>
                </strong>
            </p>
            <div className={buttonWrapperStyles}>
                <CallToAction url={buttonUrl} linkText="Support The Guardian" />
                <img
                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    className={imageStyles}
                />
            </div>
        </section>
    );
};
