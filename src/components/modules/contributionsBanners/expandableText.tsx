import React, { useState } from 'react';
import { css } from 'emotion';
import { Button } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { SvgChevronDownSingle, SvgChevronUpSingle } from '@guardian/src-svgs';
import { body } from '@guardian/src-foundations/typography';

type ExpandableTextProps = {
    text: JSX.Element;
    initialHeight: number;
};

const ExpandableText: React.FC<ExpandableTextProps> = ({
    text,
    initialHeight,
}: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div
                className={css`
                    height: ${isExpanded ? '100%' : `${initialHeight}px`};
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
                    onClick={(): void => setIsExpanded(!isExpanded)}
                    className={css`
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
