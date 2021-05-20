import { Story, Meta } from '@storybook/react';

import { Textarea } from 'components/Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
} as Meta;

const Template: Story = (args) => <Textarea {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
};

export const NotResizable = Template.bind({});
NotResizable.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
  isResizeable: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
  disabled: true,
};

export const BiggerFont = Template.bind({});
BiggerFont.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
  isBiggerFont: true,
};
