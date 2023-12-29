import React from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import type { ReactComponent } from '../../../../types';

type Props = {
    ctaText: string;
    ctaUrl: string;
    onCtaClick: () => void;
    cssOverrides?: SerializedStyles | SerializedStyles[] | undefined;
};

// Always override the LinkButton border
const style = css`
    border: none;
`;

export const Button: ReactComponent<Props> = (props: Props) => {
    const { ctaText, ctaUrl, onCtaClick, cssOverrides } = props;
    return (
        <LinkButton
            href={ctaUrl}
            onClick={onCtaClick}
            priority="tertiary"
            cssOverrides={cssOverrides}
            css={style}
            icon={<SvgArrowRightStraight />}
            iconSide="right"
            target="_blank"
            rel="noopener noreferrer"
        >
            {ctaText}
        </LinkButton>
    );
};
