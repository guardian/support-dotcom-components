import { mvtIdIsAuxiaAudienceShare } from '../libPure';

it('mvtIdIsAuxiaAudienceShare', () => {
    expect(mvtIdIsAuxiaAudienceShare(0)).toBe(false);
    expect(mvtIdIsAuxiaAudienceShare(1)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(210945)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(210946)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(350000)).toBe(true);
    expect(mvtIdIsAuxiaAudienceShare(350001)).toBe(false);
});
