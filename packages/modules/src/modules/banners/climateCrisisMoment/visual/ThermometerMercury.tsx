import { css } from '@emotion/react';
import { news } from '@guardian/src-foundations';
import { between, from } from '@guardian/src-foundations/mq';
import React from 'react';
import { animated, useReducedMotion, useSpring } from 'react-spring';

type MercuryHookProps = {
    from: string;
    to: string;
};

function useRisingMercury({ from, to }: MercuryHookProps) {
    const reduceMotion = useReducedMotion();
    return useSpring({
        from: { d: from },
        d: to,
        delay: 1000,
        config: {
            duration: 5000,
        },
        immediate: reduceMotion,
    });
}

function MercuryMobile() {
    const { d } = useRisingMercury({
        from: 'M41 0 V50 h8 v65 h-8 z',
        to: 'M41 0 V5 h8 v65 h-8 z',
    });
    return <animated.path d={d} css={mobileStyles} fill={news[300]} />;
}

function MercuryTablet() {
    const { d } = useRisingMercury({
        from: 'M68 145 h15 v65 H68 V59 Z',
        to: 'M68 10 h15 v165 H68 V59 Z',
    });
    return <animated.path d={d} css={tabletStyles} fill={news[300]} />;
}

function MercuryDesktop() {
    const { d } = useRisingMercury({
        from: 'M83,145 h22 v110 H83 v-110 Z',
        to: 'M83, 10 h22 v200 H83 v-110 Z',
    });
    return <animated.path d={d} css={desktopStyles} fill={news[300]} />;
}

export function ThermometerMercury(): JSX.Element {
    return (
        <>
            <MercuryMobile />
            <MercuryTablet />
            <MercuryDesktop />
        </>
    );
}

const mobileStyles = css`
    ${from.tablet} {
        display: none;
    }
`;

const tabletStyles = css`
    display: none;
    ${between.tablet.and.desktop} {
        display: block;
    }
`;

const desktopStyles = css`
    display: none;
    ${from.desktop} {
        display: block;
    }
`;
