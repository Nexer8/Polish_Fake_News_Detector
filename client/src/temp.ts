import { VerdictType } from 'components/StatementEvaluation';
import { IReport } from 'models/Report';

export const REPORTS: IReport[] = [
  {
    id: '123',
    comment: 'Lorem ipsum dolor sit amet.',
    reporter: 'john.doe@gmail.com',
    politician: 'Jane Someone',
    category: 'Finances',
    date: new Date().toLocaleDateString(),
    result: {
      id: '111',
      probability: 80,
      statement:
        'Lorem ipsum dolor sit amet something else this is a long statement.',
      verdict: VerdictType.TRUTH,
    },
  },
  {
    id: '321',
    comment: 'Lorem ipsum dolor sit amet.',
    reporter: 'john.doe@gmail.com',
    politician: 'Jane Someone Else',
    date: new Date().toLocaleDateString(),
    result: {
      id: '321',
      probability: 76,
      statement:
        'Lorem ipsum dolor sit amet something else this is a long statement.',
      verdict: VerdictType.FAKE,
    },
  },
];
