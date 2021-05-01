import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ReturnButton, Props } from 'components/ReturnButton';

export default {
  title: 'Components/ReturnButton',
  component: ReturnButton,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <ReturnButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  content: 'Wróć do wszystkich ogłoszeń',
};
