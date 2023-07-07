import { ContextActivities } from './context-activities';
import { Extensions } from './extensions';
import { Group } from './group';
import { StatementReference } from './statement-reference';

export interface Context {
  registration?: string; // UUID
  // TODO add optional instructor
  team?: Group;
  contextActivities?: ContextActivities;
  revision?: string;
  platform?: string;
  language?: string;
  statement?: StatementReference;
  extensions?: Extensions;
}
