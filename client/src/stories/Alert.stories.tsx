import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Alert, AlertType, Props } from 'components/Alerts/Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta;

const Template: Story<Props> = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  id: '0',
  message: 'Lorem ipsum dolor sit success message',
  onCloseClick: (id: string) => {},
};

export const Error = Template.bind({});
Error.args = {
  id: '0',
  type: AlertType.ERROR,
  message: 'Lorem ipsum dolor sit error message',
  onCloseClick: (id: string) => {},
};
