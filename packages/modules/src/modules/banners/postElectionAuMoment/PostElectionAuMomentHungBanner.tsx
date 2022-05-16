import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentHungBanner = getMomentTemplateBanner({
    ...settings,
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/5d691128b6956c71539cab0a29e04b2a4eb6539b/0_0_748_296/500.png?quality=85&s=5692724d3c5bfeac365c86503118b1f2',
        mobileUrl:
            'https://i.guim.co.uk/img/media/5d691128b6956c71539cab0a29e04b2a4eb6539b/0_0_748_296/500.png?quality=85&s=5692724d3c5bfeac365c86503118b1f2',
        tabletUrl:
            'https://i.guim.co.uk/img/media/6b94afbcbeb8d9f848f8bb2099d4721b3fd9144b/0_0_1316_1280/500.png?quality=85&s=fd9a851a7fc985948d5f58e11f70681c',
        desktopUrl:
            'https://i.guim.co.uk/img/media/9321f721e90405f4d16b29bdcd3fd336fcc4307e/0_0_1420_1364/500.png?quality=85&s=f05c686e2ee072e97806a38d2a6c38a5',
        leftColUrl:
            'https://i.guim.co.uk/img/media/1c7675cd39f7368fff74ef323cb3051fa0ba7650/0_0_1596_1576/500.png?quality=85&s=204024ab5c180241d7dd0644d3d23ad6',
        wideUrl:
            'https://i.guim.co.uk/img/media/b3c411f0c5d34c643dabcf0538ac62e54d86ef2e/0_0_1792_1708/500.png?quality=85&s=65821026aa503301ae4efc6fd6b1da41',
        altText:
            'Head shots of Anthony Albanese, leader of the Australian Labor Party, and Scott Morrison leader of the Liberal Party of Australia.',
    },
});

const unvalidated = bannerWrapper(PostElectionAuMomentHungBanner, 'election-au-moment-banner');
const validated = validatedBannerWrapper(
    PostElectionAuMomentHungBanner,
    'election-au-moment-banner',
);

export {
    validated as PostElectionAuMomentHungBanner,
    unvalidated as PostElectionAuMomentHungBannerUnvalidated,
};
