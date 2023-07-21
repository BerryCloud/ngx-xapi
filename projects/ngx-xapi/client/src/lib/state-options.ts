export interface StateOptions {
  contentType: string;
  etag?: string;
  match?: boolean;
}

export type DeleteStateOptions = Omit<StateOptions, 'contentType'>;
