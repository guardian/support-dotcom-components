import React from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export function withParsedProps<ModuleProps extends EmotionJSX.IntrinsicAttributes>(
    Module: React.ComponentType<ModuleProps>,
    validate: (props: unknown) => props is ModuleProps,
): React.FC<unknown> {
    const WrappedModule = (props: unknown) => {
        if (validate(props)) {
            return <Module {...props} />;
        }
        return null;
    };

    return WrappedModule;
}
