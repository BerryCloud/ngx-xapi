import { Agent } from './actor';
import { Activity } from './activity';
import { Actor, Group } from './actor';
import { Attachment } from './attachment';
import { Extensions } from './extensions';
import { Result } from './result';
import { Verb } from './verb';

/**
 * This interface represents the xAPI Statement Reference object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#statement-references | xAPI Statement Reference}
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
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#2462-contextactivities-property | xAPI Context Activities}
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
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#context | xAPI Context}
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
  language?: Exclude<string, 'und' | 'Und' | 'UND'>;

  /**
   * Another Statement to be considered as context for this Statement.
   */
  statement?: StatementReference;

  extensions?: Extensions;
}

/**
 * This interface represents the xAPI Statement object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#statement-properties | xAPI Statement}
 */
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

  /**
   * Activity, Actor, or another Statement that is the Object of the Statement.
   */
  object:
    | Activity
    | StatementReference
    | SubStatement
    | Group
    | (Agent & { objectType: 'Agent' });

  /**
   * Result Object, further details representing a measured outcome.
   */
  result?: Result;

  /**
   * Context that gives the Statement more meaning.
   */
  context?: Context;

  /**
   * Timestamp of when the events described within this Statement occurred.
   */
  timestamp?: string; // Timestamp

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
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#substatements | xAPI SubStatement}
 */
export interface SubStatement extends Statement {
  objectType: 'SubStatement';
  object:
    | Activity
    | StatementReference
    | Group
    | (Agent & { objectType: 'Agent' });
}
