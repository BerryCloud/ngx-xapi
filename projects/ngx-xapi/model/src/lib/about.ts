import { Extensions } from './extensions';

/**
 * This interface represents the xAPI About object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#24-agents-resource | xAPI About}
 */
export interface About {
  version: string[];
  extensions?: Extensions;
}
