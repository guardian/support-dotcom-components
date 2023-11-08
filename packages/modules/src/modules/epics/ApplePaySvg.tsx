import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const applePayStyles = css`
    display: block;
    height: 1.1rem;
    width: auto;
    margin-top: ${space[2]}px;

    ${from.tablet} {
        height: 1.25rem;
    }
`;

type ApplePayProps = {
    cssOverrides?: SerializedStyles;
};

export const ApplePaySvg = ({ cssOverrides }: ApplePayProps): JSX.Element => {
    return (
        <svg
            width="45"
            height="19"
            viewBox="0 0 45 19"
            css={[applePayStyles, cssOverrides]}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.57013 2.45014C9.09745 1.79058 9.45529 0.904978 9.36091 0C8.58899 0.0383834 7.647 0.509265 7.10164 1.16935C6.61196 1.7346 6.17856 2.65729 6.29154 3.52433C7.15807 3.59949 8.02379 3.0912 8.57013 2.45014Z"
                fill="white"
            />
            <path
                d="M9.35118 3.69368C8.09278 3.61872 7.02283 4.40788 6.42188 4.40788C5.8206 4.40788 4.90034 3.73145 3.90501 3.74969C2.60953 3.76871 1.40747 4.50119 0.75007 5.66617C-0.602096 7.99671 0.393234 11.4537 1.70814 13.3518C2.34669 14.2908 3.11625 15.3248 4.13027 15.2877C5.08834 15.2501 5.46387 14.6673 6.62845 14.6673C7.79217 14.6673 8.13044 15.2877 9.14462 15.2689C10.1964 15.2501 10.8539 14.3294 11.4924 13.3894C12.2249 12.3189 12.5248 11.2853 12.5437 11.2286C12.5248 11.2098 10.5157 10.439 10.497 8.12784C10.4781 6.19267 12.0744 5.27219 12.1496 5.21511C11.2481 3.88179 9.83951 3.73145 9.35118 3.69368Z"
                fill="white"
            />
            <path
                d="M20.308 1.07471C23.0431 1.07471 24.9477 2.96005 24.9477 5.70496C24.9477 8.45968 23.0039 10.3548 20.2394 10.3548H17.2111V15.1707H15.0232V1.07471L20.308 1.07471ZM17.2111 8.51827H19.7217C21.6266 8.51827 22.7108 7.4927 22.7108 5.71476C22.7108 3.93701 21.6266 2.92104 19.7314 2.92104H17.2111V8.51827Z"
                fill="white"
            />
            <path
                d="M25.519 12.2498C25.519 10.4523 26.8964 9.34849 29.3387 9.2117L32.1518 9.0457V8.25452C32.1518 7.11156 31.3801 6.42778 30.0909 6.42778C28.8695 6.42778 28.1076 7.01377 27.9222 7.93213H25.9294C26.0466 6.07599 27.629 4.70844 30.1689 4.70844C32.6598 4.70844 34.252 6.02719 34.252 8.08833V15.1705H32.2298V13.4806H32.1812C31.5854 14.6235 30.2861 15.3463 28.9381 15.3463C26.9258 15.3463 25.519 14.0959 25.519 12.2498ZM32.1518 11.3218V10.511L29.6217 10.6672C28.3616 10.7552 27.6486 11.312 27.6486 12.1912C27.6486 13.0898 28.391 13.6759 29.5241 13.6759C30.9991 13.6759 32.1518 12.66 32.1518 11.3218Z"
                fill="white"
            />
            <path
                d="M36.162 18.9511V17.2416C36.318 17.2806 36.6696 17.2806 36.8456 17.2806C37.8223 17.2806 38.3499 16.8704 38.6721 15.8154C38.6721 15.7958 38.8579 15.1902 38.8579 15.1804L35.146 4.89417H37.4315L40.0302 13.2561H40.0691L42.6678 4.89417H44.8949L41.0458 15.7078C40.167 18.1989 39.1511 18.9999 37.0215 18.9999C36.8456 18.9999 36.318 18.9803 36.162 18.9511Z"
                fill="white"
            />
        </svg>
    );
};
