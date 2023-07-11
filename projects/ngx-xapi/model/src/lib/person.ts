import { Account } from './account';

<<<<<<< HEAD
/**
 * This interface represents the xAPI Person object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#person-properties">xAPI
 *      Person</a>
 */
export interface Person {
  objectType: 'Person';
  /**
   * List of names.
   */
  name?: string[];

  /**
   * List of e-mail addresses.
   */
  mbox?: string[];

  /**
   * List of the SHA1 hashes of mailto IRIs.
   */
  mbox_sha1sum?: string[];

  /**
   * List of openids that uniquely identify the Agents retrieved.
   */
  openid?: string[];

  /**
   * List of accounts.
   */
=======
export interface Person {
  objectType: 'Person';
  name?: string[];

  mbox?: string[];
  mbox_sha1sum?: string[];
  openid?: string[];
>>>>>>> refs/remotes/origin/main
  account?: Account[];
}
