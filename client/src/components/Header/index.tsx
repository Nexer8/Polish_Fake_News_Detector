import React from 'react';
import styled from 'styled-components';
import _uniqueId from 'lodash/uniqueId';

import Routes from 'routes';
import { MenuItem, Props as MenuItemProps } from 'components/Header/MenuItem';
import logo from 'icons/logo.svg';
import { useAppDispatch } from 'state/hooks';
import { logoutAsync } from 'state/slices/editorSlice';

export interface Props {
  items: MenuItemProps[];
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const MenuItemWrapper = styled.div`
  margin-left: 30px;
`;

export const Header: React.FC<Props> = ({ items }) => {
  const dispatch = useAppDispatch();

  const handleOnClick = (text: string) => {
    if (text === 'Wyloguj') {
      dispatch(logoutAsync());
    }
  };

  return (
    <Container>
      <MenuItem
        path={Routes.statementVerifier}
        isActive={true}
        text="Weryfikator"
        iconActive={logo}
        iconInactive={logo}
      />

      <LeftSide>
        {items.map((item) => (
          <MenuItemWrapper key={_uniqueId()}>
            <MenuItem
              path={item.path}
              isActive={item.isActive}
              text={item.text}
              iconActive={item.iconActive}
              iconInactive={item.iconInactive}
              onClick={handleOnClick}
            />
          </MenuItemWrapper>
        ))}
      </LeftSide>
    </Container>
  );
};
