import { Activity } from './activity';
import { Actor, Group } from './actor';
import { Attachment } from './attachment';
import { Extensions } from './extensions';
import { Result } from './result';
import { Verb } from './verb';

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

export interface Statement {
  id?: string; // UUID
  actor: Actor;
  verb: Verb;
  object: Activity | StatementReference | Actor | SubStatement;
  result?: Result;
  context?: Context;
  timestamp?: string; // Timestamp
  stored?: string; // Timestamp
  authority?: Actor;
  attachments?: Attachment[];
}

export interface SubStatement extends Statement {
  object: Activity | StatementReference | Actor;
}
