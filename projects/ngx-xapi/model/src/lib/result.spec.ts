import { Result } from './result';

describe('Result', () => {
  it('should create an instance', () => {
    const result: Result = {
      score: {
        scaled: 0.5,
        raw: 50,
        min: 0,
        max: 100,
      },
      success: true,
      completion: true,
      response: 'Example Response',
      duration: 'PT1H',
      extensions: {
        'https://learning.dev/lrs': true,
      },
    };

    expect(result).toBeTruthy();
  });
});
