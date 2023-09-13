import { getDesignForVariant } from './channelBannerTests';
import { factories } from '../../factories/';
import { BannerDesignFromTool, BannerTemplate } from '@sdc/shared/src/types';

describe('getDesignForVariant', () => {
    it('returns undefined if the variant specifies a template', () => {
        const variantWithTemplate = factories.bannerVariant.build({
            template: BannerTemplate.ContributionsBanner,
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
            image: { altText: 'Foo Alt' },
        });
        const barDesign = factories.bannerDesign.build({
            name: 'BAR',
            image: { altText: 'Bar Alt' },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeDefined();
        expect(design?.image.altText).toBe('Bar Alt');
    });

    it('returns undefined if the variant specifies a design that does not exist', () => {
        const variantWithDesign = factories.bannerVariant.build({
            template: { designName: 'BAZ' },
        });
        const fooDesign = factories.bannerDesign.build({
            name: 'FOO',
            image: { altText: 'Foo Alt' },
        });
        const barDesign = factories.bannerDesign.build({
            name: 'BAR',
            image: { altText: 'Bar Alt' },
        });
        const designs: BannerDesignFromTool[] = [fooDesign, barDesign];

        const design = getDesignForVariant(variantWithDesign, designs);

        expect(design).toBeUndefined();
    });
});
