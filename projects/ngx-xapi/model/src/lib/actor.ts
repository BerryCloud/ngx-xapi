import { Account } from './account';

type ActorType = {
  objectType?: string;
  name?: string;
};

type IdentifiedActor =
  | {
      mbox: `mailto:${string}`;
      mbox_sha1sum?: undefined;
      openid?: undefined;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      mbox_sha1sum: string;
      openid?: undefined;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      mbox_sha1sum?: undefined;
      openid: string;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      mbox_sha1sum?: undefined;
      openid?: undefined;
      account: Account;
    };

/**
 * An Agent (an individual) is a persona or system.
 */
export type Agent = ActorType & IdentifiedActor & { objectType?: 'Agent' };

/**
 * An Anonymous Group is used to describe a cluster of people where there is
 * no ready identifier for this cluster, e.g. an ad hoc team.
 */
export type AnonymousGroup = ActorType & {
  objectType: 'Group';
  member: Agent[];
};

/**
 * An Identified Group is used to uniquely identify a cluster of Agents.
 */
export type IdentifiedGroup = ActorType &
  IdentifiedActor & {
    objectType: 'Group';
    member?: Agent[];
  };

/**
 * A Group represents a collection of Agents and can be used in most of the
 * same situations an Agent can be used. There are two types of Groups:
 * Anonymous Groups and Identified Groups.
 */
export type Group = AnonymousGroup | IdentifiedGroup;

/**
 * The Actor defines who performed the action. The Actor of a Statement can be
 * an Agent or a Group.
 */
export type Actor = Agent | Group;
