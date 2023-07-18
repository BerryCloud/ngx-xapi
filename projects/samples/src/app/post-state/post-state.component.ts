import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';

@Component({
  selector: 'post-state',
  templateUrl: './post-state.component.html',
})
export class PostStateComponent {
  response: string | undefined;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.sendState({ progress: 0.5 });
  }

  sendState(state: any) {
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
}
