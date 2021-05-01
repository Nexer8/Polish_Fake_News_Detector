import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input, Props } from 'components/Input';
import infoIcon from 'icons/info.svg';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  value: '',
  placeholder: 'Enter a value...',
  icon: infoIcon,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: '',
  placeholder: 'Disabled state',
  isDisabled: true,
  icon: infoIcon,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

export const Password = Template.bind({});
Password.args = {
  value: 'abc',
  placeholder: 'Password',
  type: 'password',
  icon: infoIcon,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};
