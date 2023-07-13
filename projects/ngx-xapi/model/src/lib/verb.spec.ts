import { Verb } from './verb';

describe('Verb', () => {
  it('should create an instance', () => {
    const verb: Verb = {
      id: 'http://adlnet.gov/expapi/verbs/answered',
      display: {
        en: 'answered',
      },
    };

    expect(verb).toBeTruthy();
  });
});
