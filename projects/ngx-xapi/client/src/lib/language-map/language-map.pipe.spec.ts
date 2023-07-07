import { LanguageMap } from 'ngx-xapi/model';
import { LanguageMapPipe } from './language-map.pipe';

describe('LanguageMapPipe', () => {
  it('create an instance', () => {
    const pipe = new LanguageMapPipe('');
    expect(pipe).toBeTruthy();
  });

  describe('Given instance with en-US locale', () => {
    const pipe = new LanguageMapPipe('en-US');

    it('Then result is color', () => {
      const languageMap: LanguageMap = { 'en-US': 'color' };

      expect(pipe.transform(languageMap)).toBe('color');
    });
  }),
    describe('Given instance with en-GB locale', () => {
      const pipe = new LanguageMapPipe('en-GB');

      it('result is color', () => {
        const languageMap: LanguageMap = { 'en-US': 'color' };

        expect(pipe.transform(languageMap)).toBe('color');
      });

      it('result is colour', () => {
        const languageMap: LanguageMap = {
          'en-US': 'color',
          'en-GB': 'colour',
        };

        expect(pipe.transform(languageMap)).toBe('colour');
      });

      it('result is null', () => {
        expect(pipe.transform(undefined)).toBeNull();
      });

      it('result is null', () => {
        expect(pipe.transform({})).toBeNull();
      });
    });
});
