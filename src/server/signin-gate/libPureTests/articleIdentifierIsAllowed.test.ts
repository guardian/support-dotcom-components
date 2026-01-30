import { articleIdentifierIsAllowed } from '../libPure';

it('articleIdentifierIsAllowed', () => {
    expect(
        articleIdentifierIsAllowed(
            'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
        ),
    ).toBe(true);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips')).toBe(false);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips#test')).toBe(false);
    expect(articleIdentifierIsAllowed('www.theguardian.com/tips/test')).toBe(false);
});
