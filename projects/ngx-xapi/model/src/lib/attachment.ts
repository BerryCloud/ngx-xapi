import { LanguageMap } from './language-map';

export interface Attachment {
  usageType: AttachmentUsageType | string;
  display: LanguageMap;
  contentType: string;
  length: number;
  sha2: string;
  description?: LanguageMap;
  fileUrl?: string;
}

export enum AttachmentUsageType {
  SIGNATURE = 'http://adlnet.gov/expapi/attachments/signature',
}
