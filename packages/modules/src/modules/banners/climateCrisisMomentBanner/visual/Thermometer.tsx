import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import React, { ReactNode } from 'react';
import { ThermometerMobile } from './ThemometerMobile';
import { ThermometerDesktop } from './ThermometerDesktop';
import { ThermometerTablet } from './ThermometerTablet';

export function Thermometer({ children }: { children?: ReactNode }): JSX.Element {
    return (
        <figure css={svgContainerStyles}>
            <Hide above="tablet">
                <ThermometerMobile>{children}</ThermometerMobile>
            </Hide>
            <Hide below="tablet" above="desktop">
                <ThermometerTablet>{children}</ThermometerTablet>
            </Hide>
            <Hide below="desktop">
                <ThermometerDesktop>{children}</ThermometerDesktop>
            </Hide>
        </figure>
    );
}

const svgContainerStyles = css`
    display: flex;
    align-items: flex-end;
    margin: 0;
    overflow: hidden;

    ${until.tablet} {
        justify-content: center;
        margin-top: -${space[2]}px;
    }
`;
