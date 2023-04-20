import { css, SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';
import { CtaSettings } from '../settings';

export function buttonStyles(settings: CtaSettings): SerializedStyles {
    const { default: defaultSettings, mobile, desktop, hover } = settings;

    return css`
        ${toCssString(defaultSettings)};

        ${until.tablet} {
            ${mobile ? toCssString(mobile) : ''};
        }

        ${from.tablet} {
            ${desktop ? toCssString(desktop) : ''};
        }

        &:hover {
            ${toCssString(hover)}
        }
    `;
}

// ---- Helpers ---- //

function toCssString(cssProps: Record<string, string>) {
    return Object.entries(cssProps).map(([prop, val]) => `${toCssProp(prop)}: ${val};`);
}

function toCssProp(prop: string) {
    return CSS_PROPERTY_NAME_SUBSTITUTIONS.get(prop) ?? prop;
}

const CSS_PROPERTY_NAME_SUBSTITUTIONS = new Map<string, string>([
    ['textColour', 'color'],
    ['backgroundColour', 'background-color'],
]);
