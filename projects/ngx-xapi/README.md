# ngx-xapi

Lightweight Angular wrapper for [xAPI](https://xapi.com).

It can be used to connect any xAPI compatible LRS (learning record store).

It uses the Angular Http Client.

## Installation

```bash
npm i @berry-cloud/ngx-xapi
```

## Entry points

The package contains the following entry-points:

```
@berry-cloud/ngx-xapi
@berry-cloud/ngx-xapi/model
@berry-cloud/ngx-xapi/client
@berry-cloud/ngx-xapi/profiles/cmi5
@berry-cloud/ngx-xapi/course
```

`@berry-cloud/ngx-xapi/model` contains the core types for xAPI. (Statement, Actor, Verb, etc.)
`@berry-cloud/ngx-xapi/client` contains utility methods for communicating with an LRS.
`@berry-cloud/ngx-xapi/profiles/cmi5` contains types and extensions for the cmi5 profile.
`@berry-cloud/ngx-xapi/course` contains utility methods for a tincan or cmi5 course player.

## Samples

See [BerryCloud/ngx-xapi GitHub repository](https://github.com/BerryCloud/ngx-xapi) for [Sample application](https://github.com/BerryCloud/ngx-xapi/tree/main/projects/samples)

It contains simple examples for the client and the course utilities.

## Client Utilities

The client utilities can be accessed via the injectable `XapiClient` service.

If you plan to use this service, you must provide an `XapiConfig` to be injected into the `XapiClient`.
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

### Post Statement

```TypeScript
postPassedStatement() {
  const statement: Statement = {
    actor: {
      name: 'A N Other',
      mbox: 'mailto:another@example.com',
      objectType: 'Agent',
    },
    verb: passed,
    object: {
      id: 'https://example.com/activity/simplestatement',
      definition: { name: { en: 'Simple Statement' } },
    },
  };

  this.client.postStatement(statement).subscribe({
    next: (response) => (this.response = response.body),
    error: (error) => (this.response = error.message),
  });
}
```

### Post State

```TypeScript
postState(state: any) {
  this.client
    .postState(
      state,
      {
        activityId: 'https://example.com/activity',
        agent: {
          mbox: 'mailto:another@example.com',
        },
        stateId: 'progress',
      },
      {
        contentType: 'application/json',
      }
    )
    .subscribe({
      next: (response) =>
        (this.response = response.status === 204 ? 'Success' : 'Failure'),
      error: (error) => (this.response = error.message),
    });
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

### Handling Responses

Most of the `XapiClient` utility methods return a `Observable<HttpResponse<T>>` object. Although in most cases `Observable<T>` would be enough, some important properties of the response can be gathered only from the response headers:

- ETag
- X-Experience-API-Consistent-Through

You can access the response object itself via `response.body`;

## Course Utilities

The course utilities can be accessed via the injectable `XapiCourse` service.
It contains useful utility methods for a tincan or cmi5 compatible course player.

If you plan to use this service, you must provide an `Activity` object to be injected into the `XapiCourse`.
This is the default activity object of the tincan/cmi5 course.

For example:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XAPI_ACTIVITY } from '@berry-cloud/ngx-xapi/course';
import { Activity } from '@berry-cloud/ngx-xapi/model';
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
    provide: XAPI_ACTIVITY,
    useValue: {
      id: 'https://berrycloud.co.uk/xapi/sample',
      definition: {
        name: {
          'en-US': 'BerryCloud Sample Course',
        },
      },
    } as Activity,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The `XapiCourse` service also automatically picks up the launch parameters from the URL when the it is initialized. If the launch parameters come from a different source, or you want to hide the URL parameters before the service is initialized, you can provide this parameters via injection too:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XAPI_ACTIVITY, XAPI_LAUNCH,  } from '@berry-cloud/ngx-xapi/course';
import { Launch } from '@berry-cloud/ngx-xapi/profiles/cmi5';
import { Activity } from '@berry-cloud/ngx-xapi/model';
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
    provide: XAPI_ACTIVITY,
    useValue: {
      id: 'https://berrycloud.co.uk/xapi/sample',
      definition: {
        name: {
          'en-US': 'BerryCloud Sample Course',
        },
      },
    } as Activity,
    provide: XAPI_LAUNCH,
    useValue: {
      endpoint: 'https://mylrs.com/xapi';
      actor: {
        name: 'test user'
        mbox: 'mailto:test@example.com';
      };
      registration: 'bc6c2d1e-6f5e-4023-83fd-01d89d5bfa32';
      activityId: 'http://example.com/activity-from-launc-parameter';
      auth: 'Basic *******';
      fetch: 'https://mylms.com/token/12345678901234567890'
    } as Launch,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

`XAPI_LAUNCH` can be a `Launch` or `Observable<Launch>`, so if can provide it via a factory method which loads it asynchronously from a file or the URL.

The `XapiCourse` service can handle both the tincan `auth` parameter or the `cmi5` launch parameter. If the latter is provided it automatically fetches the auth token from the provided endpoint. In this case it also automatically loads the cmi5 launch-data, and will use it to decorate each further state or statement requests. It also automatically sends the mandatory cmi5 `initialized` statement during initialization.

If the launch parameters are not provided and neither cannot be picked from the URL bar the `XapiCourse` service still initializes itself, but throw an `Error`.
This error must be handled by the application. If it's ignored then the course will still run but it will silently ignore any http requests to the LRS. It can be useful for testing or when a course is launched locally and no need to store progress data.

If neither of the above initialization methods are suitable, you can create the `XapiCourse` manually:

```
  const course = new XapiCourse(activity, launch);
```

The `XapiCourse` uses the `XapiClient` internally, but extends it functionality with some useful convenient methods. If these methods don't fit for usecase you can still get an `Observable<XapiClient | undefined>` via the `getXapiClient()` method.
It is `undefined` if the launch parameters were not provided or were deficient.

## Sending State
