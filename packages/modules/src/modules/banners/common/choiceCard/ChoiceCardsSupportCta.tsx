import React from 'react';
import { space } from '@guardian/source/foundations';
import { css, SerializedStyles } from '@emotion/react';
import { Hide, SvgArrowRightStraight, LinkButton } from '@guardian/source/react-components';
import { ContentType } from '../../../../hooks/useChoiceCards';

const buttonOverrides = css`
    margin-right: ${space[3]}px;
    // Always override the LinkButton border
    border: none;
`;

export const ChoiceCardsSupportCta = ({
    getCtaText,
    getCtaUrl,
    cssOverrides,
    onCtaClick,
}: {
    getCtaText: (contentType: ContentType) => string;
    getCtaUrl: (contentType: ContentType) => string;
    cssOverrides?: SerializedStyles;
    onCtaClick: () => void;
}): JSX.Element | null => {
    const mobileText = getCtaText('mobileContent');
    const desktopText = getCtaText('mainContent');

    const mobileUrl = getCtaUrl('mobileContent');
    const desktopUrl = getCtaUrl('mainContent');

    return (
        <>
            <Hide above="tablet">
                <LinkButton
                    href={mobileUrl}
                    onClick={onCtaClick}
                    priority="tertiary"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                    icon={<SvgArrowRightStraight />}
                    iconSide="right"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {mobileText}
                </LinkButton>
            </Hide>

            <Hide below="tablet">
                <LinkButton
                    href={desktopUrl}
                    onClick={onCtaClick}
                    priority="tertiary"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                    icon={<SvgArrowRightStraight />}
                    iconSide="right"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {desktopText}
                </LinkButton>
            </Hide>
        </>
    );
};
