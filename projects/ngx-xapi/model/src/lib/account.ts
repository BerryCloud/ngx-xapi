/**
 * This interface represents the xAPI Account object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#2424-account-object | xAPI Account }
 */
export interface Account {
  /**
   * The canonical home page for the system the account is on.
   */
  homePage: string;

  /**
   * The unique id or name used to log in to this account.
   */
  name: string;
}
