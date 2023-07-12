/**
 * This interface represents the xAPI Extensions object.
 *
 * @remarks
 * Extensions are available as part of Activity Definitions, as part of a Statement's "context"
 *  property, or as part of a Statement's "result" property. In each case, extensions are intended
 *  to provide a natural way to extend those properties for some specialized use. The contents of
 * these extensions might be something valuable to just one application, or it might be a
 * convention used by an entire Community of Practice.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#41-extensions | xAPI Extensions}
 */
export interface Extensions {
  [key: string]: any;
}
