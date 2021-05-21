import React from 'react';

export function withParsedProps<ModuleProps>(
    Module: React.FC<ModuleProps>,
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
