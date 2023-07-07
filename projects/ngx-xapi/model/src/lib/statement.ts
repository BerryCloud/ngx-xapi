import { Activity } from './activity';
import { Actor } from './actor';
import { Context } from './context';
import { Result } from './result';
import { Verb } from './verb';

export interface Statement {
  id?: string; // UUID
  actor: Actor;
  verb: Verb;
  object: Activity; // TODO add other types
  result?: Result;
  context?: Context;
  timestamp?: string; // Timestamp

  // TODO add other properties
}
