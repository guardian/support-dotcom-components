import type { BannerDesignFromTool} from '../../../shared/types';
import { BannerTemplate } from '../../../shared/types';
import { factories } from '../../factories/';
import { getDesignForVariant } from './channelBannerTests';

describe('getDesignForVariant', () => {
    it('returns undefined if the variant specifies a template', () => {
        const variantWithTemplate = factories.bannerVariant.build({
            template: BannerTemplate.SignInPromptBanner,
        });
        const designs: BannerDesignFromTool[] = [factories.bannerDesign.build()];

        const design = getDesignForVariant(variantWithTemplate, designs);

        expect(design).toBeUndefined();
    });

    it('returns a matching design if the variant specifies a design', () => {
        const variantWithDesign = factories.bannerVariant.build({
            template: { designName: 'BAR' },
        });
        const fooDesign = factories.bannerDesign.build({
            name: 'FOO',
            visual: { kind: 'Image', altText: 'Foo Alt' },
        });
        const barDesign = factories.bannerDesign.build({
            name: 'BAR',
            visual: { kind: 'Image', altText: 'Bar Alt' },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeDefined();
        expect(design?.visual?.kind).toBe('Image');
        if (design?.visual?.kind === 'Image') {
            expect(design?.visual?.altText).toBe('Bar Alt');
        }
    });

    it('returns undefined if the variant specifies a design that does not exist', () => {
        const variantWithDesign = factories.bannerVariant.build({
            template: { designName: 'BAZ' },
        });
        const fooDesign = factories.bannerDesign.build({
            name: 'FOO',
            visual: { kind: 'Image', altText: 'Foo Alt' },
        });
        const barDesign = factories.bannerDesign.build({
            name: 'BAR',
            visual: { kind: 'Image', altText: 'Bar Alt' },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeUndefined();
    });
});
