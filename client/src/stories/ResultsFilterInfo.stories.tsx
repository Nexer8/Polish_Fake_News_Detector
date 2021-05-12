import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ResultsFilterInfo, Props } from 'components/ResultsFilterInfo';

export default {
  title: 'Components/ResultsFilterInfo',
  component: ResultsFilterInfo,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <ResultsFilterInfo {...args} />;

export const NoFilter = Template.bind({});
NoFilter.args = {
  content: 'Wyświetlane są wszystkie zgłoszenia',
};

export const Filter = Template.bind({});
Filter.args = {
  content: 'Wyświetlane są przefiltrowane zgłoszenia',
};
