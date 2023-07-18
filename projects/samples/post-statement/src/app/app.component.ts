import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';
import { Statement, passed } from '@berry-cloud/ngx-xapi/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'post-statement';

  response: string | undefined;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.sendPassedStatement();
  }

  sendPassedStatement() {
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
      next: (response) =>
        (this.response = response.body ? response.body[0] : undefined),
      error: (error) => (this.response = error.message),
    });
  }
}
