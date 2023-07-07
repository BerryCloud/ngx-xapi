/**
 * The Actor defines who performed the action. The Actor of a Statement can be
 * an Agent or a Group.
 */
export interface Actor {
  objectType?: string;
  name?: string;

  mbox?: string;
  mbox_sha1sum?: string;
  openid?: string;
  account?: { name: string; homePage: string };
}
