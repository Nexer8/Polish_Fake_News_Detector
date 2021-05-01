import { Story, Meta } from '@storybook/react';

import { Input } from 'components/Input';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.',
  disabled: true,
};
