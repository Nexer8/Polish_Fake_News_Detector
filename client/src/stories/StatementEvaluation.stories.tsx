import React from 'react';
import { Story, Meta } from '@storybook/react';
import { theme } from 'theme/mainTheme';

import { StatementEvaluation, Props } from 'components/StatementEvaluation';

export default {
  title: 'Components/StatementEvaluation',
  component: StatementEvaluation,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <StatementEvaluation {...args} />;

export const Positive = Template.bind({});
Positive.args = {
  backgroundColor: theme.colors.green,
  probability: 97,
  verdict: 'Prawda',
};

export const Negative = Template.bind({});
Negative.args = {
  backgroundColor: theme.colors.red,
  probability: 97,
  verdict: 'Fałsz',
};
