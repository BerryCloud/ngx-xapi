import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';
import { Statement, passed } from '@berry-cloud/ngx-xapi/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'xAPI Client Samples';

  constructor(private client: XapiClient) {}
}
