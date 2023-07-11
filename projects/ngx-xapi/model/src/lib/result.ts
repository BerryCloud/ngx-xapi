import { Extensions } from './extensions';

/**
 * This interface represents the xAPI Score object.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#2451-score">xAPI
 *      Score</a>
 */
export interface Score {
  /**
   * The score related to the experience as modified by scaling and/or
   * normalization.
   */
  scaled?: number;

  /**
   * The score achieved by the Actor in the experience described by the
   * Statement. This is not modified by any scaling or normalization.
   */
  raw?: number;

  /**
   * The lowest possible score for the experience described by the Statement.
   */
  min?: number;

  /**
   * The highest possible score for the experience described by the Statement.
   */
  max?: number;
}

/**
 * This interface represents the xAPI Result object.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#result">xAPI
 *      Result</a>
 */
export interface Result {
  /**
   * The score of the Agent in relation to the success or quality of the experience.
   */
  score?: Score;

  /**
   * Indicates whether or not the attempt on the Activity was successful.
   */
  success?: boolean;

  /**
   * Indicates whether or not the Activity was completed.
   */
  completion?: boolean;

  /**
   * A response appropriately formatted for the given Activity.
   */
  response?: string;

  /**
   * Period of time over which the Statement occurred.
   */
  duration?: string; // This should be a duration

  extensions?: Extensions;
}
