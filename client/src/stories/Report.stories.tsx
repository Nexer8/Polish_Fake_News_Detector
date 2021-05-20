import { Story, Meta } from '@storybook/react';
import { VerdictType } from 'components/StatementEvaluation';

import { Report, Props } from 'editor-pages/EditorReports/Report';

export default {
  title: 'EditorReports/Report',
  component: Report,
} as Meta;

const Template: Story<Props> = (args) => <Report {...args} />;

export const Default = Template.bind({});
Default.args = {
  report: {
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
  onReviewClick: (id: string) => {
    console.log(id);
  },
};

export const MissingCategory = Template.bind({});
MissingCategory.args = {
  report: {
    id: '123',
    comment: 'Lorem ipsum dolor sit amet.',
    reporter: 'john.doe@gmail.com',
    politician: 'Jane Someone',
    date: new Date().toLocaleDateString(),
    result: {
      id: '111',
      probability: 80,
      statement:
        'Lorem ipsum dolor sit amet something else this is a long statement.',
      verdict: VerdictType.TRUTH,
    },
  },
  onReviewClick: (id: string) => {
    console.log(id);
  },
};

export const NoData = Template.bind({});
NoData.args = {
  report: {
    id: '123',
    comment: 'Lorem ipsum dolor sit amet.',
    reporter: 'john.doe@gmail.com',
    result: {
      id: '111',
      probability: 80,
      statement:
        'Lorem ipsum dolor sit amet something else this is a long statement.',
      verdict: VerdictType.TRUTH,
    },
  },
  onReviewClick: (id: string) => {
    console.log(id);
  },
};
