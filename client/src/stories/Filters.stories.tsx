import { Story, Meta } from '@storybook/react';

import { Filters, Props } from 'editor-pages/EditorReports/Filters';

export default {
  title: 'EditorReports/Filters',
  component: Filters,
} as Meta;

const Template: Story<Props> = (args) => <Filters {...args} />;

export const Default = Template.bind({});
Default.args = {
  onApplyClick: () => {},
  onResetClick: () => {},
};
