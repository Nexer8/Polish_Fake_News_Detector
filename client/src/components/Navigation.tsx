import React from 'react';
import styled from 'styled-components';

import menuIcon from 'icons/menu-darker.svg';
import { Icon } from './Icon';
import { Button } from './Button';
import { theme } from 'theme/mainTheme';

export type NavigationItem = {
  name: string;
  icon: string;
};

export interface Props {
  items: NavigationItem[];
  selectedItem: NavigationItem;
  onItemClick: (item: NavigationItem) => void;
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.lightDark};
  font-size: ${({ theme }) => theme.fontSize.s};

  span {
    margin-left: 11px;
  }
`;

const StyledButton = styled.div`
  margin-bottom: 10px;
`;

export const Navigation: React.FC<Props> = ({
  selectedItem,
  items,
  onItemClick,
}) => {
  return (
    <StyledWrapper>
      <StyledTitle>
        <Icon svg={menuIcon} alt="Nawigacja" />
        <span>Nawigacja</span>
      </StyledTitle>
      {items.map((item) => (
        <StyledButton key={item.name}>
          <Button
            backgroundColor={
              item.name === selectedItem.name
                ? theme.colors.lightDark
                : theme.colors.mediumDark
            }
            title={item.name}
            icon={item.icon}
            isFullWidth
            onClick={() => onItemClick(item)}
          />
        </StyledButton>
      ))}
    </StyledWrapper>
  );
};
