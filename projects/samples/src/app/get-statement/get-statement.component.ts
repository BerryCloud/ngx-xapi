import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';

@Component({
  selector: 'get-statement',
  template: `
    <h2>Get Statement</h2>

    Response:
    <pre>{{ response }}</pre>
  `,
})
export class GetStatementComponent {
  response: string | undefined;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.getStatement();
  }

  getStatement() {
    this.client.getStatement('e56a1fb3-a9aa-4405-a297-069fa1234c5a').subscribe({
      next: (response) =>
        (this.response = response.body
          ? JSON.stringify(response.body)
          : undefined),
      error: (error) => (this.response = error.message),
    });
  }
}
