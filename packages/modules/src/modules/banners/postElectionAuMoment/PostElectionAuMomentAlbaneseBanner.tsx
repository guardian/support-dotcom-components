import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';

const PostElectionAuMomentAlbaneseBanner = getMomentTemplateBanner({
    ...settings,
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/a63c0655afb9403a6e6d74b160ab8947648641bb/0_0_872_296/500.png?quality=85&s=275c125f157ab3686d0e67103c71df38',
        mobileUrl:
            'https://i.guim.co.uk/img/media/a63c0655afb9403a6e6d74b160ab8947648641bb/0_0_872_296/500.png?quality=85&s=275c125f157ab3686d0e67103c71df38',
        tabletUrl:
            'https://i.guim.co.uk/img/media/964062779daabd818444189aea85cc32ae750492/0_0_1504_1260/500.png?quality=85&s=86576cdb9fc8677a71024dc0763e4bc8',
        desktopUrl:
            'https://i.guim.co.uk/img/media/182b574c47ea5ae0f21bd1ebac6f21ac90db3962/0_0_2028_1648/500.png?quality=85&s=bc08d2646ea27e0776904706ebc9e198',
        leftColUrl:
            'https://i.guim.co.uk/img/media/926d42a6709a14b01e98ca28e1e1dca4d5b5f78f/0_0_2028_1712/500.png?quality=85&s=cbed3e740e40117c972d750609cdbde1',
        wideUrl:
            'https://i.guim.co.uk/img/media/23aa54b63307e87dd398e85daee090a7afa31fff/0_0_2240_1604/500.png?quality=85&s=027a2278b4ec5450602b60c979e10378',
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
