import React from 'react';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

const link = css`
    background: ${palette.brandYellow.main};
    border-radius: 21px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    ${textSans.medium({ fontWeight: 'bold' })};
    text-decoration: none;
    padding: 12px 46px 12px 21px;
    line-height: 18px;
    position: relative;
    margin: 4px 10px 4px 0;
    transition: background-color 0.3s ease-in-out;

    :hover {
        background: ${palette.brandYellow.dark};
    }

    svg {
        fill: currentColor;
        position: absolute;
        right: 12px;
        top: 50%;
        height: 30px;
        width: 30px;
        transform: translate(0, -50%);
        transition: transform 0.3s ease-in-out;
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
        <a className={link} href={url} target="_blank">
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg">
                <path d="M22.8 14.6l-7.6-7.6-.7.7 5.5 6.6h-14v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"></path>
            </svg>
        </a>
    );
};
