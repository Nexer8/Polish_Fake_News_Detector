import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, Props } from 'components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Example = Template.bind({});
