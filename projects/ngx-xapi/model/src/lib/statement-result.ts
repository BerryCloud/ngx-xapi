import { Statement } from './statement';

/**
 * This interface represents the xAPI Statement Result object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#25-retrieval-of-statements | xAPI Statement Result}
 */
export interface StatementResult {
  /**
   * List of Statements. Where no matching Statements are found, this property will contain an empty
   * array.
   */
  statements: Statement[];

  /**
   * Relative IRL that can be used to fetch more results.
   */
  more: string | null; // IRL
}
