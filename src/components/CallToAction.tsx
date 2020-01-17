import React from 'react';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
// import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import { from, until } from '@guardian/src-foundations/mq';

const link = css`
    background: ${palette.brandYellow.main};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    float: left;
    ${textSans.small()};
    font-weight: 700;
    height: 32px;
    text-decoration: none;
    padding: 6px 12px 0 12px;
    line-height: 18px;
    position: relative;
    margin-right: 10px;
    margin-bottom: 6px;

    ${from.mobileMedium} {
        padding-right: 34px;
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

export const RRButton: React.FC<{
    url: string;
    dataLinkNamePrefix: string;
    dataLinkNameSuffix: string;
    linkText: string;
}> = ({ url, dataLinkNamePrefix, dataLinkNameSuffix, linkText }) => {
    return (
        <a
            className={link}
            href={url}
            data-link-name={`${dataLinkNamePrefix}${dataLinkNameSuffix}`}
        >
            {linkText}
            {/* {linkText} <ArrowRightIcon /> */}
        </a>
    );
};
