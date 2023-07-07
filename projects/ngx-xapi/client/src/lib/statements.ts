import { v4 as uuidv4 } from 'uuid';
import { Verbs } from './verbs';
import {
  Activity,
  Agent,
  Context,
  Statement,
  Verb,
} from '@berry-cloud/ngx-xapi/model';

export class Statements {
  /**
   * Returns a registered statement
   *
   * @param agent that registered the activity
   * @param activity that is being registered
   * @param timestamp of when the activity was registered
   * @param registration of activity that is being registered
   * @returns registered statement
   */
  static registered(
    agent: Agent,
    activity: Activity,
    registration: string,
    timestamp?: Date
  ): Statement {
    return {
      id: uuidv4().toString(), // Registration might not be unique
      actor: agent,
      verb: Verbs.registered,
      object: activity,
      timestamp: timestamp?.toISOString() || new Date().toISOString(),
      context: { registration },
    };
  }

  /**
   * Returns a initialized statement
   *
   * @param agent that initialized the activity
   * @param activity that is being initialized
   * @param timestamp of when the activity was initialized
   * @param registration of activity that is being initialized
   * @returns initialized statement
   */
  static initialized(
    agent: Agent,
    activity: Activity,
    context?: Context,
    timestamp?: Date,
    registration?: string
  ): Statement {
    return this.statement(
      agent,
      Verbs.initialized,
      activity,
      context,
      registration,
      timestamp
    );
  }

  /**
   * Returns a completed statement
   *
   * @param agent that completed the activity
   * @param activity that is being completed
   * @param duration of the activity
   * @param timestamp of when the activity was completed
   * @param registration of activity that is being completed
   * @returns completed statement
   */
  static completed(
    agent: Agent,
    activity: Activity,
    duration: string,
    context?: Context,
    timestamp?: Date,
    registration?: string
  ): Statement {
    const statement = this.statement(
      agent,
      Verbs.completed,
      activity,
      context,
      registration,
      timestamp
    );

    statement.result = { completion: true, duration };

    return statement;
  }

  /**
   * Returns a terminated statement
   *
   * @param agent that terminated the activity
   * @param activity that is being terminated
   * @param duration of the activity
   * @param timestamp of when the activity was terminated
   * @param registration of activity that is being terminated
   * @returns terminated statement
   */
  static terminated(
    agent: Agent,
    activity: Activity,
    duration: string,
    context?: Context,
    timestamp?: Date,
    registration?: string
  ): Statement {
    const statement = this.statement(
      agent,
      Verbs.terminated,
      activity,
      context,
      registration,
      timestamp
    );

    statement.result = { duration };

    return statement;
  }

  /**
   * Returns a progress statement
   *
   * @param agent that progressed the activity
   * @param activity that is being progressed
   * @param progress of the activity
   * @param timestamp of when the activity was progressed
   * @param registration of activity that is being progressed
   * @returns progress statement
   */
  static progress(
    agent: Agent,
    activity: Activity,
    progress: number,
    timestamp?: Date,
    context?: Context,
    registration?: string
  ): Statement {
    const statement = this.statement(
      agent,
      Verbs.progressed,
      activity,
      context,
      registration,
      timestamp
    );

    statement.result = {
      extensions: {
        'https://w3id.org/xapi/cmi5/result/extensions/progress': progress,
      },
    };

    return statement;
  }

  // TODO
  static passed(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static failed(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static abandoned(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static waived(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static reason(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static answered(): Statement {
    throw new Error('Method not implemented.');
  }

  // TODO
  static experienced(): Statement {
    throw new Error('Method not implemented.');
  }

  private static statement(
    agent: Agent,
    verb: Verb,
    activity: Activity,
    context?: Context,
    registration?: string,
    timestamp?: Date
  ): Statement {
    const statement: Statement = {
      id: uuidv4().toString(),
      actor: agent,
      verb,
      object: activity,
      timestamp: timestamp?.toISOString() || new Date().toISOString(),
    };

    if (context) {
      statement.context = context;
    }

    if (registration) {
      if (statement.context) {
        statement.context = { ...statement.context, registration };
      } else {
        statement.context = { registration };
      }
    }

    return statement;
  }
}
