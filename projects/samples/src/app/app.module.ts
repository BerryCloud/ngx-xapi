import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { XAPI_CONFIG, XapiConfig } from '@berry-cloud/ngx-xapi';
import { PostStatementComponent } from './post-statement/post-statement.component';
import { PostStateComponent } from './post-state/post-state.component';

@NgModule({
  declarations: [AppComponent, PostStatementComponent, PostStateComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: XAPI_CONFIG,
      useValue: {
        endpoint: 'http://localhost:8080/xapi/',
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      } as XapiConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
