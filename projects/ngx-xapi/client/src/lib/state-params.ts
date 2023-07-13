import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface StatesParams {
  activityId: string;
  agent: Agent;
  registration?: string;
  stateId?: string;
  since?: string;
}

export interface StateParams extends StatesParams {
  stateId: string;
  since?: undefined;
}

export interface DeleteStatesParams extends StatesParams {
  stateId?: undefined;
  since?: undefined;
}

export interface GetStatesParams extends StatesParams {
  stateId?: undefined;
}
