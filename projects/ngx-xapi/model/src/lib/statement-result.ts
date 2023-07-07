import { Statement } from './statement';

export interface StatementResult {
  statements: Statement[];
  more: string | null; // IRL
}
