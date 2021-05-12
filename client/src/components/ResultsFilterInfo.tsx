import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/Icon';
import infoIcon from 'icons/info.svg';

const Container = styled.div`
  display: flex;

  span {
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ theme }) => theme.colors.lightDark};
    margin-left: 10px;
  }
`;

export interface Props {
  content: string;
}

export const ResultsFilterInfo: React.FC<Props> = ({ content }) => {
  return (
    <Container>
      <Icon svg={infoIcon} alt="navigation indicator" />
      <span>{content}</span>
    </Container>
  );
};
