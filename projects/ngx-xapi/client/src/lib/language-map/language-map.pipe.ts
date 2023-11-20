import {
  Inject,
  InjectionToken,
  LOCALE_ID,
  Optional,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { LanguageMap } from '@berry-cloud/ngx-xapi/model';
import { formatLanguageMap } from './format-language-map';

/**
 * An optional injection token to override the default angular LOCALE_ID used by the language map pipe.
 */
export declare const LANGUAGE_MAP_LOCALE_ID: InjectionToken<string>;

/**
 * This pipe transforms the parameter (potentially a language map) into a string.
 *
 * @remarks
 * If the parameter is a string, it is returned as is.
 *
 * If the parameter is a language map, the most appropriate value is returned.
 *
 * If the parameter is an array of language maps, the most appropriate value of each language map is concatenated.
 *
 * If the parameter is an array of strings, the strings are concatenated.
 *
 * If the parameter is an array of language maps and strings, the most appropriate value of each language map and the strings are concatenated.
 *
 * @param parameter a string or a language map or an array of language maps or an array of strings
 * @param htmlConversion if true, the spaces and new lines in the returned string are converted to HTML tags
 *
 * @returns a string
 *
 * @example
 * <p>{{ 'Hello World' | languageMap }}</p>
 * <p>{{ { en: 'Hello World' } | languageMap }}</p>
 * <p>{{ { en: 'Hello World', fr: 'Bonjour le monde' } | languageMap:false }}</p>
 *
 */
@Pipe({
  name: 'languageMap',
})
export class LanguageMapPipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(LANGUAGE_MAP_LOCALE_ID) private lmLocale?: string
  ) {}

  transform(
    parameter: string | LanguageMap | (string | LanguageMap)[] | undefined,
    htmlConversion = true
  ): string | null {
    if (typeof parameter == 'string') {
      return parameter;
    }
    if (!parameter || Object.keys(parameter).length === 0) {
      return null;
    }
    let text = '';
    if (Array.isArray(parameter)) {
      if (parameter.length == 0) {
        return null;
      }
      for (const lm of parameter) {
        text += this.transform(lm);
      }
    } else if (!!this.lmLocale) {
      text = formatLanguageMap(parameter, this.lmLocale);
    } else {
      text = formatLanguageMap(parameter, this.locale);
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
