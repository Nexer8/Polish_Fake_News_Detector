import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  StatementEvaluation,
  Props,
  VerdictType,
} from 'components/StatementEvaluation';

export default {
  title: 'Components/StatementEvaluation',
  component: StatementEvaluation,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <StatementEvaluation {...args} />;

export const Positive = Template.bind({});
Positive.args = {
  probability: 97,
  verdict: VerdictType.TRUTH,
};

export const Negative = Template.bind({});
Negative.args = {
  probability: 97,
  verdict: VerdictType.FAKE,
};
