import React from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { ReactComponent } from '../../types';

export function withParsedProps<ModuleProps extends EmotionJSX.IntrinsicAttributes>(
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
