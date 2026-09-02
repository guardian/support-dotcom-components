import {
    substituteMParticleTemplate,
    substituteMParticleTemplateInBannerVariant,
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

describe('substituteMParticleTemplateInBannerVariant', () => {
    const baseBannerContent = {
        heading: 'Hi %%mparticle_first_name%%',
        paragraphs: ['You are %%mparticle_age%% years old'],
        highlightedText: 'Offer for %%mparticle_first_name%%',
    };

    it('substitutes templates in bannerContent', () => {
        const variant = {
            name: 'control',
            template: 'DefaultBannerTemplate',
            bannerContent: baseBannerContent,
        };
        const result = substituteMParticleTemplateInBannerVariant(variant as never, userAttributes);
        expect(result.bannerContent?.heading).toBe('Hi Jane');
        expect(result.bannerContent?.paragraphs).toEqual(['You are 30 years old']);
        expect(result.bannerContent?.highlightedText).toBe('Offer for Jane');
    });

    it('substitutes templates in mobileBannerContent independently', () => {
        const mobileContent = { heading: 'Mobile %%mparticle_first_name%%', paragraphs: [] };
        const variant = {
            name: 'control',
            template: 'DefaultBannerTemplate',
            bannerContent: baseBannerContent,
            mobileBannerContent: mobileContent,
        };
        const result = substituteMParticleTemplateInBannerVariant(variant as never, userAttributes);
        expect(result.mobileBannerContent?.heading).toBe('Mobile Jane');
        expect(result.bannerContent?.heading).toBe('Hi Jane');
    });

    it('returns undefined bannerContent when none is set', () => {
        const variant = { name: 'control', template: 'DefaultBannerTemplate' };
        const result = substituteMParticleTemplateInBannerVariant(variant as never, userAttributes);
        expect(result.bannerContent).toBeUndefined();
        expect(result.mobileBannerContent).toBeUndefined();
    });
});
