import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
  About,
  Activity,
  Statement,
  StatementResult,
} from '@berry-cloud/ngx-xapi/model';
import {
  AgentProfileParams,
  AgentProfilesParams,
} from './agent-profile-params';
import {
  DeleteStatesParams,
  GetStatesParams,
  StateParams,
  StatesParams,
} from './state-params';
import { StatementFormat, StatementsParams } from './statements-params';
import {
  ActivityProfileParams,
  ActivityProfilesParams,
} from './activity-profile-params';
import { DeleteStateOptions, StateOptions } from './state-options';

export interface XapiConfig {
  endpoint: string;
  authorization: string;
}

export const XAPI_CONFIG = new InjectionToken<
  XapiConfig | Observable<XapiConfig>
>('xapi.config');

@Injectable({
  providedIn: 'root',
})
export class XapiClient {
  readonly stateUrl = 'activities/state';
  readonly statementsUrl = 'statements';
  readonly activitiesUrl = 'activities';

  readonly agentsProfileUrl = 'agents/profile';
  readonly activitiesProfileUrl = 'activities/profile';
  readonly aboutUrl = 'about';

  private config$: Observable<XapiConfig>;

  constructor(
    private http: HttpClient,
    @Inject(XAPI_CONFIG)
    config: XapiConfig | Observable<XapiConfig>
  ) {
    if (config instanceof Observable) {
      this.config$ = config;
    } else {
      this.config$ = of(config);
    }
  }

