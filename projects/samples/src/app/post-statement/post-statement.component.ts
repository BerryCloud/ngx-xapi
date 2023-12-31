import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';
import { Statement, passed } from '@berry-cloud/ngx-xapi/model';

@Component({
  selector: 'post-statement',
  template: `
    <h2>Post Statement</h2>

    Response:
    <pre>{{ response }}</pre>
  `,
})
export class PostStatementComponent {
  response?: string | null;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.postPassedStatement();
  }

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
}
