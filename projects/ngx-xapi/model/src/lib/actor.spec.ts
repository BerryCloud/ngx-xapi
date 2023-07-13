import { Agent, AnonymousGroup, IdentifiedGroup } from './actor';

describe('Agent', () => {
  it('should create an instance with mbox', () => {
    const agent: Agent = {
      mbox: 'mailto:agent@example.com',
      name: 'Example Agent',
    };

    expect(agent).toBeTruthy();
  });

  it('should create an instance with mbox_sha1sum', () => {
    const agent: Agent = {
      name: 'Example Agent',
      mbox_sha1sum: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    expect(agent).toBeTruthy();
  });

  it('should create an instance with openid', () => {
    const agent: Agent = {
      name: 'Example Agent',
      openid: 'https://example.com',
    };

    expect(agent).toBeTruthy();
  });

  it('should create an instance with account', () => {
    const agent: Agent = {
      name: 'Example Agent',
      account: {
        homePage: 'http://example.com',
        name: 'Example Account',
      },
    };

    expect(agent).toBeTruthy();
  });
});

describe('AnonymousGroup', () => {
  it('should create an instance with member', () => {
    const anonymousGroup: AnonymousGroup = {
      member: [
        {
          mbox: 'mailto:member1@example.com',
          name: 'Member 1',
        },
        {
          mbox: 'mailto:member2@example.com',
          name: 'Member 2',
        },
      ],

      objectType: 'Group',
      name: 'Example Group',
    };

    expect(anonymousGroup).toBeTruthy();
  });
});

describe('IdentifiedGroup', () => {
  it('should create an instance with member', () => {
    const identifiedGroup: IdentifiedGroup = {
      member: [
        {
          mbox: 'mailto:member1@example.com',
          name: 'Member 1',
        },
        {
          mbox: 'mailto:member2@example.com',
          name: 'Member 2',
        },
      ],

      objectType: 'Group',
      name: 'Example Group',
      account: {
        homePage: 'http://example.com',
        name: 'Example Group Account',
      },
    };

    expect(identifiedGroup).toBeTruthy();
  });

  it('should create an instance without member', () => {
    const identifiedGroup: IdentifiedGroup = {
      objectType: 'Group',
      name: 'Example Group',
      openid: 'https://example.com/group',
    };

    expect(identifiedGroup).toBeTruthy();
  });
});

describe('Actor', () => {
  it('should create an instance as Agent', () => {
    const actor: Agent = {
      mbox: 'mailto:agent@example.com',
      name: 'Example Agent',
    };

    expect(actor).toBeTruthy();
  });

  it('should create an instance as AnonymousGroup', () => {
    const actor: AnonymousGroup = {
      member: [
        {
          mbox: 'mailto:member1@example.com',
          name: 'Member 1',
        },
        {
          mbox: 'mailto:member2@example.com',
          name: 'Member 2',
        },
      ],

      objectType: 'Group',
      name: 'Example Group',
    };

    expect(actor).toBeTruthy();
  });

  it('should create an instance as IdentifiedGroup', () => {
    const actor: IdentifiedGroup = {
      member: [
        {
          openid: 'https://example.com/member1',
          name: 'Member 1',
        },
        {
          openid: 'https://example.com/member2',
          name: 'Member 2',
        },
      ],

      objectType: 'Group',
      name: 'Example Group',
      account: {
        homePage: 'http://example.com',
        name: 'Example Group Account',
      },
    };

    expect(actor).toBeTruthy();
  });
});
