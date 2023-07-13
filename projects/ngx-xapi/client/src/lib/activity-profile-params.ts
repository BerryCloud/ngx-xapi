import { Activity } from 'projects/ngx-xapi/model';

export interface ActivityProfileParams {
  activityId: Activity;
  profileId: string;
}

export interface ActivityProfilesParams {
  activityId: Activity;
  since?: string;
}
