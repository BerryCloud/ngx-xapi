import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { LanguageMap } from 'ngx-xapi/model';
import { formatLanguageMap } from './format-language-map';

@Pipe({
  name: 'languageMap',
})
export class LanguageMapPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(
    languageMap: string | LanguageMap | (string | LanguageMap)[] | undefined,
    htmlConversion = true
  ): string | null {
    if (typeof languageMap == 'string') {
      return languageMap;
    }
    if (!languageMap || Object.keys(languageMap).length === 0) {
      return null;
    }
    let text = '';
    if (Array.isArray(languageMap)) {
      if (languageMap.length == 0) {
        return null;
      }
      for (const lm of languageMap) {
        text += this.transform(lm);
      }
    } else {
      text = formatLanguageMap(languageMap, this.locale);
    }

    if (htmlConversion) {
      text = text.replace(/ {2}/g, ' &nbsp');
      text = text.replace(/\r\n/g, '<br>');
      text = text.replace(/\r/g, '<br>');
      text = text.replace(/\n/g, '<br>');
    }
    return text;
  }
}
