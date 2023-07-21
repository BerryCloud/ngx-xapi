import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Activity,
  ActivityDefinition,
  Actor,
  Context,
  Statement,
  XapiClient,
  completed,
} from '@berry-cloud/ngx-xapi';
import { Observable, filter, map, take } from 'rxjs';

export class XapiCourseService {
  public client: XapiClient;
  private course: Activity;
  private context?: Context;

  constructor(
    private httpClient: HttpClient,
    endpoint: string,
    authorization: string,
    private actor: Actor,
    activityId: string,
    private registration?: string
  ) {
    this.client = new XapiClient(this.httpClient, {
      endpoint,
      authorization,
    });
    this.course = {
      id: activityId,
    };
  }

  setCourseDefinition(courseDefinition: ActivityDefinition) {
    this.course.definition = courseDefinition;
  }

  getXapiClient() {
    return this.client;
  }

  postCompletedStatement() {
    return this.postStatement({ verb: completed });
  }

  postStatement(statement: Partial<Statement>) {
    return this.client.postStatement(this.fillStatement(statement));
  }

  private fillStatement(partial: Partial<Statement>): Statement {
    const statement = { ...partial };
    if (!statement.verb) {
      throw new Error('statement.verb is required');
    }
    if (!statement.actor) {
      statement.actor = this.actor;
    }
    if (!statement.object) {
      statement.object = this.course;
    }
    if (!statement.context) {
      statement.context = this.context ?? {};
    }
    if (!statement.context.registration && this.registration) {
      statement.context.registration = this.registration;
    }

    return statement as Statement;
  }
}

export function xapiCourseServiceFactory(
  httpClient: HttpClient,
  activatedRoute: ActivatedRoute
): Observable<XapiCourseService> {
  return activatedRoute.queryParams.pipe(
    filter(
      (params: Params) =>
        params['endpoint'] &&
        params['auth'] &&
        params['actor'] &&
        params['activityId']
    ),
    map(
      (params: Params) =>
        new XapiCourseService(
          httpClient,
          params['endpoint'],
          params['auth'],
          JSON.parse(params['actor']),
          params['activityId'],
          params['registration']
        )
    ),
    take(1)
  );
}
