import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { About, Activity, Statement, StatementResult } from 'ngx-xapi/model';
import { AgentProfileParams } from './agent-profile-params';
import { StateParams } from './state-params';
import { StatementFormat, StatementsParams } from './statements-params';

export interface LrsConfig {
  endpoint: string;
  authorization: string;
}

export const LRS_CONFIG = new InjectionToken<LrsConfig | Observable<LrsConfig>>(
  'lrs.config'
);

@Injectable({
  providedIn: 'root',
})
export class LrsClient {
  readonly stateUrl = 'activities/state';
  readonly statementsUrl = 'statements';
  readonly activitiesUrl = 'activities';

  readonly agentsProfileUrl = 'agents/profile';
  readonly aboutUrl = 'about';

  private config$: Observable<LrsConfig>;

  constructor(
    private http: HttpClient,
    @Inject(LRS_CONFIG)
    config: LrsConfig | Observable<LrsConfig>
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
   * Puts a state document.
   *
   * LRS should replace any existing state document.
   */
  putState<T>(
    object: T,
    stateParams: StateParams,
    options: { contentType: string; etag?: string; match?: boolean }
  ): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getStateParams(stateParams),
          // Client may require etag header
          observe: 'response' as const,
        };

        const url = this.normalize(config.endpoint, this.stateUrl);

        return this.http.put<T>(url, object, httpOptions);
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
    options: { etag?: string; match?: boolean }
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
   * Posts a single statement to the LRS.  This method is a convenient alias
   * for postStatements.
   *
   * @param statement to store in learning record store.
   *
   * @returns statement id for the given statement
   */
  postStatement(statement: Statement): Observable<HttpResponse<string[]>> {
    return this.postStatements([statement]);
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
   * Get a single statement.
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
   * Get a single voided statement.
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
   * Get statements with HTTP response. This method is useful when client
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
   * Post an agent profile document.
   */
  postAgentProfile<T>(
    object: T,
    agentProfileParams: AgentProfileParams,
    options: { contentType: string; etag?: string; match?: boolean }
  ): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.post<T>(url, object, httpOptions);
      })
    );
  }

  /**
   * Puts an agent profile document.
   */
  putAgentProfile<T>(
    object: T,
    agentProfileParams: AgentProfileParams,
    options: { contentType: string; etag: string; match: boolean }
  ): Observable<HttpResponse<T>> {
    return this.config$.pipe(
      mergeMap((config) => {
        const httpOptions = {
          headers: this.getHeaders(config.authorization, options),
          params: this.getAgentProfileParams(agentProfileParams),
          observe: 'response' as const, // Client may require etag header
        };

        const url = this.normalize(config.endpoint, this.agentsProfileUrl);

        return this.http.put<T>(url, object, httpOptions);
      })
    );
  }

  /**
   * Get the xAPI versions that this LRS supports and any additional
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

  private getStateParams(params: StateParams): HttpParams {
    let httpParams = new HttpParams()
      .set('activityId', params.activityId)
      .set('stateId', params.stateId)
      .set('agent', JSON.stringify(params.agent));

    if (params.registration) {
      httpParams = httpParams.set('registration', params.registration);
    }

    return httpParams;
  }

  private getAgentProfileParams(params: AgentProfileParams): HttpParams {
    return new HttpParams()
      .set('profileId', params.profileId)
      .set('agent', JSON.stringify(params.agent));
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
