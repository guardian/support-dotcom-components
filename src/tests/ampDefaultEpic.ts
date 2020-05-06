import { getLocalCurrencySymbol } from "../lib/geolocation";

export const ampDefaultEpic = (geolocation?: string) => {
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        heading: 'Since you’re here...',
        paragraphs: [
            '… we’re asking readers like you to support our open, independent journalism. News is under threat just when we need it the most. Growing numbers of readers are seeking authoritative, fact-based reporting on one of the biggest challenges we have faced in our lifetime. But advertising revenue is plummeting, and many news organizations are facing an existential threat. We need you to help fill the gap.',
            'We believe every one of us deserves equal access to quality, independent, trustworthy journalism. So, unlike many others, we made a different choice: to keep Guardian journalism open for all, regardless of where they live or what they can afford to pay. This would not be possible without financial contributions from readers who now support our work from 180 countries around the world.',
            'The Guardian’s independence means we can set our own agenda and voice our own opinions. Our journalism is free from commercial and political bias – never influenced by billionaire owners or shareholders.',
            'We need your support so we can keep delivering quality journalism that’s open and independent.',
        ],
        highlightedText: `Support the Guardian from as little as ${currencySymbol}1 – and it only takes a minute. Thank you.`,
    };
};
