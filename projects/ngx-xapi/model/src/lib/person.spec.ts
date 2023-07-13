import { Person } from './person';

describe('Person', () => {
  it('should create an instance', () => {
    const person: Person = {
      name: ['Example Person', 'Alias Person'],
      mbox: ['mailto:person@example.com', 'mailto:alias@example.com'],
      account: [
        {
          homePage: 'http://example.com',
          name: 'Example Person Account',
        },
        {
          homePage: 'http://example.com',
          name: 'Alias Person Account',
        },
      ],
      openid: ['https://example.com/person', 'https://example.com/alias'],
      mbox_sha1sum: [
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      ],
      objectType: 'Person',
    };

    expect(person).toBeTruthy();
  });
});