  /**
   * Gets a state document.
   */
  getState<T>(stateParams: StateParams): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getStateParams(stateParams),
          observe: 'response' as const, // Client may require headers
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.get<T>(url, httpOptions);
      })
    );
  }

  /**
   * Gets a list of state document ids.
   */
  getStates(statesParams: GetStatesParams): Observable<HttpResponse<string[]>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getStateParams(statesParams),
          observe: 'response' as const, // Client may require headers
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.get<string[]>(url, httpOptions);
      })
    );
  }

  /**
   * Puts a state document.
   *
   * LRS should replace any existing state document.
   */
  putState(
    object: any,
    stateParams: StateParams,
    options: StateOptions
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getStateParams(stateParams),
          // Client may require etag header
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.put(url, object, httpOptions);
      })
    );
  }

  /**
   * Posts a state document.
   */
  postState(
    object: any,
    stateParams: StateParams,
    options: StateOptions
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getStateParams(stateParams),
          // Client may require etag header
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.post(url, object, httpOptions);
      })
    );
  }

  /**
   * Deletes a state document from the LRS.
   *
   * No error will occur if the state does not exist.
   */
  deleteState(
    stateParams: StateParams,
    options: DeleteStateOptions
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getStateParams(stateParams),
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.delete(url, httpOptions);
      })
    );
  }

  /**
   * Deletes multiple state documents from the LRS.
   *
   * No error will occur if the state does not exist.
   */
  deleteStates(
    statesParams: DeleteStatesParams,
    options: DeleteStateOptions
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getStateParams(statesParams),
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.delete(url, httpOptions);
      })
    );
  }

  /**
   * Posts a single statement to the LRS.  This method is a convenient alias
   * for postStatements.
   *
   * @param statement to store in learning record store.
   *
   * @returns statement id for the given statement
   */
  postStatement(statement: Statement): Observable<HttpResponse<string>> {
    return this.postStatements([statement]).pipe(
      map((response) => {
        return new HttpResponse({
          body: response.body?.length ? response.body[0] : undefined,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url ?? undefined,
        });
      })
    );
  }

  /**
   * Posts an array of statements to the LRS.
   *
   * @param statements to store in learning record store.
   *
   * @returns array of statement ids in the same order as the given statements
   */
  postStatements(statements: Statement[]): Observable<HttpResponse<string[]>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          // Client may require X-Experience-API-Consistent-Through
          observe: 'response' as const,
        };
        const url = this.normalize(config.endpoint, this.statementsUrl);

        return this.http.post<string[]>(url, statements, httpOptions);
      })
    );
  }

  /**
   * Gets a single statement.
   *
   * @param statementId of the statement
   * @param format of the statement
   *
   * @returns the statement
   */
  getStatement(
    statementId: string, // TODO handle attachments
    format?: StatementFormat
  ): Observable<HttpResponse<Statement>> {
    return this.config$.pipe(
      mergeMap((config) => {
        let params = new HttpParams().set('statementId', statementId);

        if (format) {
          params = params.set('format', format);
        }

        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params,
          // Client may require X-Experience-API-Consistent-Through
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.statementsUrl);

        return this.http.get<Statement>(url, httpOptions);
      })
    );
  }

  /**
   * Gets a single voided statement.
   *
   * @param voidedStatementId of the void statement
   * @param format of the void statement
   *
   * @returns the void statement
   */
  getVoidedStatement(
    voidedStatementId: string, // TODO handle attachments
    format?: StatementFormat
  ): Observable<HttpResponse<Statement>> {
    return this.config$.pipe(
      mergeMap((config) => {
        let params = new HttpParams().set(
          'voidedStatementId',
          voidedStatementId
        );

        if (format) {
          params = params.set('format', format);
        }

        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params,
          // Client may require X-Experience-API-Consistent-Through
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.statementsUrl);

        return this.http.get<Statement>(url, httpOptions);
      })
    );
  }

  /**
   * Gets statements with HTTP response. This method is useful when client
   * requires X-Experience-API-Consistent-Through header.
   *
   * @param params optional statements parameters
   *
   * @returns StatementResult wrapped in HttpResponse
   */
  getStatementsWithHttpResponse(
    params?: StatementsParams
  ): Observable<HttpResponse<StatementResult>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getStatementsParams(params),
          // Client may require X-Experience-API-Consistent-Through
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.statementsUrl);

        return this.http.get<StatementResult>(url, httpOptions);
      })
    );
  }

  /**
   * Get statements.
   *
   * @param params optional statements parameters
   *
   * @returns StatementResult object containing statements array and more token
   */
  getStatements(params?: StatementsParams): Observable<StatementResult> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getStatementsParams(params),
        };

        const url = this.normalize(config.endpoint, this.statementsUrl);

        return this.http.get<StatementResult>(url, httpOptions);
      })
    );
  }

  /**
   * Get more statements with HTTP response. This method is useful when client
   * requires X-Experience-API-Consistent-Through header.
   *
   * @returns StatementResult wrapped in HttpResponse
   */
  getMoreStatementsWithHttpResponse(
    more: string
  ): Observable<HttpResponse<StatementResult>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          // Client may require X-Experience-API-Consistent-Through
          observe: 'response' as const,
        };
        const endpoint = this.normalize(new URL(config.endpoint).origin, more);
        return this.http.get<StatementResult>(endpoint, httpOptions);
      })
    );
  }

  /**
   * Get more statements.
   *
   * @returns StatementResult object containing statements array and more token
   */
  getMoreStatements(more: string): Observable<StatementResult> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
        };
        const endpoint = this.normalize(new URL(config.endpoint).origin, more);
        return this.http.get<StatementResult>(endpoint, httpOptions);
      })
    );
  }

  /**
   * Gets complete Activity Object.
   *
   * @returns Activity wrapped in HttpResponse
   */
  getActivity(activityId: string): Observable<HttpResponse<Activity>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: new HttpParams().set('activityId', activityId),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesUrl);

        return this.http.get<Activity>(url, httpOptions);
      })
    );
  }

  /**
   * Gets a list of agent profile document ids.
   */
  getAgentProfiles(
    agentProfilesParams: AgentProfilesParams
  ): Observable<HttpResponse<string[]>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getAgentProfilesParams(agentProfilesParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.get<string[]>(url, httpOptions);
      })
    );
  }

  /**
   * Gets an agent profile document.
   */
  getAgentProfile<T>(
    agentProfileParams: AgentProfileParams
  ): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.get<T>(url, httpOptions);
      })
    );
  }

  /**
   * Posts an agent profile document.
   */
  postAgentProfile(
    object: any,
    agentProfileParams: AgentProfileParams,
    options: { contentType: string; etag?: string; match?: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.post(url, object, httpOptions);
      })
    );
  }

  /**
   * Puts an agent profile document.
   */
  putAgentProfile(
    object: any,
    agentProfileParams: AgentProfileParams,
    options: { contentType: string; etag: string; match: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.put(url, object, httpOptions);
      })
    );
  }

  /**
   * Deletes an agent profile document.
   */
  deleteAgentProfile(
    agentProfileParams: AgentProfileParams,
    options: { etag: string; match: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.delete(url, httpOptions);
      })
    );
  }

  /**
   * Gets a list of activity profile document ids.
   */
  getActivityProfiles(
    activityProfilesParams: ActivityProfilesParams
  ): Observable<HttpResponse<string[]>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getActivityProfilesParams(activityProfilesParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesProfileUrl);

        return this.http.get<string[]>(url, httpOptions);
      })
    );
  }

  /**
   * Gets an activity profile document.
   */
  getActivityProfile<T>(
    activityProfileParams: ActivityProfileParams
  ): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization),
          params: this.getActivityProfileParams(activityProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesProfileUrl);

        return this.http.get<T>(url, httpOptions);
      })
    );
  }

  /**
   * Posts an activity profile document.
   */
  postActivityProfile(
    object: any,
    activityProfileParams: ActivityProfileParams,
    options: { contentType: string; etag?: string; match?: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getActivityProfileParams(activityProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesProfileUrl);

        return this.http.post(url, object, httpOptions);
      })
    );
  }

  /**
   * Puts an activity profile document.
   */
  putActivityProfile(
    object: any,
    activityProfileParams: ActivityProfileParams,
    options: { contentType: string; etag: string; match: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getActivityProfileParams(activityProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesProfileUrl);

        return this.http.put(url, object, httpOptions);
      })
    );
  }

  /**
   * Deletes an activity profile document.
   */
  deleteActivityProfile(
    activityProfileParams: ActivityProfileParams,
    options: { etag: string; match: boolean }
  ): Observable<HttpResponse<object>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getActivityProfileParams(activityProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.activitiesProfileUrl);

        return this.http.delete(url, httpOptions);
      })
    );
  }

  /**
   * Gets the xAPI versions that this LRS supports and any additional
   * extensions.
   *
   * @returns About object containing supported xAPI versions
   */
  getAbout(): Observable<About> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = { headers: this.getHeaders(config.authorization) };

        const aboutUrl = new URL('about', config.endpoint).href;

        return this.http.get<About>(aboutUrl, httpOptions);
      })
    );
  }

  /**
   * Returns a headers object with required xAPI headers.
   *
   * @param headers to use in the request
   */
  private getHeaders(authorization?: string, options?: any): HttpHeaders {
    let headers = new HttpHeaders().set('X-Experience-API-Version', '1.0.3');

    if (authorization) {
      headers = headers.set('Authorization', authorization);
    }

    if (options?.contentType) {
      headers = headers.set('Content-Type', options.contentType);
    }

    if (options?.etag) {
      if (options.match) {
        headers = headers.set('If-Match', options.etag);
      } else {
        headers = headers.set('If-None-Match', options.etag);
      }
    }

    return headers;
  }

  private getStateParams(params: StatesParams): HttpParams {
    let httpParams = new HttpParams()
      .set('activityId', params.activityId)
      .set('agent', JSON.stringify(params.agent));

    if (params.registration) {
      httpParams = httpParams.set('registration', params.registration);
    }

    if (params.since) {
      httpParams = httpParams.set('registration', params.since);
    }

    if (params.stateId) {
      httpParams = httpParams.set('stateId', params.stateId);
    }

    return httpParams;
  }

  private getAgentProfileParams(params: AgentProfileParams): HttpParams {
    return new HttpParams()
      .set('profileId', params.profileId)
      .set('agent', JSON.stringify(params.agent));
  }

  private getAgentProfilesParams(params: AgentProfilesParams): HttpParams {
    let httpParam = new HttpParams().set('agent', JSON.stringify(params.agent));

    if (params.since) {
      httpParam = httpParam.set('since', params.since);
    }

    return httpParam;
  }

  private getActivityProfileParams(params: ActivityProfileParams): HttpParams {
    return new HttpParams()
      .set('profileId', params.profileId)
      .set('activityId', JSON.stringify(params.activityId));
  }

  private getActivityProfilesParams(
    params: ActivityProfilesParams
  ): HttpParams {
    let httpParam = new HttpParams().set(
      'activityId',
      JSON.stringify(params.activityId)
    );

    if (params.since) {
      httpParam = httpParam.set('since', params.since);
    }

    return httpParam;
  }

  private getStatementsParams(params?: StatementsParams): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    if (params.agent) {
      httpParams = httpParams.set('agent', JSON.stringify(params.agent));
    }

    if (params.verb) {
      httpParams = httpParams.set('verb', params.verb);
    }

    if (params.activity) {
      httpParams = httpParams.set('activity', params.activity);
    }

    if (params.registration) {
      httpParams = httpParams.set('registration', params.registration);
    }

    if (params.relatedActivities) {
      httpParams = httpParams.set(
        'related_activities',
        String(params.relatedActivities)
      );
    }

    if (params.relatedAgents) {
      httpParams = httpParams.set(
        'related_agents',
        String(params.relatedAgents)
      );
    }

    if (params.since) {
      httpParams = httpParams.set('since', params.since);
    }

    if (params.until) {
      httpParams = httpParams.set('until', params.until);
    }

    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    if (params.format) {
      httpParams = httpParams.set('format', params.format);
    }

    if (params.attachments) {
      httpParams = httpParams.set('attachments', 'true');
    }

    if (params.ascending) {
      httpParams = httpParams.set('ascending', 'true');
    }

    return httpParams;
  }

  private normalize(url: string, resource: string): string {
    url = url.endsWith('/') ? url : `${url}/`;

    try {
      return new URL(resource, url).href;
    } catch {
      throw new Error(`Endpoint ${url} not valid`);
    }
  }
}
