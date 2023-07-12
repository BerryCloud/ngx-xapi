import { LanguageMap } from './language-map';

/**
 * This interface represents the xAPI Attachment object.
 *
 * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#attachments | xAPI Attachment}
 */
export interface Attachment {
  /**
   * Identifies the usage of this Attachment.
   */
  usageType: AttachmentUsageType | string;

  /**
   * Display name of this Attachment.
   */
  display: LanguageMap;

  /**
   * A description of the Attachment.
   */
  description?: LanguageMap;

  /**
   * The content type of the Attachment.
   */
  contentType: string;

  /**
   * The length of the Attachment data in octets.
   */
  length: number;

  /**
   * The SHA-2 hash of the Attachment data.
   */
  sha2: string;

  /**
   * An IRL at which the Attachment data can be retrieved, or from which it used to be retrievable.
   */
  fileUrl?: string;
}

/**
 * Predefined Attachment Usage Types.
 */
export enum AttachmentUsageType {
  SIGNATURE = 'http://adlnet.gov/expapi/attachments/signature',
}
