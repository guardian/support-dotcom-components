import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentHungBanner = getMomentTemplateBanner({
    ...settings,
    headerSettings: {
        showHeader: { text: true },
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/96891616b71f3e15d7865d200215249a2174a124/0_0_1480_1240/500.png?quality=85&s=8a6fdf090ef6a8e734eedac798f3519d',
        mobileUrl:
            'https://i.guim.co.uk/img/media/5d691128b6956c71539cab0a29e04b2a4eb6539b/0_0_748_296/500.png?quality=85&s=5692724d3c5bfeac365c86503118b1f2',
        wideUrl:
            'https://i.guim.co.uk/img/media/96891616b71f3e15d7865d200215249a2174a124/0_0_1480_1240/500.png?quality=85&s=8a6fdf090ef6a8e734eedac798f3519d',
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
