import { Activity } from './activity';

export interface ContextActivities {
  parent?: Activity[];
  grouping?: Activity[];
  category?: Activity[];
  other?: Activity[];
}
