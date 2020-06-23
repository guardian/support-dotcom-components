import React from 'react';
import { css } from 'emotion';
import { Button } from '@guardian/src-button';
import { neutral } from '@guardian/src-foundations/palette';
import { SvgChevronDownSingle, SvgChevronUpSingle } from '@guardian/src-svgs';
import { body } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

type ExpandableTextProps = {
    text: JSX.Element;
    initialHeight: number;
    onReadMoreClick: () => void;
    isExpanded: boolean;
};

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
            <div>
                <Button
                    priority="subdued"
                    iconSide="right"
                    icon={isExpanded ? <SvgChevronUpSingle /> : <SvgChevronDownSingle />}
                    onClick={(): void => onClick()}
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
