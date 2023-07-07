import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface StatementsParams {
  agent?: Agent; // TODO could be an identified group
  verb?: string; // IRI
  activity?: string; // IRI
  registration?: string; // UUID
  relatedActivities?: boolean;
  relatedAgents?: boolean;
  since?: string; // ISO 8601 date time
  until?: string; // ISO 8601 date time
  limit?: number;
  format?: StatementFormat; // ids, exact, canonical
  attachments?: boolean;
  ascending?: boolean;
}

export enum StatementFormat {
  TrueFalse = 'ids',
  Choice = 'exact',
  FillIn = 'canonical',
}
