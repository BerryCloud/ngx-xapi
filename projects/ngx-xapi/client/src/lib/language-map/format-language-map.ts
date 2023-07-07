import { LanguageMap } from '@berry-cloud/ngx-xapi/model';

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
