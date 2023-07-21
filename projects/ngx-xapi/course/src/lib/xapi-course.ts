import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Activity,
  ActivityDefinition,
  Agent,
  Context,
  Statement,
  completed,
  initialized,
} from '@berry-cloud/ngx-xapi/model';
import {
  XapiClient,
  StateParams,
  StateOptions,
} from '@berry-cloud/ngx-xapi/client';
import {
  Observable,
  ReplaySubject,
  map,
  merge,
  mergeMap,
  of,
  skip,
  take,
  tap,
} from 'rxjs';
import { v4 } from 'uuid';
import { FetchResult, LaunchData } from '@berry-cloud/ngx-xapi/profiles/cmi5';

export const DEFAULT_STATE_ID = 'state';

export class XapiCourseService {
  public client?: ReplaySubject<XapiClient>;
  private course?: Activity;
  private contextTemplate?: Context;

  private launchData?: LaunchData;

  constructor(
    private httpClient: HttpClient,
    endpoint?: string,
    authorization?: string,
    private agent?: Agent,
    private activityId?: string,
    private registration?: string,
    fetch?: string
  ) {
    if (endpoint && agent && activityId && (authorization || fetch)) {
      this.course = {
        id: activityId,
      };
      this.client = new ReplaySubject<XapiClient>(1);
      if (fetch) {
        // fetch authorization from the LMS
        fetchCmi5Authorization(httpClient, fetch!)
          .pipe(
            // create a client from the authorization token
            map(
              (authorization: string) =>
                new XapiClient(this.httpClient, {
                  endpoint,
                  authorization,
                })
            ),
            // load cmi5 launch data
            mergeMap((client: XapiClient) =>
              this.getCmi5launchData(client).pipe(
                map((launchData: LaunchData) => {
                  this.launchData = launchData;
                  this.contextTemplate = launchData.contextTemplate;
                  return client;
                })
              )
            ),
            // send cmi5 initialized statement
            mergeMap((client: XapiClient) =>
              this.sendCmi5Initialization(client).pipe(
                // initialize client only after the cmi5 initialized statement is sent
                tap(() => {
                  this.client!.next(client);
                })
              )
            )
          )
          // All subsequent observables come from httpClient, so they terminate automatically
          .subscribe();
      } else if (authorization) {
        // initialize only if all required parameters are provided
        this.client!.next(
          new XapiClient(this.httpClient, {
            endpoint,
            authorization,
          })
        );
      }
      this.client!.complete();
    } else if (endpoint || agent || activityId || authorization || fetch) {
      throw new Error(
        'Cannot initialize XapiCourseService. Missing required launch parameters.'
      );
    }
    // If NONE of the launch parameters are provided,
    // we assume that the service is used for testing purposes,
    // (eg. was launched manually from the browser)
    // or was launched from a non-cmi5/non-xapi LMS.
    // In this case, the service will not get/send any statements or states.
  }

  private getCmi5launchData(client: XapiClient): Observable<LaunchData> {
    return client
      .getState<LaunchData>({
        activityId: this.activityId!,
        agent: this.agent!,
        registration: this.registration,
        stateId: 'LMS.LaunchData',
      })
      .pipe(
        map((response: HttpResponse<LaunchData>) => {
          if (response.body) {
            return response.body;
          }
          throw new Error('Cannot fetch cmi5 launch data.');
        })
      );
  }

  private sendCmi5Initialization(
    client: XapiClient
  ): Observable<HttpResponse<any>> {
    return client.postStatement(this.fillStatement({ verb: initialized }));
  }

  setCourseDefinition(courseDefinition: ActivityDefinition) {
    if (this.course) {
      this.course.definition = courseDefinition;
    }
  }

  getXapiClient() {
    return this.client;
  }

  getLaunchData() {
    return this.launchData;
  }

  getState<T>(stateId: string) {
    if (this.client) {
      return this.client.pipe(
        mergeMap((client: XapiClient) =>
          client.getState<T>({
            activityId: this.activityId!,
            agent: this.agent!,
            registration: this.registration,
            stateId,
          })
        )
      );
    } else {
      // return not found if the client is not initialized
      // (no launch parameters were provided)
      return of(new HttpResponse<T>({ body: null, status: 404 }));
    }
  }

