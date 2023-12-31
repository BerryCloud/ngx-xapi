import { Agent } from '@berry-cloud/ngx-xapi/model';

export interface AgentProfileParams {
  agent: Agent;
  profileId: string;
}

export interface AgentProfilesParams {
  agent: Agent;
  since?: string;
}
