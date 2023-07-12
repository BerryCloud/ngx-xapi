import { LanguageMap } from '@berry-cloud/ngx-xapi/model';

/**
 * Calculates the most appropriate language map value for the given locale.
 *
 * The algorithm is as follows:
 * 1. If the locale is found in the language map, return the value.
 * 2. If the locale has a subtag, remove the subtag and try again.
 * 3. If the UND locale is found in the language map, return the value.
 * 4. Return the first value in the language map or an empty string.
 *
 * @param languageMap a language map
 * @param locale the preferred locale
 * @returns the most appropriate language map value
 */
export function formatLanguageMap(
  languageMap: LanguageMap,
  locale: string
): string {
  // Return preferred if possible
  let preferred = languageMap[locale];
  if (preferred) {
    return preferred;
  }

  const pos = locale.indexOf('-');
  if (pos != -1) {
    const lang = locale.substring(0, pos);
    preferred = languageMap[lang];
    if (preferred) {
      return preferred;
    }
  }

  // If preferred is not found return UND
  const und = languageMap['und'];
  if (und) {
    return und;
  }

  // Fallback to returning first value or empty string
  return Object.values(languageMap)[0] || '';
}
