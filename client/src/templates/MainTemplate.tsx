import { Header } from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import { Props as MenuItemProps } from 'components/Header/MenuItem';

interface Props {
  children: React.ReactNode;
  headerItems: MenuItemProps[];
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 100vh;
  padding-top: 50px;
  margin: 0 auto;
`;

const StyledContent = styled.div`
  display: flex;
  height: 100%;
  margin-top: 150px;
  justify-content: center;
`;

export const MainTemplate: React.FC<Props> = ({ children, headerItems }) => {
  return (
    <StyledWrapper>
      <Header items={headerItems} />
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  );
};
