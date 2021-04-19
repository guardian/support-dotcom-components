import { Plugin } from '@emotion/stylis';
// This needs to use `StylisPlug` from `@emotion/cache` and then updates the function as required.
/*
    A Stylis plugin for transforming grid rules to work better in IE11
    Adapted from here:
    https://github.com/thysultan/stylis.js/issues/119#issuecomment-463539789
*/

export function gridPrefixerPlugin(): Plugin {
    const gridPropRgx = /^grid-([a-z-]+): *(.+)/;
    const repeatFnRgx = /repeat\((\d+), *(.+)\)/;
    const isNumber = (v: string | undefined) => {
        const n = parseInt(v || '', 10);
        return !isNaN(n);
    };
    let selectorContext: {
        [key: string]: string | undefined;
    } = {};

    const plugin: Plugin = function(
        stylisContext,
        content,
        selector,
        parent,
        line,
        column,
        length,
        at,
        depth,
    ) {
        switch (stylisContext) {
            case 2:
                selectorContext = {};
                break;
            case 1:
                if (content === 'display:grid') {
                    return `display:-ms-grid;display:grid`;
                }
                const m = content.match(gridPropRgx);
                if (!m) {
                    return;
                }
                const [, name, value] = m;
                switch (name) {
                    case 'template-columns':
                        const msColValue = value.replace(repeatFnRgx, '($2)[$1]');
                        return `-ms-grid-columns:${msColValue};${content};`;
                    case 'template-rows':
                        const msRowValue = value.replace(repeatFnRgx, '($2)[$1]');
                        return `-ms-grid-rows:${msRowValue};${content};`;
                    case 'row-start':
                    case 'column-start':
                        const axis = name.split('-')[0];
                        selectorContext[name] = value;
                        return `-ms-grid-${axis}: ${value};\n${content};`;
                    case 'column-end':
                        if (isNumber(selectorContext['column-start'])) {
                            const columnStart = parseInt(selectorContext['column-start'] || '', 10);
                            const columnEnd = parseInt(value.split(/\s+/).pop());
                            if (value.startsWith('span')) {
                                return `-ms-grid-column-span: ${columnEnd};\n${content};`;
                            } else {
                                return `-ms-grid-column-span: ${columnEnd -
                                    columnStart};\n${content};`;
                            }
                        }
                    case 'column':
                    case 'row':
                        const [start, end] = value.split(/\s*\/\s*/);
                        let output = plugin.call(
                            this,
                            stylisContext,
                            `grid-${name}-start:${start}`,
                            selector,
                            parent,
                            line,
                            column,
                            length,
                            at,
                            depth,
                        );
                        if (typeof end === 'string') {
                            output +=
                                ';' +
                                plugin.call(
                                    this,
                                    stylisContext,
                                    `grid-${name}-end:${end}`,
                                    selector,
                                    parent,
                                    line,
                                    column,
                                    length,
                                    at,
                                    depth,
                                );
                        }
                        return output;
                }
        }
    };
    return plugin;
}
