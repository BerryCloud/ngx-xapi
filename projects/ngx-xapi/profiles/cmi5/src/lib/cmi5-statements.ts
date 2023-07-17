import {
  Activity,
  Agent,
  Extensions,
  Statement,
  Verb,
  initialized,
  launched,
} from '@berry-cloud/ngx-xapi/model';
import { v4 as uuidv4 } from 'uuid';
import { LaunchMode, MoveOn } from './launch-data';

export class Cmi5Statements {
  static readonly cmi5: string =
    'https://w3id.org/xapi/cmi5/context/categories/cmi5';

  static readonly moveOn: string =
    'https://w3id.org/xapi/cmi5/context/categories/moveon';

  static readonly sessionId: string =
    'https://w3id.org/xapi/cmi5/context/extensions/sessionid';

  static readonly masteryScore: string =
    'https://w3id.org/xapi/cmi5/context/extensions/masteryscore';

  static readonly launchMode: string =
    'https://w3id.org/xapi/cmi5/context/extensions/launchmode';

  static readonly launchUrl: string =
    'https://w3id.org/xapi/cmi5/context/extensions/launchurl';

  static readonly launchParameters: string =
    'https://w3id.org/xapi/cmi5/context/extensions/launchparameters';

  /**
   * Returns a cmi5 launched statement.
   *
   * @param agent that launched the activity
   * @param activity that is being launched
   * @param extensions of the statement
   * @param publisherActivity of the activity that is being launched
   * @param timestamp of when the activity was launched
   * @param registration of activity that is being launched
   * @returns a cmi5 launched statement
   */
  static launched(
    agent: Agent,
    activity: Activity,
    extensions: {
      sessionId: string;
      launchMode: LaunchMode;
      launchUrl: string;
      moveOn: MoveOn;
      masteryScore?: number;
      launchParameters?: string;
    },
    publisherActivity: Activity,
    registration: string,
    timestamp?: Date
  ): Statement {
    return this.statement(
      launched,
      agent,
      activity,
      extensions,
      publisherActivity,
      registration,
      timestamp
    );
  }

  /**
   * Returns a cmi5 initialized statement.
   *
   * @param agent that initialized the activity
   * @param activity that has been initialized
   * @param extensions of the statement
   * @param publisherActivity of the activity that has been initialized
   * @param timestamp of when the activity was initialized
   * @param registration of activity that has been initialized
   * @returns a cmi5 initialized statement
   */
  static initialized(
    agent: Agent,
    activity: Activity,
    extensions: {
      sessionId: string;
      masteryScore?: number;
    },
    publisherActivity: Activity,
    registration: string,
    timestamp?: Date
  ): Statement {
    return this.statement(
      initialized,
      agent,
      activity,
      extensions,
      publisherActivity,
      registration,
      timestamp
    );
  }

  private static statement(
    verb: Verb,
    agent: Agent,
    activity: Activity,
    extensions: {
      sessionId: string;
      launchMode?: LaunchMode;
      launchUrl?: string;
      moveOn?: MoveOn;
      masteryScore?: number;
      launchParameters?: string;
    },
    publisherActivity: Activity,
    registration: string,
    timestamp?: Date
  ): Statement {
    const statement: Statement = {
      id: uuidv4().toString(),
      actor: agent,
      verb,
      object: activity,
      timestamp: timestamp?.toISOString() || new Date().toISOString(),

      context: {
        registration,

        contextActivities: {
          grouping: [publisherActivity],
          category: [
            {
              objectType: 'Activity',
              id: this.cmi5,
            },
          ],
        },

        extensions: this.process(extensions),
      },
    };
    return statement;
  }

  private static process(extensions: {
    sessionId: string;
    launchMode?: LaunchMode;
    launchUrl?: string;
    moveOn?: MoveOn;
    masteryScore?: number;
    launchParameters?: string;
  }): Extensions {
    // Session ID is the only mandatory extension
    const temp: Extensions = { [this.sessionId]: extensions.sessionId };

    if (extensions.launchMode) {
      temp[this.launchMode] = extensions.launchMode;
    }

    if (extensions.launchUrl) {
      temp[this.launchUrl] = extensions.launchUrl;
    }

    if (extensions.moveOn) {
      temp[this.moveOn] = extensions.moveOn;
    }

    if (extensions.masteryScore) {
      temp[this.masteryScore] = extensions.masteryScore;
    }

    if (extensions.launchParameters) {
      temp[this.launchParameters] = extensions.launchParameters;
    }

    return temp;
  }
}
