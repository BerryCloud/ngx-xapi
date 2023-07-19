import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { XAPI_CONFIG, XapiConfig } from '@berry-cloud/ngx-xapi';
import { AppComponent } from './app.component';
import { GetStateComponent } from './get-state/get-state.component';
import { GetStatementComponent } from './get-statement/get-statement.component';
import { PostStateComponent } from './post-state/post-state.component';
import { PostStatementComponent } from './post-statement/post-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    PostStatementComponent,
    GetStatementComponent,
    PostStateComponent,
    GetStateComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: XAPI_CONFIG,
      useValue: {
        endpoint: 'https://lrs.adlnet.gov/xapi/',
        authorization: 'Basic eGFwaS10b29sczp4YXBpLXRvb2xz',
      } as XapiConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
