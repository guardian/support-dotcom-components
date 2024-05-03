import React from 'react';
import { JSX } from '@emotion/react/jsx-runtime';
import type { ReactComponent } from '../../types';

export function withParsedProps<ModuleProps extends JSX.IntrinsicAttributes>(
    Module: ReactComponent<ModuleProps>,
    validate: (props: unknown) => props is ModuleProps,
): ReactComponent<unknown> {
    const WrappedModule = (props: unknown) => {
        if (validate(props)) {
            return <Module {...props} />;
        }
        return <></>;
    };

    return WrappedModule;
}
