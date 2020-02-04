import React from 'react';
import { css } from 'emotion';
import { textSans } from '../utils/typography';
import { palette } from '@guardian/src-foundations';
import { space } from '@guardian/src-foundations';

// Spacing values below are multiples of 4.
// See https://www.theguardian.design/2a1e5182b/p/449bd5
const linkStyles = css`
    background: ${palette.brandYellow.main};
    border-radius: 21px;
    box-sizing: border-box;
    color: ${palette.neutral[7]} !important;
    ${textSans.medium({ fontWeight: 'bold' })};
    text-decoration: none;
    padding: ${space[3]}px ${space[12]}px ${space[3]}px ${space[5]}px;
    line-height: 18px;
    position: relative;
    margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
    transition: background-color 0.3s ease-in-out;

    :hover {
        background: ${palette.brandYellow.dark};
        text-decoration: none;
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

type Props = {
    url: string;
    linkText: string;
};

export const PrimaryButton: React.FC<Props> = ({ url, linkText }: Props) => (
    <a className={linkStyles} href={url} target="_blank" rel="noopener noreferrer">
        {linkText}
        <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8 14.6l-7.6-7.6-.7.7 5.5 6.6h-14v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"></path>
        </svg>
    </a>
);
