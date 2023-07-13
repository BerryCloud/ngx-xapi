import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface StatesParams {
  activityId: string;
  agent: Agent;
  registration?: string;
  stateId?: string;
  since?: string;
}

export type StateParams = Omit<StatesParams, 'since'> & { stateId: string };

export type DeleteStatesParams = Omit<StatesParams, 'since' | 'stateId'>;

export type GetStatesParams = Omit<StatesParams, 'stateId'>;
