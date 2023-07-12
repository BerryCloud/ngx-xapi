import { Account } from './account';

type ActorType = {
  objectType?: string;

  /**
   * Name of the Agent or Group.
   */
  name?: string;
};

type IdentifiedActor =
  | {
      /**
       * An email address. The required format is "mailto:email address".
       */
      mbox: `mailto:${string}`;
      mbox_sha1sum?: undefined;
      openid?: undefined;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      /**
       * Hex-encoded SHA1 hash of a mailto IRI.
       */
      mbox_sha1sum: string;
      openid?: undefined;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      mbox_sha1sum?: undefined;
      /**
       * An openID.
       */
      openid: string;
      account?: undefined;
    }
  | {
      mbox?: undefined;
      mbox_sha1sum?: undefined;
      openid?: undefined;
      /**
       * An account on an existing system e.g. an LMS or intranet.
       */
      account: Account;
    };

/**
 * This type represents the xAPI Agent object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#agent | xAPI Agent}
 */
export type Agent = ActorType &
  IdentifiedActor & {
    /**
     * This property is optional except when the Agent is used as a Statement's object.
     */
    objectType?: 'Agent';
  };

/**
 * Sub-type for the Anonymous Group.
 *
 * @remarks
 * An Anonymous Group is used to describe a cluster of people where there is
 * no ready identifier for this cluster, e.g. an ad hoc team.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#requirements-for-anonymous-groups | Requirements for Anonymous Groups}
 */
export type AnonymousGroup = ActorType & {
  /**
   * Mandatory property for Groups.
   */
  objectType: 'Group';

  /**
   * The members of this Group. This is an unordered list.
   */
  member: Agent[];
};

/**
 * Sub-type for the Identified Group.
 *
 * @remarks
 * An Identified Group is used to uniquely identify a cluster of Agents.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#requirements-for-identified-groups | Requirements for Identified Groups}
 */
export type IdentifiedGroup = ActorType &
  IdentifiedActor & {
    /**
     * Mandatory property for Groups.
     */
    objectType: 'Group';
    /**
     * The members of this Group. This is an unordered list.
     */
    member?: Agent[];
  };

/**
 * This type represents the xAPI Group object.
 *
 * @remarks
 * A Group is used to identify a set of Agents. A Group can be anonymous or identified.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#group | xAPI Group}
 */
export type Group = AnonymousGroup | IdentifiedGroup;

/**
 * This class represents the xAPI Actor object.
 *
 * @remarks
 * An Actor is used to identify the Agent or Group that performed the action.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#actor | xAPI Actor}
 */
export type Actor = Agent | Group;
