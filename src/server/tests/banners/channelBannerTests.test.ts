import type { BannerDesignFromTool } from '../../../shared/types';
import { BannerTemplate } from '../../../shared/types';
import { factories } from '../../factories/';
import { getDesignForVariant } from './channelBannerTests';

describe('getDesignForVariant', () => {
    it('returns undefined if the variant specifies a template', () => {
        const variantWithTemplate = factories.bannerVariant({
            template: BannerTemplate.SignInPromptBanner,
        });
        const designs: BannerDesignFromTool[] = [factories.bannerDesign()];

        const design = getDesignForVariant(variantWithTemplate, designs);

        expect(design).toBeUndefined();
    });

    it('returns a matching design if the variant specifies a design', () => {
        const variantWithDesign = factories.bannerVariant({
            template: { designName: 'BAR' },
        });
        const fooDesign = factories.bannerDesign({
            name: 'FOO',
            visual: {
                kind: 'Image',
                altText: 'Foo Alt',
                mobileUrl: 'https://example.com/mobile.png',
                tabletUrl: 'https://example.com/tablet.png',
                desktopUrl: 'https://example.com/desktop.png',
            },
        });
        const barDesign = factories.bannerDesign({
            name: 'BAR',
            visual: {
                kind: 'Image',
                altText: 'Bar Alt',
                mobileUrl: 'https://example.com/mobile.png',
                tabletUrl: 'https://example.com/tablet.png',
                desktopUrl: 'https://example.com/desktop.png',
            },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeDefined();
        expect(design?.visual?.kind).toBe('Image');
        if (design?.visual?.kind === 'Image') {
            expect(design.visual.altText).toBe('Bar Alt');
        }
    });

    it('returns undefined if the variant specifies a design that does not exist', () => {
        const variantWithDesign = factories.bannerVariant({
            template: { designName: 'BAZ' },
        });
        const fooDesign = factories.bannerDesign({
            name: 'FOO',
            visual: {
                kind: 'Image',
                altText: 'Foo Alt',
                mobileUrl: 'https://example.com/mobile.png',
                tabletUrl: 'https://example.com/tablet.png',
                desktopUrl: 'https://example.com/desktop.png',
            },
        });
        const barDesign = factories.bannerDesign({
            name: 'BAR',
            visual: {
                kind: 'Image',
                altText: 'Bar Alt',
                mobileUrl: 'https://example.com/mobile.png',
                tabletUrl: 'https://example.com/tablet.png',
                desktopUrl: 'https://example.com/desktop.png',
            },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeUndefined();
    });
});
