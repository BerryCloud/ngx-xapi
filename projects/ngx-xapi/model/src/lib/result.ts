import { Extensions } from './extensions';
import { Score } from './score';

export interface Result {
  score?: Score;
  success?: boolean;
  completion?: boolean;
  response?: string;
  duration?: string; // This should be a duration
  extensions?: Extensions;
}
