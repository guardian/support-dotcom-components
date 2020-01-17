import React from 'react';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';

const link = css`
    background: ${palette.brandYellow.main};
    border-radius: 21px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    ${textSans.medium({ fontWeight: 'bold' })};
    text-decoration: none;
    padding: 12px 21px;
    line-height: 18px;
    position: relative;
    margin-right: 10px;
    transition: background-color 0.3s ease-in-out;

    ${from.mobileMedium} {
        padding-right: 35px;
    }

    :hover {
        background: ${palette.brandYellow.dark};
    }

    svg {
        fill: currentColor;
        position: absolute;
        right: 3px;
        top: 50%;
        height: 32px;
        width: 32px;
        transform: translate(0, -50%);
        transition: transform 0.3s ease-in-out;

        ${until.mobileMedium} {
            display: none;
        }
    }

    :hover svg {
        transform: translate(3px, -50%);
    }
`;

export const CallToAction: React.FC<{
    url: string;
    linkText: string;
}> = ({ url, linkText }) => {
    return (
        <a className={link} href={url}>
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                <path d="M22.8 14.6l-7.6-7.6-.7.7 5.5 6.6h-14v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
            </svg>
        </a>
    );
};
