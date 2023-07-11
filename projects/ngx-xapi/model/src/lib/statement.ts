import { Activity } from './activity';
import { Actor, Group } from './actor';
import { Attachment } from './attachment';
import { Extensions } from './extensions';
import { Result } from './result';
import { Verb } from './verb';

<<<<<<< HEAD
/**
 * This interface represents the xAPI Statement Reference object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#statement-references">xAPI
 *      Statement Reference</a>
 */
export interface StatementReference {
  /**
   * Mandatory. The type of the Statement Reference. Must be set to "StatementRef".
   */
  objectType: 'StatementRef';

  /**
   * The UUID of a Statement.
   */
  id: string; // UUID
}

/**
 * This interface represents the xAPI Context Activities object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#2462-contextactivities-property">xAPI
 *      Context Activities</a>
 */
export interface ContextActivities {
  /**
   * Activity with a direct relation to the Activity which is the Object of the Statement.
   */
  parent?: Activity[];

  /**
   * Activities with an indirect relation to the Activity which is the Object of the Statement.
   */
  grouping?: Activity[];

  /**
   * Activities used to categorize the Statement.
   */
  category?: Activity[];

  /**
   * Activities that do not fit one of the other properties.
   */
  other?: Activity[];
}

/**
 * This interface represents the xAPI Context object.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#context">xAPI
 *      Context</a>
 */
export interface Context {
  /**
   * The registration that the Statement is associated with.
   */
  registration?: string; // UUID

  /**
   * Instructor that the Statement relates to, if not included as the Actor of the Statement.
   */
  instructor?: Actor;

  /**
   * Team that this Statement relates to, if not included as the Actor of the Statement.
   */
  team?: Group;

  /**
   * A map of the types of learning activity context that this Statement is related to.
   */
  contextActivities?: ContextActivities;

  /**
   * Revision of the learning activity associated with this Statement. Format is free.
   */
  revision?: string;

  /**
   * Platform used in the experience of this learning activity.
   */
  platform?: string;

  /**
   * The language in which the experience being recorded in this Statement (mainly) occurred in.
   */
  language?: string;

  /**
   * Another Statement to be considered as context for this Statement.
   */
  statement?: StatementReference;

  extensions?: Extensions;
}

/**
 * This interface represents the xAPI Statement object.
 *
 * @see <a href=
 *      "https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#statement-properties">xAPI
 *      Statement</a>
 */
=======
export interface StatementReference {
  objectType: 'StatementRef';
  id: string; // UUID
}

export interface ContextActivities {
  parent?: Activity[];
  grouping?: Activity[];
  category?: Activity[];
  other?: Activity[];
}

export interface Context {
  registration?: string; // UUID
  instructor?: Actor;
  team?: Group;
  contextActivities?: ContextActivities;
  revision?: string;
  platform?: string;
  language?: string;
  statement?: StatementReference;
  extensions?: Extensions;
}

>>>>>>> refs/remotes/origin/main
export interface Statement {
  /**
   * UUID assigned by LRS if not set by the Learning Record Provider.
   */
  id?: string; // UUID

  /**
   * Whom the Statement is about, as an Agent or Group Object.
   */
  actor: Actor;

  /**
   * Action taken by the Actor.
   */
  verb: Verb;
<<<<<<< HEAD

  /**
   * Activity, Actor, or another Statement that is the Object of the Statement.
   */
  object: Activity | StatementReference | Actor | SubStatement;

  /**
   * Result Object, further details representing a measured outcome.
   */
=======
  object: Activity | StatementReference | Actor | SubStatement;
>>>>>>> refs/remotes/origin/main
  result?: Result;

  /**
   * Context that gives the Statement more meaning.
   */
  context?: Context;

  /**
   * Timestamp of when the events described within this Statement occurred.
   */
  timestamp?: string; // Timestamp
  stored?: string; // Timestamp
  authority?: Actor;
  attachments?: Attachment[];
}

<<<<<<< HEAD
  /**
   * Timestamp of when this Statement was recorded.
   */
  stored?: string; // Timestamp

  /**
   * Agent or Group who is asserting this Statement is true.
   */
  authority?: Actor;

  /**
   * The Statement’s associated xAPI version.
   */
  version?: string;

  /**
   * Headers for Attachments to the Statement.
   */
  attachments?: Attachment[];
}

/**
 * This interface represents the xAPI SubStatement object.
 *
 * @see <a href="https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#substatements">xAPI
 *      SubStatement</a>
 */
=======
>>>>>>> refs/remotes/origin/main
export interface SubStatement extends Statement {
  objectType: 'SubStatement';
  object: Activity | StatementReference | Actor;
}
