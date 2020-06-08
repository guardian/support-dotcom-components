import React from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { body, headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Button, LinkButton, buttonReaderRevenue } from '@guardian/src-button';
import { brand } from '@guardian/src-foundations/themes';

const banner = css`
    width: 100%;
    background-color: #006d67;
    color: ${neutral[100]};
    padding: ${space[4]}px;
    button {
        margin-left: ${space[3]}px;
    }
`;

const topLeftComponent = css`
    width: 100%;
    ${from.tablet} {
        width: 47%;
    }
`;

const heading = css`
    ${headline.medium({ fontWeight: 'bold' })};
    margin: 0;
`;

const paragraph = css`
    ${body.medium()};
    font-size: 20px;
    line-height: 135%;
    margin: ${space[3]}px 0 ${space[9]}px;
`;

const siteMessage = css`
    margin: ${space[3]}px 0 ${space[4]}px;
    ${textSans.small()};
    color: ${neutral[100]};
    a,
    :hover,
    :visited {
        color: ${neutral[100]};
        font-weight: bold;
    }
`;

export const SubscriptionsBanner: React.FC = () => {
    const closeBanner = (): null => {
        return null;
    };
    return (
        <section className={banner} data-target="subscriptions-banner">
            <div className={topLeftComponent}>
                <h3 className={heading}>Make us part of your new normal</h3>
                <p className={paragraph}>
                    Two Guardian apps, with you every day. <strong>The Daily</strong>, joining you
                    in time for breakfast to share politics, culture, food and opinion.{' '}
                    <strong>Live</strong>, constantly by your side, keeping you connected with the
                    outside world.
                </p>
                <ThemeProvider theme={buttonReaderRevenue}>
                    <LinkButton priority="primary" size="default" href="">
                        Become a digital subscriber
                    </LinkButton>
                </ThemeProvider>
                <ThemeProvider theme={brand}>
                    <Button onClick={closeBanner} priority="subdued">
                        Not now
                    </Button>
                </ThemeProvider>
                <div className={siteMessage}>
                    Already a subscriber? <a href="">Sign in</a> to not see this again
                </div>
            </div>
        </section>
    );
};
