import { About } from './about';

describe('About', () => {
  it('should create an instance', () => {
    const about: About = {
      version: ['1.0.0', '1.0.1', '1.0.2', '1.0.3'],
      extensions: {
        'https://learning.dev/lrs': true,
      },
    };

    expect(about).toBeTruthy();
  });
});
