import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentAlbaneseBanner = getMomentTemplateBanner({
    ...settings,
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/5ffd1915bffebf7edea9055d957dfc56cd9344d7/0_0_1480_1232/500.png?quality=85&s=b1ccbcaeb9ae9ce340d43075e13224d3',
        mobileUrl:
            'https://i.guim.co.uk/img/media/a63c0655afb9403a6e6d74b160ab8947648641bb/0_0_872_296/500.png?quality=85&s=275c125f157ab3686d0e67103c71df38',
        wideUrl:
            'https://i.guim.co.uk/img/media/5ffd1915bffebf7edea9055d957dfc56cd9344d7/0_0_1480_1232/500.png?quality=85&s=b1ccbcaeb9ae9ce340d43075e13224d3',
        altText: 'Head shot of Anthony Albanese, leader of the Australian Labor Party.',
    },
});

const unvalidated = bannerWrapper(PostElectionAuMomentAlbaneseBanner, 'election-au-moment-banner');
const validated = validatedBannerWrapper(
    PostElectionAuMomentAlbaneseBanner,
    'election-au-moment-banner',
);

export {
    validated as PostElectionAuMomentAlbaneseBanner,
    unvalidated as PostElectionAuMomentAlbaneseBannerUnvalidated,
};
