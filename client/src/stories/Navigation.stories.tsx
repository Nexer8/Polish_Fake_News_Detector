import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Navigation, Props } from 'components/Navigation';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Navigation {...args} />;

export const NoFilter = Template.bind({});
NoFilter.args = {
  content: 'Wyświetlane są wszystkie zgłoszenia',
};

export const Filter = Template.bind({});
Filter.args = {
  content: 'Wyświetlane są przefiltrowane zgłoszenia',
};
