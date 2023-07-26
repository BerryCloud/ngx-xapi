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
`@berry-cloud/ngx-xapi/client` contains utility functions for communicating with an LRS.
`@berry-cloud/ngx-xapi/profiles/cmi5` contains types and extensions for the cmi5 profile.
`@berry-cloud/ngx-xapi/course` contains utility functions for a tincan or cmi5 course player.

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

Most of the `XapiClient` utility functions return a `Observable<HttpResponse<T>>` object. Although in most cases `Observable<T>` would be enough, some important properties of the response can be gathered only from the response headers:

- ETag
- X-Experience-API-Consistent-Through

You can access the response object itself via `response.body`;

## Course Utilities

The course utilities can be accessed via the injectable `XapiCourseService`.
It contains useful utility functions for a tincan or cmi5 compatible course player.
You can turn an angular application into a tincan and/or cmi5 compatible course within minutes.

If you plan to use this service, you must provide an `Activity` object to be injected into the `XapiCourseService`.
This will be the activity object of the tincan/cmi5 course.

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
        type: "http://adlnet.gov/expapi/activities/course",
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

The `XapiCourseService` also automatically picks up the launch parameters from the URL when it is initialized. If the launch parameters come from a different source, or you want to hide the URL parameters before the service is initialized, you can provide this parameters via injection too:

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

`XAPI_LAUNCH` can be a `Launch` or `Observable<Launch>`, so you can also provide it via a factory function which loads it asynchronously from a file or the URL.

The `XapiCourseService` can handle both the tincan `auth` parameter or the `cmi5` launch parameter. If the latter is provided it automatically fetches the auth token from the provided endpoint. In this case it also automatically loads the cmi5 launch-data, and will use it to decorate each further statements to be sent to the LRS. It also automatically sends the mandatory cmi5 `initialized` statement during initialization.

If the launch parameters are not provided and neither cannot be picked from the URL bar the `XapiCourseService` service still initializes itself, but also throws an `Error`.
This error is logged into the console, but does not cease the application. It must be handled manually if needed.
If it's ignored then the course will still run, but it will silently ignore any http requests to the LRS. (Get functions will return 404, put/post functions will return 200 or 204.) It can be useful for testing or when a course is launched locally and no need to store progress data.

If neither of the above initialization methods are suitable, you can create the `XapiCourseService` manually:

```
  const course = new XapiCourseService(activity, launch);
```

The `XapiCourseService` uses the `XapiClient` internally, but extends its functionality with some useful convenience functions.
If these functions don't fit for your usecase, you can still get an `Observable<XapiClient | undefined>` via the `getXapiClient()` function. It returns `undefined` if the launch parameters were not provided or were deficient. See the `XapiClient` examples above.

## Sending a State

After the `XapiCourseService` was successfully initialized, you can send a state with the `putState` or `postState` functions. They have only one mandatory argument, the state to be sent. All parameters needed for the LRS request are filled or defaulted in by the `XapiCourseService`.

default stateId: `progress`
default content-type: `application/json`

If you want to use different `stateId` or send a state with any other properties, you can override any of the defaults by providing the `StateParams` and `StateOptions` arguments:

```TypeScript
this.courseService.putState(
  state,
  {
    stateId: 'sample-state',
    activityId: 'http://example.com/activities/sample-activity',
    registration: '123456789-1234-1234-1234-123456789012',
    agent: {
      mbox: 'mailto:test@example.com',
    },
  },
  {
    contentType: 'application/json',
    etag: '"123456789012345678901234567890123456789012"',
    match: true
  }
).subscribe( ... );
```

## Getting a State

You can use the `getState` function the same way as the above functions. Without any arguments it will try to get the state by the default parameters, but you can override any of them:

```TypeScript
this.xapiCourseService.getState(
  {
    stateId: 'sample-state',
    activityId: 'http://example.com/activities/sample-activity',
    registration: '123456789-1234-1234-1234-123456789012',
    agent: {
      mbox: 'mailto:test@example.com',
    },
  }
).subscribe( ... );
```

## Sending a Statement

You can send a default statement using the `postStatement` function:

```TypeScript
this.xapiCourseService.postStatement();
```

The default verb is `experienced`, the actor, object and registration properties are picked up from the launch parameters.
You can provide a `Partial<Statement>` argument to the `postStatement` function where you can override any of these parameters:

```TypeScript
this.courseService.postStatement(
  {
    verb: attempted,
    object: {
      id: 'http://example.com/activities/sample-activity',
      definition: {
        name: {
          'en-US': 'Sample Activity',
        },
      },
    },
    actor: {
      mbox: 'mailto:other@example.com',
    },
    context: {
      registration: '00000000-0000-0000-0000-000000000000',
      language: 'en-US',
      extensions: {
        'http://example.com/profiles/meetings/context/extensions/meeting-id':
          '123456789',
        'http://example.com/profiles/meetings/context/extensions/meeting-name':
          'Example Meeting',
      }
    },
  }
)
```

If the `XapiCourseService` was initialized as a cmi5 course, then the properties from cmi5 `contextTemplate` are also added to the `Statement`. The mandatory parameters from the `contextTemplate` cannot be overridden. (these are the sessionId extension and the contextActivities arrays)
If you want full control over the `Statement`, you can configure it via a callback function. The incoming `defaultStatement` argument contains the prefilled Statement, but you can override any or all of the properties. (Do it only if you **really know** what are you doing)

```TypeScript
this.courseService.postStatement(
  (defaultStatement) =>
    ({
      ...defaultStatement,
      verb: attempted,
      context: {
        contextActivities: {
          grouping: [
            {
              id: 'http://example.com/activities/world-domination',
              definition: {
                name: {
                  'en-US': 'Nothing to see here',
                },
              },
            },
          ],
          parent: undefined
        },
        extensions: undefined
      },
    } as Statement)
);
```

## Convenience functions for sending Statements

You can use the following functions for sending the most common tincan or cmi5 statements. All of them can be used with an extra statement-template or a callback function argument, like the `postStatement` function above:

```TypeScript
sendCompletedStatement();
sendPassedStatement();
sendFailedStatement();
sendProgressedStatement(progressValue);
sendScoredStatement(scoreValue, scaledValue);
```

In the latter functions the progress and score values are merged into the statement after the callback function was used.

eg. sending a score for a test which has its own activity:

```TypeScript
// For an IQ test, the scaled score is not applicable, so we send undefined
this.courseService.sendScoredStatement(152, undefined, {
  object: {
    id: 'http://example.com/activities/iq-test',
    definition: {
      name: {
        'en-US': 'IQ Test',
      },
    },
  },
});
```
