import { Component } from '@angular/core';
import { Statement, answered, experienced } from '@berry-cloud/ngx-xapi/model';
import { XapiCourseService } from '@berry-cloud/ngx-xapi/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'xapi-course',
  template: `
    <h2>xAPI Course Sample</h2>

    <h3>
      Try deleting/modifiying/extending the launch parameters in the URL bar and
      check the result in the developer tools' console and network tab<br /><br />
      Mandatory parameters are: endpoint (URI), actor (JSON) <br />
      Authorization parameter is one of: auth (authorization header, tincan
      only), fetch (URI, CMI5 only) <br />
      Optional parameters are: activityId (URI), registration (UUID)
    </h3>

    Default Statement: {{ (defaultStatement$ | async)?.body }}
    <br />
    Unique Activity: {{ (sampleStatement$ | async)?.body }}
    <br />
    Completed Statement: {{ (completedStatement$ | async)?.body }}
    <br />
    Callback Statement: {{ (callbackStatement$ | async)?.body }}
  `,
  providers: [],
})
export class XapiCourseComponent {
  defaultStatement$: Observable<any> = this.courseService.postStatement();

  sampleStatement$: Observable<any> = this.courseService.postStatement({
    verb: experienced,
    object: {
      id: 'http://example.com/activities/sample-activity',
      definition: {
        name: {
          'en-US': 'Sample Activity',
        },
      },
    },
  });

  completedStatement$: Observable<any> =
    this.courseService.sendCompletedStatement();

  callbackStatement$: Observable<any> = this.courseService.postStatement(
    (defaultStatement) =>
      ({
        ...defaultStatement,
        verb: answered,
      } as Statement)
  );

  constructor(public courseService: XapiCourseService) {}
}
