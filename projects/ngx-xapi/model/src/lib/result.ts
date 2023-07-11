import { Extensions } from './extensions';

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

export interface Result {
  score?: Score;
  success?: boolean;
  completion?: boolean;
  response?: string;
  duration?: string; // This should be a duration
  extensions?: Extensions;
}
