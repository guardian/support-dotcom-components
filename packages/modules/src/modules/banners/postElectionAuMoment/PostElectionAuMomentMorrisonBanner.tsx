import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentMorrisonBanner = getMomentTemplateBanner({
    ...settings,
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/76c913749a31ad4847bbcedafc098b003a3963a1/0_0_872_296/500.png?quality=85&s=e0e1d7a7fcf0a656f5a19e68b6800910',
        mobileUrl:
            'https://i.guim.co.uk/img/media/76c913749a31ad4847bbcedafc098b003a3963a1/0_0_872_296/500.png?quality=85&s=e0e1d7a7fcf0a656f5a19e68b6800910',
        tabletUrl:
            'https://i.guim.co.uk/img/media/cd1bb0b74be9a7eb6a8a7c29101edcaee7b0067b/0_0_1468_1180/500.png?quality=85&s=038b49db59d0b7f9da39aae1b5b2c1e0',
        desktopUrl:
            'https://i.guim.co.uk/img/media/f7f9ee7aa5526431fc1c6f2e10206d1032f50e52/0_0_1700_1284/500.png?quality=85&s=99ea8f8dafa34e13433d7925550d6754',
        leftColUrl:
            'https://i.guim.co.uk/img/media/392f4a2a6fe26fd3e18a9b2703515937d1bd4602/0_0_2192_1464/500.png?quality=85&s=7ad046500a68605cb285b8327a487b32',
        wideUrl:
            'https://i.guim.co.uk/img/media/8a737c07c07e1c41bcba95cc15a38b167a82d51f/0_0_2456_1740/500.png?quality=85&s=18ef3405d8065564cf633115e07521ca',
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
