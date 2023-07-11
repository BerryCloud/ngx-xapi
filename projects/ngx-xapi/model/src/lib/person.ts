import { Account } from './account';

export interface Person {
  objectType: 'Person';
  name?: string[];

  mbox?: string[];
  mbox_sha1sum?: string[];
  openid?: string[];
  account?: Account[];
}
