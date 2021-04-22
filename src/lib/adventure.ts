interface AdventureOption {
    targetName: string;
    text: string;
}
interface AdventureStateInfo {
    numArticles: number;
    countryCode?: string;
}
export interface AdventureState {
    name: string;
    paragraphs: (info: AdventureStateInfo) => (string | Array<JSX.Element>)[];
    options: AdventureOption[];
}
export type Adventure = { [name: string]: AdventureState };

export const buildAdventure = (states: AdventureState[]): Adventure =>
    states.reduce<Adventure>((acc, state) => {
        acc[state.name] = state;
        return acc;
    }, {});
