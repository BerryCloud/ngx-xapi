import { Attachment } from './attachment';

describe('Attachment', () => {
  it('should create an instance', () => {
    const attachment: Attachment = {
      usageType: 'http://adlnet.gov/expapi/attachments/signature',
      display: {
        en: 'Signature',
      },
      contentType: 'application/octet-stream',
      length: 0,
      sha2: '1234567890abcdef',
    };

    expect(attachment).toBeTruthy();
  });
});
