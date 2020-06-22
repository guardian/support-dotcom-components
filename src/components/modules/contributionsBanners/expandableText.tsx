import React, { useState } from 'react';
import { css } from 'emotion';
import { Button } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { SvgChevronDownSingle, SvgChevronUpSingle } from '@guardian/src-svgs';
import { body } from '@guardian/src-foundations/typography';

type ExpandableTextProps = {
    text: JSX.Element;
    initialHeight: number;
    onReadMoreClick: () => void;
};

const ExpandableText: React.FC<ExpandableTextProps> = ({
    text,
    initialHeight,
    onReadMoreClick,
}: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onClick = () => {
        setIsExpanded(prevState => !prevState);
        onReadMoreClick();
    };

    return (
        <>
            <div
                className={css`
                    height: ${isExpanded ? '75%' : `${initialHeight}px`};
                    overflow: hidden;
                `}
            >
                {text}
            </div>
            <div>
                <Button
                    priority="subdued"
                    iconSide="right"
                    icon={isExpanded ? <SvgChevronUpSingle /> : <SvgChevronDownSingle />}
                    onClick={(): void => onClick()}
                    className={css`
                        position: absolute;
                        bottom: 15px;
                        color: ${neutral[97]} !important;
                        font-family: ${body.small()} !important;
                    `}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </Button>
            </div>
        </>
    );
};

export default ExpandableText;
