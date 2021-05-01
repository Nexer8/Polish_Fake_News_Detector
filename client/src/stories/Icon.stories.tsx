import { Story, Meta } from '@storybook/react';

import { Icon, Props } from 'components/Icon';
import infoIcon from 'icons/info.svg';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => <Icon {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  svg: infoIcon,
  alt: 'info',
};

export const Bigger = Template.bind({});
Bigger.args = {
  svg: infoIcon,
  alt: 'info',
  size: 64,
};

export const DisplayTooltip = Template.bind({});
DisplayTooltip.args = {
  svg: infoIcon,
  alt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique faucibus volutpat venenatis quisque sit egestas. Dapibus lectus blandit tempor, nulla sit adipiscing quis massa. Adipiscing eget est ipsum mauris in donec. Velit in at quam blandit ultricies et lorem leo, porta.',
  hasTooltip: true,
};
