import { Header } from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import checkActive from 'icons/check-active.svg';
import checkInactive from 'icons/check-inactive.svg';
import plusActive from 'icons/plus-active.svg';
import plusInactive from 'icons/plus-inactive.svg';
import infoActive from 'icons/plus-active.svg';
import infoInactive from 'icons/plus-inactive.svg';
import routers from 'routes';

interface Props {
  children: React.ReactNode;
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

export const MainTemplate: React.FC<Props> = ({ children }) => {
  return (
    <StyledWrapper>
      <Header
        items={[
          {
            path: routers.statementVerifier,
            isActive: true,
            text: 'Sprawdź wypowiedź',
            iconActive: plusActive,
            iconInactive: plusInactive,
          },
          {
            path: '#',
            isActive: false,
            text: 'Zweryfikowane wypowiedzi',
            iconActive: checkActive,
            iconInactive: checkInactive,
          },
          {
            path: '#',
            isActive: false,
            text: 'Informacje',
            iconActive: infoActive,
            iconInactive: infoInactive,
          },
        ]}
      />
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  );
};
