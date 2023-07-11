import { Account } from './account';

type ActorType = {
  objectType?: string;
<<<<<<< HEAD

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
      mbox: string;
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
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#agent">xAPI Agent</a>
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
 * <p>
 * An Anonymous Group is used to describe a cluster of people where there is
 * no ready identifier for this cluster, e.g. an ad hoc team.
 * </p>
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#requirements-for-anonymous-groups">
 * Requirements for Anonymous Groups</a>
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
 * <p>
 * An Identified Group is used to uniquely identify a cluster of Agents.
 * </p>
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#requirements-for-identified-groups">
 * Requirements for Identified  Groups</a>
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
 * <p>
 * A Group is used to identify a set of Agents. A Group can be anonymous or identified.
 * </p>
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#group">xAPI Group</a>
 */
export type Group = AnonymousGroup | IdentifiedGroup;

/**
 * This class represents the xAPI Actor object.
 * <p>
 * An Actor is used to identify the Agent or Group that performed the action.
 * </p>
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#actor">xAPI Actor</a>
=======
  name?: string;
};

type IdentifiedActor =
  | {
      mbox: string;
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
>>>>>>> refs/remotes/origin/main
 */
export type Actor = Agent | Group;
