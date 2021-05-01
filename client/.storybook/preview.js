import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../src/theme/GlobalStyle';
import { theme } from '../src/theme/mainTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: 'hsl(220, 9%, 13%)',
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];
