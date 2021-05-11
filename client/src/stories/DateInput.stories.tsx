import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DateInput, Props } from 'components/DateInput';
import infoIcon from 'icons/info.svg';

export default {
  title: 'Components/DateInput',
  component: DateInput,
} as Meta;

const Template: Story<Props> = (args) => <DateInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Data wypowiedzi od...',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};
