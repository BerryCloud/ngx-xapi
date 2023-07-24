import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface Launch {
  endpoint: string; // URL
  fetch?: string; // URL
  actor: Agent; // Agent
  registration?: string; // UUID
  activityId?: string; // URL
  auth?: string; // Authorization for xAPI
}
