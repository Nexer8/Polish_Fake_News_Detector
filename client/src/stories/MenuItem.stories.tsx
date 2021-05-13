import { Story, Meta } from '@storybook/react';

import { MenuItem, Props } from 'components/MenuItem';
import checkActive from 'icons/check-active.svg';
import checkInactive from 'icons/check-inactive.svg';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <MenuItem {...args} />;

export const CheckStatementActive = Template.bind({});
CheckStatementActive.args = {
  isActive: true,
  iconInactive: checkInactive,
  iconActive: checkActive,
  text: 'Sprawdź wypowiedź',
  path: '#',
};

export const CheckStatementInactive = Template.bind({});
CheckStatementInactive.args = {
  isActive: false,
  iconInactive: checkInactive,
  iconActive: checkActive,
  text: 'Sprawdź wypowiedź',
  path: '#',
};
