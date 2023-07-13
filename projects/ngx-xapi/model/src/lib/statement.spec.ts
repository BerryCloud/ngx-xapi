import { Statement } from './statement';

describe('Statement', () => {
  it('should create an instance', () => {
    const statement: Statement = {
      id: '45e6dec1-789c-40ff-8f9b-a9428b33230d',
      actor: {
        mbox: 'mailto:sss@example.com',
        name: 'Example Actor',
        objectType: 'Agent',
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: {
          en: 'experienced',
        },
      },
      object: {
        id: 'http://example.com/activities/example-activity',
      },
      result: {
        completion: true,
        success: true,
        score: {
          scaled: 0.95,
          raw: 95,
          min: 0,
          max: 100,
        },
      },
      context: {
        registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
        contextActivities: {
          parent: [
            {
              id: 'http://example.com/activities/example-activity',
            },
          ],
        },
      },
      authority: {
        mbox: 'mailto:bob@example.com',
        name: 'Bob',
        objectType: 'Agent',
      },
      version: '1.0.0',
      timestamp: '2021-01-01T00:00:00.000Z',
      stored: '2021-01-01T00:00:00.000Z',
      attachments: [
        {
          usageType: 'http://example.com/attachment-usage/example-usage',
          display: {
            en: 'Example Attachment',
          },
          description: {
            en: 'Example Attachment Description',
          },
          contentType: 'text/plain',
          length: 0,
          sha2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        },
      ],
    };

    expect(statement).toBeTruthy();
  });
});
