import { Story, Meta } from '@storybook/react';

import {
  CharacterCounter,
  Props,
} from 'client-pages/StatementVerifier/CharacterCounter';

export default {
  title: 'StatementVerifier/CharacterCounter',
  component: CharacterCounter,
} as Meta;

const Template: Story<Props> = (args) => <CharacterCounter {...args} />;

export const Valid = Template.bind({});
Valid.args = {
  currentCount: 5,
  maxCharacters: 255,
  isValid: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  currentCount: 267,
  maxCharacters: 255,
  isValid: false,
};
