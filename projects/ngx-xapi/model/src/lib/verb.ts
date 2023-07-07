import { LanguageMap } from './language-map';

export interface Verb {
  id: string; // Should be IRI

  display?: LanguageMap;
}
