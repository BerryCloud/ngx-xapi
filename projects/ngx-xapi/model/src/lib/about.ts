import { Extensions } from './extensions';

/**
 * This interface represents the xAPI About object.
 *
 *  @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#24-agents-resource">xAPI
 *      About</a>
 */
export interface About {
  version: string[];
  extensions?: Extensions;
}
