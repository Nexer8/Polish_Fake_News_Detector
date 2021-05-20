import { IResult } from './Result';

export interface IReport {
  id: string;
  category?: string;
  comment: string;
  date?: string;
  politician?: string;
  reporter: string; // e-mail
  result: IResult;
}
