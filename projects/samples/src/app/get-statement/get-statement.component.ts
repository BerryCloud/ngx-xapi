import { Component } from '@angular/core';
import { XapiClient } from '@berry-cloud/ngx-xapi/client';

@Component({
  selector: 'get-statement',
  templateUrl: './get-statement.component.html',
})
export class GetStatementComponent {
  response: string | undefined;

  constructor(private client: XapiClient) {}

  ngOnInit(): void {
    this.getStatement();
  }

  getStatement() {
    this.client.getStatement('789df5ee-79ad-4629-a119-62b71a1f2bed').subscribe({
      next: (response) =>
        (this.response = response.body
          ? JSON.stringify(response.body)
          : undefined),
      error: (error) => (this.response = error.message),
    });
  }
}
