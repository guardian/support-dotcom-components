import React from 'react';
import { css } from 'emotion';
import {neutral, opinion} from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';

type ExpandableTextProps = {
    text: JSX.Element;
    initialHeight: number;
    onReadMoreClick: () => void;
    isExpanded: boolean;
};

const readMoreOrLess = css`
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    border-bottom: 1px solid ${neutral[86]};
    color: ${neutral[86]};
    background-color: transparent;
    ${body.medium()};
    box-sizing: border-box;
    width: 120px !important;
`;

const readLess = (
    <span className={readMoreOrLess}>
        Read less
        <svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg" height="6px" width="12px">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.8999 19.45L15.45 9H14.45L4 19.45L4.975 20.4L14.95 12L24.9249 20.4L25.8999 19.45Z"
                fill={neutral[86]}
            />
        </svg>
    </span>
);

const readMore = (
    <p className={readMoreOrLess}>
        Read more
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" height="20px" width="20px">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 9.95L14.45 20.4H15.45L25.8999 9.95L24.9249 9L14.95 17.4L4.975 9L4 9.95Z"
                fill={neutral[86]}
            />
        </svg>
    </p>
);

const ExpandableText: React.FC<ExpandableTextProps> = ({
    text,
    initialHeight,
    onReadMoreClick,
    isExpanded,
}: ExpandableTextProps) => {
    const onClick = (): void => {
        onReadMoreClick();
    };

    return (
        <>
            <div
                className={css`
                    height: ${isExpanded ? '80%' : `${initialHeight}px`};
                    overflow: ${isExpanded ? 'auto' : 'hidden'};
                `}
            >
                {text}
            </div>
            <div onClick={onClick}>{isExpanded ? readLess : readMore}</div>
        </>
    );
};

export default ExpandableText;
