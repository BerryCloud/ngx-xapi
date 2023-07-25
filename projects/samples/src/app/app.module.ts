import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GetStateComponent } from './get-state/get-state.component';
import { GetStatementComponent } from './get-statement/get-statement.component';
import { PostStateComponent } from './post-state/post-state.component';
import { PostStatementComponent } from './post-statement/post-statement.component';
import { AppRoutingModule } from './app-routing.module';
import { SamplesComponent } from './samples.component';
import { XapiCourseComponent } from './xapi-course/xapi-course.component';
import { XAPI_ACTIVITY } from '@berry-cloud/ngx-xapi/course';
import { XAPI_CONFIG, XapiConfig } from '@berry-cloud/ngx-xapi/client';
import { Activity } from '@berry-cloud/ngx-xapi/model';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    PostStatementComponent,
    GetStatementComponent,
    PostStateComponent,
    GetStateComponent,
    XapiCourseComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: XAPI_CONFIG,
      useValue: {
        endpoint: 'https://lrs.adlnet.gov/xapi/',
        authorization: 'Basic dGVzdDIzOnRlc3QyMzIz',
      } as XapiConfig,
    },
    {
      provide: XAPI_ACTIVITY,
      useValue: {
        id: 'https://berrycloud.co.uk/xapi/sample',
        definition: {
          name: {
            'en-US': 'BerryCloud Sample Course',
          },
        },
      } as Activity,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
