import {
    substituteMParticleTemplate,
    substituteMParticleTemplateInEpicVariant,
} from './mParticleTemplates';

const userAttributes = {
    first_name: 'Jane',
    age: 30,
};

describe('substituteMParticleTemplate', () => {
    it('replaces a single template with the attribute value', () => {
        const result = substituteMParticleTemplate(
            'Hello %%mparticle_first_name%%',
            userAttributes,
        );
        expect(result).toBe('Hello Jane');
    });

    it('replaces a numeric attribute as a string', () => {
        const result = substituteMParticleTemplate(
            'You are %%mparticle_age%% years old',
            userAttributes,
        );
        expect(result).toBe('You are 30 years old');
    });

    it('replaces multiple templates in the same string', () => {
        const result = substituteMParticleTemplate(
            'Hello %%mparticle_first_name%%, you are %%mparticle_age%%',
            userAttributes,
        );
        expect(result).toBe('Hello Jane, you are 30');
    });

    it('leaves the placeholder intact when the attribute is missing', () => {
        const result = substituteMParticleTemplate('Hello %%mparticle_last_name%%', userAttributes);
        expect(result).toBe('Hello %%mparticle_last_name%%');
    });

    it('returns the template unchanged when userAttributes is empty', () => {
        const result = substituteMParticleTemplate('Hello %%mparticle_first_name%%', {});
        expect(result).toBe('Hello %%mparticle_first_name%%');
    });

    it('returns the string unchanged when it contains no templates', () => {
        const result = substituteMParticleTemplate('Hello world', userAttributes);
        expect(result).toBe('Hello world');
    });
});

describe('substituteMParticleTemplateInEpicVariant', () => {
    const baseVariant = {
        name: 'control',
        heading: 'Hi %%mparticle_first_name%%',
        paragraphs: ['You are %%mparticle_age%% years old', 'No template here'],
        highlightedText: 'Special offer for %%mparticle_first_name%%',
    };

    it('substitutes templates in heading, paragraphs and highlightedText', () => {
        const result = substituteMParticleTemplateInEpicVariant(baseVariant, userAttributes);
        expect(result.heading).toBe('Hi Jane');
        expect(result.paragraphs).toEqual(['You are 30 years old', 'No template here']);
        expect(result.highlightedText).toBe('Special offer for Jane');
    });

    it('leaves heading unchanged when it has no template', () => {
        const variant = { ...baseVariant, heading: 'No template' };
        const result = substituteMParticleTemplateInEpicVariant(variant, userAttributes);
        expect(result.heading).toBe('No template');
    });

    it('handles a missing heading', () => {
        const variant = { ...baseVariant, heading: undefined };
        const result = substituteMParticleTemplateInEpicVariant(variant, userAttributes);
        expect(result.heading).toBeUndefined();
    });

    it('handles a missing highlightedText', () => {
        const variant = { ...baseVariant, highlightedText: undefined };
        const result = substituteMParticleTemplateInEpicVariant(variant, userAttributes);
        expect(result.highlightedText).toBeUndefined();
    });
});
