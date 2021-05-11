import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Alerts, Props } from 'components/Alerts';
import { AlertType } from 'components/Alerts/Alert';

export default {
  title: 'Components/Alerts',
  component: Alerts,
} as Meta;

const Template: Story<Props> = (args) => <Alerts {...args} />;

export const DefaultArray = Template.bind({});
DefaultArray.args = {
  alerts: [
    {
      id: '0',
      type: AlertType.ERROR,
      message: 'Lorem ipsum dolor sit error message',
    },
    {
      id: '1',
      message:
        'Lorem ipsum dolor sit success message. This is the longest message lorem ipsum dolor sit amet test one two three.',
    },
    {
      id: '2',
      type: AlertType.ERROR,
      message: 'Lorem ipsum dolor sit error message',
    },
  ],
};
