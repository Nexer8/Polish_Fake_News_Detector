import { Story, Meta } from '@storybook/react';

import { Header, Props } from 'components/Header';
import { headers } from 'constants/headers';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<Props> = (args) => <Header {...args} />;

export const Guest = Template.bind({});
Guest.args = {
  items: headers.client,
};

export const Login = Template.bind({});
Login.args = {
  items: headers.login,
};

export const Editor = Template.bind({});
Editor.args = {
  items: headers.editor,
};
