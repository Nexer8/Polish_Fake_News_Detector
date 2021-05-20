import React from 'react';
import { Story, Meta } from '@storybook/react';

import { StatementData, Props } from 'components/StatementData';
import calendar from 'icons/calendar.svg';
import finance from 'icons/finance.svg';
import user from 'icons/user.svg';

export default {
  title: 'Components/StatementData',
  component: StatementData,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <StatementData {...args} />;

export const Politic = Template.bind({});
Politic.args = {
  category: 'Polityk',
  content: 'Mateusz Morawiecki',
  icon: user,
};

export const EventDate = Template.bind({});
EventDate.args = {
  category: 'Date',
  content: '29 sierpnia 2020',
  icon: calendar,
};

export const Category = Template.bind({});
Category.args = {
  category: 'Kategoria',
  content: 'Finanse',
  icon: finance,
};
