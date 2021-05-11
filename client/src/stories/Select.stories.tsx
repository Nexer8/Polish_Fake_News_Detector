import { Story, Meta } from '@storybook/react';

import { Select, Props, DropdownItem } from 'components/Select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const Template: Story<Props> = (args) => <Select {...args} />;

const items: DropdownItem[] = [
  {
    name: 'Item 1',
  },
  {
    name: 'Truth',
    isGreen: true,
  },
  {
    name: 'False',
    isRed: true,
  },
];

export const InitialState = Template.bind({});
InitialState.args = {
  items,
  placeholder: 'Choose your option...',
  onSelect: (selectedItem: DropdownItem) => {
    console.log(selectedItem);
  },
};

export const WithGreenOptionSelected = Template.bind({});
WithGreenOptionSelected.args = {
  items,
  selectedItem: {
    name: 'Truth',
    isGreen: true,
  },
  placeholder: 'Choose your option...',
  onSelect: (selectedItem: DropdownItem) => {
    console.log(selectedItem);
  },
};
