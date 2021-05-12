import { Story, Meta } from '@storybook/react';

import { Spinner } from 'components/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta;

const Template: Story = (args) => <Spinner {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};