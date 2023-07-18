import { Actor } from '@berry-cloud/ngx-xapi/model';

export interface Launch {
  endpoint: string; // URL
  fetch: string; // URL
  actor: Actor; // Agent
  registration: string; // UUID
  activityId: string; // URL
}
