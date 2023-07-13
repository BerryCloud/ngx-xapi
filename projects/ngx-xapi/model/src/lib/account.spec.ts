import { Account } from './account';

describe('Account', () => {
  it('should create an instance', () => {
    const account: Account = {
      homePage: 'http://example.com',
      name: 'Example Account',
    };

    expect(account).toBeTruthy();
  });
});
