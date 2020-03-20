import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';

type Count = 4 | 8;

const lineStyles = (count: Count): string => css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px ${count === 4 ? '13px' : '29px'};
    height: ${count === 4 ? '13px' : '29px'};
`;

type Props = {
    count?: Count;
};

export const GuardianLines: React.FC<Props> = ({ count = 4 }: Props) => {
    return <div className={lineStyles(count)} />;
};
