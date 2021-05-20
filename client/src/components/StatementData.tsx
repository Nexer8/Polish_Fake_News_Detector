import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/Icon';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 7px 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
  b {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const RightSide = styled.div``;

export interface Props {
  category: string;
  content: string;
  icon: string;
}

export const StatementData: React.FC<Props> = ({ category, content, icon }) => {
  return (
    <Container>
      <LeftSide>
        <b>{category}: </b>
        <span>{content}</span>
      </LeftSide>
      <RightSide>
        <Icon svg={icon} alt={category} />
      </RightSide>
    </Container>
  );
};
