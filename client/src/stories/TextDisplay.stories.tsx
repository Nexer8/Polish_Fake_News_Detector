import { Story, Meta } from '@storybook/react';

import { TextDisplay, Props } from 'components/TextDisplay';

export default {
  title: 'Components/TextDisplay',
  component: TextDisplay,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (args) => (
  <TextDisplay {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique faucibus
    volutpat venenatis quisque sit egestas. Dapibus lectus blandit tempor, nulla
    sit adipiscing quis massa. Adipiscing eget est ipsum mauris in donec. Velit
    in at quam blandit ultricies et lorem leo, porta.
  </TextDisplay>
);

export const SmallFontWithBackground = Template.bind({});
SmallFontWithBackground.args = {
  isBgDark: true,
  isBiggerFont: false,
};

export const BigFontWithBackground = Template.bind({});
BigFontWithBackground.args = {
  isBgDark: true,
  isBiggerFont: true,
};

export const SmallFontWithBorder = Template.bind({});
SmallFontWithBorder.args = {
  isBgDark: false,
  isBiggerFont: false,
};

export const BigFontWithBorder = Template.bind({});
BigFontWithBorder.args = {
  isBgDark: false,
  isBiggerFont: true,
};
