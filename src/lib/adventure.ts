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

export const buildAdventure = (states: AdventureState[]): Adventure =>
    states.reduce<Adventure>((acc, state) => {
        acc[state.name] = state;
        return acc;
    }, {});
