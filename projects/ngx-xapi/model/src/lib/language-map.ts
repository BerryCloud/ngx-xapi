/**
 * A language map is a dictionary where the key is a RFC 5646 Language Tag, and the value is a
 * string in the language specified in the tag.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#lang-maps">Language
 *      Maps</a>
 */
export interface LanguageMap {
  [key: string]: string;
}
