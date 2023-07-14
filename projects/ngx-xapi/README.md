# ngx-xapi

Lightweight Angular wrapper for the
[xAPI](https://xapi.com).

It can be used to connect any xAPI compatible LRS (learning record store).

It uses the Angular Http Client.

## Installation

```bash
npm i @berry-cloud/ngx-xapi
```

## Entry points

The package contains two entry-points:

```
@berry-cloud/ngx-xapi/model
@berry-cloud/ngx-xapi/client
```

`@berry-cloud/ngx-xapi/model` contains the core types for xAPI. (Statement, Actor, Verb, etc.)
`@berry-cloud/ngx-xapi/client` contains utility methods for communicating with an LRS.

All of the exported types and methods can be accessed directly from `@berry-cloud/ngx-xapi` entry point too.

## Configuration injection

If you plan to use the client methods, you must provide an `XapiConfig` to be injected into the `XapiClient`.
The HttpClientModule must also be imported.

For example:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XapiConfig, XAPI_CONFIG } from '@berry-cloud/ngx-xapi/client';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: XAPI_CONFIG,
      useValue: {
        endpoint: 'https://example-lrs.com/',
        authorization: 'Your authorization token',
      } as XapiConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Remember to change the endpoint url and authorization values for your environment.

The value for the authorization is sent as an authorization header when making
API requests.

NOTE: In a production environment the authorization header should not be hardcoded
into the application.

Alternatively you can provide an Observable of an `XapiConfig` which will be
injected into the `XapiClient`.

For example:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XAPI_CONFIG } from '@berry-cloud/ngx-xapi/client';
import { map } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';

function xapiConfigFactory(userService: UserService) {
  return userService.user$.pipe(
      map((user) => ({
        url: 'https://example-lrs.com/',
        authorization: `Bearer ${user.authorization}`,
      }))
    );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: XAPI_CONFIG,
      useFactory: xapiConfigFactory,
      deps: [UserService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Most Common Use-cases

### Sending a Statement

```TypeScript
export class LastPageComponent {

  constructor(private xapiClient: XapiClient) {}

  sendPassedStatement(actor: Actor, course: Course): Observable<Statement> {

    const statement: Statement = {
        id: uuidv4().toString(),
        actor,
        verb: passed,
        object: getCourseActivity(course),
        timestamp: Date.now().toString(),
        context: { registration: course.registration },
    };

    return this.xapiClient.postStatement(statement).pipe(map(() => statement));
  }
}
```

### Sending a State

```TypeScript
export class PageService {

  constructor(private xapiClient: XapiClient) {}

  sendProgressState(
    activityId: string,
    agent: Agent,
    registration: string,
    progress: Progress
  ): Observable<HttpResponse<Progress>> {
    return this.putState<Progress>(
      progress,
      {
        activityId,
        agent,
        stateId: 'progress',
        registration,
      },
      {
        contentType: 'application/json',
      }
    );
  }
}
```

### LanguageMap Pipe

This pipe transforms an xAPI `LanguageMap` into a string choosing the most appropriate language from the map based on the Angular's `LOCALE_ID`.

Parameters:

- htmlConversion (default true) : converts multiple spaces to `&nbsp` and new lines to `<br>`. So if the `LanguageMap` contains formatted text, it will keep the basic formatting when it is rendered into HTML.

Example:

```HTML
  <h1 [innerHTML]="activity.definition.name | languageMap"></h1>
```

## Handling Responses

Most of the `XapiClient` utility methods return a `Observable<HttpResponse<T>>` object. Although in most cases `Observable<T>` would be enough, some important properties of the response can be gathered only from the response headers:

- ETag
- X-Experience-API-Consistent-Through

You can access the response object itself via `response.body`;
