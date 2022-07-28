import { css, SerializedStyles } from '@emotion/react';
import { CtaSettings } from './settings';

export function buttonStyles(settings: CtaSettings): SerializedStyles {
    return css`
        ${toCssString(settings.default)}

        &:hover {
            ${toCssString(settings.hover)}
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
