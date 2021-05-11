import { Story, Meta } from '@storybook/react';

import { Share, Props } from 'client-pages/StatementVerifier/Share';

export default {
  title: 'StatementVerifier/Share',
  component: Share,
} as Meta;

const Template: Story<Props> = (args) => <Share {...args} />;

export const Component = Template.bind({});
Component.args = { path: 'http://polityk-hunter.pl/119lix3' };
