import { Context } from '@berry-cloud/ngx-xapi/model';

export interface LaunchData {
  contextTemplate: Context;
  launchMode: LaunchMode;
  launchParameters?: string;
  masteryScore?: number;
  moveOn: MoveOn;
  returnURL?: string;

  /**
   * Only if an entitlementKey is present in the Course Structure for the AU.
   */
  entitlementKey?: EntitlementKey;
}

export type LaunchMode = 'Normal' | 'Browse' | 'Review';

export type MoveOn =
  | 'Passed'
  | 'Completed'
  | 'CompletedAndPassed'
  | 'CompletedOrPassed'
  | 'NotApplicable';

export interface EntitlementKey {
  courseStructure: string;
  alternate?: string;
}

// TODO move somewhere else
export type LaunchMethod = 'OwnWindow' | 'AnyWindow';
