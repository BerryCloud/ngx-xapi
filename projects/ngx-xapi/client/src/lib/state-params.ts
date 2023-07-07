import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface StateParams {
  activityId: string;
  agent: Agent;
  stateId: string;
  registration?: string;
}
