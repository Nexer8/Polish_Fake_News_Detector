import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Navigation, NavigationItem, Props } from 'components/Navigation';
import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import bookIcon from 'icons/book.svg';

export default {
  title: 'Components/Navigation',
  component: Navigation,
} as Meta;

const Template: Story<Props> = (args) => <Navigation {...args} />;

export const Review = Template.bind({});
Review.args = {
  selectedItem: {
    name: 'Zgłaszany wynik',
    icon: eyeIcon,
  },
  items: [
    {
      name: 'Formularz',
      icon: penIcon,
    },
    {
      name: 'Zgłaszany wynik',
      icon: eyeIcon,
    },
  ],
  onItemClick: (item) => {
    console.log(item);
  },
};

export const Report = Template.bind({});
Report.args = {
  selectedItem: {
    name: 'Zgłaszany wynik',
    icon: eyeIcon,
  },
  items: [
    {
      name: 'Zgłaszany wynik',
      icon: eyeIcon,
    },
    {
      name: 'Szczegóły',
      icon: bookIcon,
    },
    {
      name: 'Recenzja',
      icon: penIcon,
    },
  ],
  onItemClick: (item) => {
    console.log(item);
  },
};
