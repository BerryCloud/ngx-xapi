import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';

@Component({
  selector: 'get-state',
  template: `
    <h2>Get State</h2>

    Response:
    <pre>{{ response }}</pre>
  `,
})
export class GetStateComponent {
  response: any;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.getState();
  }

  getState() {
    this.client
      .getState<object>({
        activityId: 'https://example.com/activity',
        agent: {
          mbox: 'mailto:another@example.com',
        },
        stateId: 'progress',
      })
      .subscribe({
        next: (response) => (this.response = JSON.stringify(response.body)),
        error: (error) => (this.response = error.message),
      });
  }
}
