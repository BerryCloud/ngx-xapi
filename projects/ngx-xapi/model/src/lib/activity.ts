import { ActivityDefinition } from './activity-definition';
import { StatementObject } from './statement-object';

export interface Activity extends StatementObject {
  id: string; // Should be IRI
  definition?: ActivityDefinition;
}
