import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  Activity,
  Context,
  Statement,
  Verb,
  completed,
  experienced,
  failed,
  initialized,
  passed,
  progressed,
} from '@berry-cloud/ngx-xapi/model';
import {
  XapiClient,
  StateParams,
  StateOptions,
} from '@berry-cloud/ngx-xapi/client';
import {
  Observable,
  ReplaySubject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  take,
  tap,
} from 'rxjs';
import { v4 } from 'uuid';
import {
  FetchResult,
  Launch,
  LaunchData,
} from '@berry-cloud/ngx-xapi/profiles/cmi5';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { PlatformLocation } from '@angular/common';

export const DEFAULT_STATE_ID = 'state';

export const XAPI_LAUNCH = new InjectionToken<Launch | Observable<Launch>>(
  'xapi.launch'
);

export const XAPI_ACTIVITY = new InjectionToken<
  Activity | Observable<Activity>
>('xapi.activity');

@Injectable({
  providedIn: 'root',
})
export class XapiCourseService {
  public client: ReplaySubject<XapiClient | undefined>;
  private course?: Activity;
  private contextTemplate?: Context;

  private launch?: Launch;
  private launchData?: LaunchData;

  constructor(
    private httpClient: HttpClient,
    @Inject(XAPI_ACTIVITY)
    activity: Activity | Observable<Activity>,
    @Optional()
    @Inject(XAPI_LAUNCH)
    launchParameters?: Launch | Observable<Launch> | null,
    @Optional()
    platformLocation?: PlatformLocation
  ) {
    this.client = new ReplaySubject<XapiClient | undefined>(1);

    var launch$: Observable<Launch>;
    var activity$: Observable<Activity>;

    if (activity instanceof Observable) {
      activity$ = activity;
    } else {
      activity$ = of(activity);
    }

    if (launchParameters) {
      if (launchParameters instanceof Observable) {
        launch$ = launchParameters;
      } else {
        launch$ = of(launchParameters);
      }
    } else if (platformLocation?.search) {
      const params = new URLSearchParams(platformLocation.search);
      launch$ = of({
        endpoint: params.get('endpoint'),
        auth: params.get('auth'),
        actor: params.get('actor') && JSON.parse(params.get('actor')!),
        activityId: params.get('activityId'),
        registration: params.get('registration'),
        fetch: params.get('fetch'),
      } as Launch);
    } else {
      launch$ = of({} as Launch);
    }

    forkJoin([activity$, launch$])
      .pipe(
        mergeMap(([activity, launch]) => {
          this.course = {
            ...activity,
          };
          if (launch.activityId) {
            this.course.id = launch.activityId;
          }
          if (
            launch.endpoint &&
            launch.actor &&
            (launch.auth || launch.fetch)
          ) {
            this.launch = launch;

            if (launch.fetch) {
              // fetch authorization from the LMS
              return fetchCmi5Authorization(httpClient, launch.fetch!).pipe(
                // create a client from the authorization token
                map(
                  (authorization: string) =>
                    new XapiClient(this.httpClient, {
                      endpoint: launch.endpoint,
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
                      this.client!.complete();
                    })
                  )
                )
              );
            } else if (launch.auth) {
              // initialize only if all required parameters are provided
              this.client!.next(
                new XapiClient(this.httpClient, {
                  endpoint: launch.endpoint,
                  authorization: launch.auth,
                })
              );
              this.client!.complete();
            }
            return of(undefined);
          } else if (
            launch.endpoint ||
            launch.actor ||
            launch.auth ||
            launch.fetch
          ) {
            throw new Error(
              'Cannot initialize XapiCourseService. Missing required launch parameters.'
            );
          } else {
            // If NO launch parameters are provided,
            // we assume that the service is used for testing purposes,
            // (eg. was launched manually from the browser)
            // or was launched from a non-cmi5/non-xapi LMS.
            // In this case, the service will not get/send any statements or states.
            this.client.next(undefined);
            this.client.complete();
            return of(undefined);
          }
        }),
        catchError((error) => {
          // In case of error, the client will not be initialized.
          // This means that the service will not get/send any statements or states.
          // But otherwise it will work normally.
          this.client.next(undefined);
          this.client.complete();
          // We rethrow the error so that the app can handle it.
          throw error;
        }),
        take(1)
      )
      .subscribe();
  }

  private getCmi5launchData(client: XapiClient): Observable<LaunchData> {
    return client
      .getState<LaunchData>({
        activityId: this.course!.id,
        agent: this.launch!.actor!,
        registration: this.launch!.registration,
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

  getXapiClient(): Observable<XapiClient | undefined> {
    return this.client;
  }

  getCmi5LaunchData() {
    return this.launchData;
  }

  getState<T>(stateId: string) {
    return this.client.pipe(
      mergeMap((client) =>
        client
          ? client.getState<T>({
              activityId: this.launch!.activityId!,
              agent: this.launch!.actor,
              registration: this.launch!.registration,
              stateId,
            })
          : // return not found if the client is not initialized
            // (no launch parameters were provided)
            of(new HttpResponse<T>({ body: null, status: 404 }))
      )
    );
  }

  postState<T>(state: T, options: StateOptions, params?: Partial<StateParams>) {
    const stateParams = this.fillStateParams(params ?? {});
    return this.client.pipe(
      mergeMap((client) =>
        client
          ? client.postState(state, stateParams, options)
          : of(new HttpResponse({ status: 204 }))
      )
    );
  }

  putState<T>(state: T, options: StateOptions, params?: Partial<StateParams>) {
    const stateParams = this.fillStateParams(params ?? {});
    return this.client.pipe(
      mergeMap((client) =>
        client
          ? client.putState(state, stateParams, options)
          : of(new HttpResponse({ status: 204 }))
      )
    );
  }

  private fillStateParams(partial: Partial<StateParams>): StateParams {
    const stateParams = { ...partial };
    if (!stateParams.activityId) {
      stateParams.activityId = this.course?.id;
    }
    if (!stateParams.agent) {
      stateParams.agent = this.launch?.actor;
    }
    if (!stateParams.registration && this.launch?.registration) {
      stateParams.registration = this.launch?.registration;
    }
    if (!stateParams.stateId) {
      stateParams.stateId = DEFAULT_STATE_ID;
    }

    return stateParams as StateParams;
  }

  /**
   * Sends a statement to the LRS.
   * If the client is not initialized (no launch parameters were provided),
   * returns OK and a random uuid.
   *
   * @param param Either a partial statement which will be extended by the default statement,
   * or a function that takes the default statement as a parameter and returns a partial statement.
   * If not provided, a default statement will be sent.
   *
   * The default statement contains the following fields:
   *
   * actor: the actor from the launch parameters
   *
   * verb: experienced
   *
   * object: the XAPI_ACTIVITY + optional id from the launch parameters
   *
   * context: the context template from the launch parameters
   *
   * context.registration: the registration from the launch parameters
   *
   * If a partial statement is provided, the above fields will be overridden by the default statement.
   * If a function is provided, the above fields will be overridden by the result of the function.
   *
   * @returns An observable of the HttpResponse from the LRS. (The body is the uuid of the statement)
   */
  postStatement(
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ): Observable<HttpResponse<string>> {
    const verb =
      typeof param === 'function' ? experienced : param?.verb || experienced;
    return this.postStatementWithVerb(verb, param);
  }

  private postStatementWithVerb(
    verb: Verb,
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ): Observable<HttpResponse<string>> {
    const statement =
      typeof param === 'function'
        ? param(this.fillStatement({ verb }))
        : this.fillStatement({ ...param, verb });

    return this.client.pipe(
      mergeMap((client) =>
        client
          ? client.postStatement(statement)
          : // return OK and a random uuid if the client is not initialized
            // (no launch parameters were provided)
            of(new HttpResponse({ status: 200, body: v4() }))
      )
    );
  }

  private fillStatement(partial: Partial<Statement>): Statement {
    const statement = { ...partial };
    if (!statement.actor) {
      statement.actor = this.launch?.actor;
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
    if (!statement.context.registration && this.launch?.registration) {
      statement.context.registration = this.launch?.registration;
    }

    return statement as Statement;
  }

  /**
   * Convenience method for sending a default completed statement.
   * @see {@link postStatement}
   */
  sendCompletedStatement(
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ) {
    return this.postStatementWithVerb(completed, param);
  }

  /**
   * Convenience method for sending a default passed statement.
   * @see {@link postStatement}
   */
  sendPassedStatement(
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ) {
    return this.postStatementWithVerb(passed, param);
  }

  /**
   * Convenience method for sending a default failed statement.
   * @see {@link postStatement}
   */
  sendFailedStatement(
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ) {
    return this.postStatementWithVerb(failed, param);
  }

  /**
   * Convenience method for sending a default progressed statement.
   * @param progress The progress value (0-100)
   * @see {@link postStatement}
   */
  sendProgressedStatement(
    progress: number,
    param?: Partial<Statement> | ((defaultStatement: Statement) => Statement)
  ) {
    let statement =
      typeof param === 'function'
        ? param(this.fillStatement({ verb: progressed }))
        : this.fillStatement({ ...param, verb: progressed });

    statement = {
      ...statement,
      result: {
        ...statement?.result,
        extensions: {
          ...statement?.result?.extensions,
          'http://id.tincanapi.com/extension/progress': progress,
        },
      },
    };

    return this.client.pipe(
      mergeMap((client) =>
        client
          ? client.postStatement(statement)
          : of(new HttpResponse({ status: 200, body: v4() }))
      )
    );
  }
}

/**
 * Convenience method for manually fetching cmi5 authorization token from the LMS.
 *
 * @remarks
 * If this method is used, the XapiCourseService should be initialized with the returned token as an auth parameter.
 * Also note that the XapiCourseService won't send the cmi5 initialized statement automatically in this case.
 * Using this method is not recommended, but it can be useful if some non-common initialization is required.
 */
export function fetchCmi5Authorization(
  httpClient: HttpClient,
  fetch: string
): Observable<string> {
  return httpClient.post<FetchResult>(fetch, null).pipe(
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
