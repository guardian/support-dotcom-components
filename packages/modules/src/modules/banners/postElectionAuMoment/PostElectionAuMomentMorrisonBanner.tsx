import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentMorrisonBanner = getMomentTemplateBanner({
    ...settings,
    headerSettings: {
        showHeader: { text: true },
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/20b836a4e03e506009d94de14ede430255f7fd4b/0_0_1480_1240/500.png?quality=85&s=ffee1d2cf7c63748a06acd7de11365d1',
        mobileUrl:
            'https://i.guim.co.uk/img/media/76c913749a31ad4847bbcedafc098b003a3963a1/0_0_872_296/500.png?quality=85&s=e0e1d7a7fcf0a656f5a19e68b6800910',
        wideUrl:
            'https://i.guim.co.uk/img/media/20b836a4e03e506009d94de14ede430255f7fd4b/0_0_1480_1240/500.png?quality=85&s=ffee1d2cf7c63748a06acd7de11365d1',
        altText: 'Head shot of Scott Morrison, leader of the Liberal Party of Australia.',
    },
});

const unvalidated = bannerWrapper(PostElectionAuMomentMorrisonBanner, 'election-au-moment-banner');
const validated = validatedBannerWrapper(
    PostElectionAuMomentMorrisonBanner,
    'election-au-moment-banner',
);

export {
    validated as PostElectionAuMomentMorrisonBanner,
    unvalidated as PostElectionAuMomentMorrisonBannerUnvalidated,
};
