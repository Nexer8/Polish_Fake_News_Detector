import { Header } from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import flagActive from 'icons/flag.svg';
import flagInactive from 'icons/flag-inactive.svg';
import logoutActive from 'icons/logout-active.svg';
import logoutInactive from 'icons/logout-inactive.svg';
import routes from 'routes';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
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
`;

const StyledSidebar = styled.div`
  position: relative;
  display: flex;
  width: 20%;
  padding-right: 50px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    right: 0;
    top: 0;
    height: 200px;
    border-right: 1px solid ${({ theme }) => theme.colors.mediumDark};
  }
`;

const StyledChildren = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`;

export const SidebarTemplate: React.FC<Props> = ({ children, sidebar }) => {
  return (
    <StyledWrapper>
      <Header
        items={[
          {
            path: routes.editorReports,
            isActive: true,
            text: 'Zgłoszenia',
            iconActive: flagActive,
            iconInactive: flagInactive,
          },
          {
            path: routes.editorLogin,
            isActive: false,
            text: 'Wyloguj',
            iconActive: logoutActive,
            iconInactive: logoutInactive,
          },
        ]}
      />
      <StyledContent>
        <StyledSidebar>{sidebar}</StyledSidebar>
        <StyledChildren>{children}</StyledChildren>
      </StyledContent>
    </StyledWrapper>
  );
};
