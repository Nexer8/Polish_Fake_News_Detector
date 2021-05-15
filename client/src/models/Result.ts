import { VerdictType } from 'components/StatementEvaluation';

export interface IResult {
  id: string;
  probability: number;
  statement: string;
  verdict: VerdictType;
}
