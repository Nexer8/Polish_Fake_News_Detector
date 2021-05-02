import React from 'react';
import { Story, Meta } from '@storybook/react';
import { theme } from 'theme/mainTheme';

import { Button, Props } from 'components/Button';
import reloadIcon from 'icons/reload.svg';
import flagIcon from 'icons/flag.svg';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default',
  icon: reloadIcon,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
};

export const Failed = Template.bind({});
Failed.args = {
  title: 'Fail',
  icon: flagIcon,
  backgroundColor: theme.colors.red,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
};