  postState<T>(state: T, options: StateOptions, params?: Partial<StateParams>) {
    const stateParams = this.fillStateParams(params ?? {});
    if (this.client) {
      return this.client.pipe(
        mergeMap((client: XapiClient) =>
          client.postState(state, stateParams, options)
        )
      );
    } else {
      // emulate a successful response if the client is not initialized
      return of(new HttpResponse({ status: 204 }));
    }
  }
  putState<T>(state: T, options: StateOptions, params?: Partial<StateParams>) {
    const stateParams = this.fillStateParams(params ?? {});
    if (this.client) {
      return this.client.pipe(
        mergeMap((client: XapiClient) =>
          client.putState(state, stateParams, options)
        )
      );
    } else {
      // emulate a successful response if the client is not initialized
      return of(new HttpResponse({ status: 204 }));
    }
  }

  private fillStateParams(partial: Partial<StateParams>): StateParams {
    const stateParams = { ...partial };
    if (!stateParams.activityId) {
      stateParams.activityId = this.activityId!;
    }
    if (!stateParams.agent) {
      stateParams.agent = this.agent!;
    }
    if (!stateParams.registration && this.registration) {
      stateParams.registration = this.registration;
    }
    if (!stateParams.stateId) {
      stateParams.stateId = DEFAULT_STATE_ID;
    }
    return stateParams as StateParams;
  }

  postStatement(statement: Partial<Statement>) {
    if (this.client) {
      return this.client.pipe(
        mergeMap((client: XapiClient) =>
          client.postStatement(this.fillStatement(statement))
        )
      );
    } else {
      // emulate a successful response if the client is not initialized
      return of(new HttpResponse({ status: 200, body: v4() }));
    }
  }

  private fillStatement(partial: Partial<Statement>): Statement {
    const statement = { ...partial };
    if (!statement.verb) {
      throw new Error('statement.verb is required');
    }
    if (!statement.actor) {
      statement.actor = this.agent;
    }
    if (!statement.object) {
      statement.object = this.course;
    }
    if (!statement.context) {
      statement.context = this.contextTemplate ?? {};
    } else {
      // merge context template with the provided context
      // TODO: this is not a deep merge
      statement.context = {
        ...this.contextTemplate,
        ...statement.context,
      };
    }
    if (!statement.context.registration && this.registration) {
      statement.context.registration = this.registration;
    }

    return statement as Statement;
  }

  /**
   * Convenience method for sending a default completed statement.
   */
  sendCompletedStatement() {
    return this.postStatement({ verb: completed });
  }
}

/**
 * Convenience method for manually fetching cmi5 authorization token from the LMS.
 *
 * @remarks
 * If this method is used, the XapiCourseService should be initialized with the returned token as an auth parameter.
 * Also note that the XapiCourseService won't send the cmi5 initialized statement automatically.
 * Using this method is not recommended, but it can be useful if some non-common initialization is required.
 */
export function fetchCmi5Authorization(
  httpClient: HttpClient,
  fetch: string
): Observable<string> {
  return httpClient.get<FetchResult>(fetch).pipe(
    map((response) => {
      if (response['auth-token']) {
        return response['auth-token'] as string;
      }
      if (response['error-text']) {
        throw new Error(response['error-text'] as string);
      }
      if (response['error-code']) {
        throw new Error(
          'Cannot fetch cmi5 authorization token. Error code:' +
            response['error-code']
        );
      }
      throw new Error('Cannot fetch cmi5 authorization token.');
    })
  );
}

/**
 * Convenience factory for creating an XapiCourseService from the launch parameters.
 * Can be used as a provider in the app-module.
 */
export function xapiCourseServiceFactory(
  httpClient: HttpClient,
  activatedRoute: ActivatedRoute
): Observable<XapiCourseService> {
  return activatedRoute.queryParams.pipe(
    // Theoretically the first value is always empty
    skip(1),
    map(
      (params: Params) =>
        new XapiCourseService(
          httpClient,
          params['endpoint'],
          params['auth'],
          JSON.parse(params['actor']),
          params['activityId'],
          params['registration'],
          params['fetch']
        )
    ),
    take(1)
  );
}
