import React from 'react';
import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'headers';

interface Props {
  // TODO: define props here
}

export const StatementVerifier: React.FC<Props> = () => {
  return (
    <MainTemplate headerItems={headers.client}>StatementVerifier</MainTemplate>
  );
};
