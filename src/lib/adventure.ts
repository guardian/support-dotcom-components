interface AdventureOption {
    targetName: string;
    text: string;
}
export interface AdventureState {
    name: string;
    paragraphs: string[];
    options: AdventureOption[];
}
export type Adventure = { [name: string]: AdventureState };

export const buildAdventure = (states: AdventureState[]): Adventure | null => {
    const adventure = states.reduce<Adventure>((acc, state) => {
        acc[state.name] = state;
        return acc;
    }, {});

    const isValid = Object.entries(adventure).every(([name, state]) =>
        state.options.every(option => {
            const exists = !!adventure[option.targetName];
            if (!exists) {
                console.log('Missing target state', option.targetName);
            }
            return exists;
        }),
    );

    if (isValid) {
        return adventure;
    }
    return null;
};
