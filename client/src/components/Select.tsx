import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import { Icon } from 'components/Icon';
import arrowDownIcon from 'icons/arrow-down.svg';
import arrowUpIcon from 'icons/arrow-up.svg';
import useOutsideClick from 'hooks/useOutsideClick';

export type DropdownItem = {
  name: string;
  isRed?: boolean;
  isGreen?: boolean;
};

export interface Props {
  items: DropdownItem[];
  selectedItem?: DropdownItem;
  placeholder: string;
  onSelect: (selectedItem: DropdownItem) => void;
}

const StyledWrapper = styled.div<{ isGreen?: boolean; isRed?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 7px 34px 7px 11px;
  cursor: pointer;

  ${({ isGreen }) =>
    isGreen &&
    css`
      border-color: ${({ theme }) => theme.colors.green};

      ${StyledText} {
        color: ${({ theme }) => theme.colors.green};
      }
    `}

  ${({ isRed }) =>
    isRed &&
    css`
      border-color: ${({ theme }) => theme.colors.red};

      ${StyledText} {
        color: ${({ theme }) => theme.colors.red};
      }
    `}
`;

// TODO: remove outline on focus
const StyledDropdownList = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(32px);
  background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledDropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 7px 34px 7px 11px;

  background-color: ${({ theme, isSelected }) =>
    isSelected && theme.colors.mediumDark};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumDark};
  }
`;

const StyledText = styled.span``;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 11px;
`;

const StyledPlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.lightDark};
`;

export const Select: React.FC<Props> = ({
  items,
  placeholder,
  selectedItem,
  onSelect,
}) => {
  const componentRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useOutsideClick(componentRef, () => setDropdownOpen(false));

  return (
    <StyledWrapper
      ref={componentRef}
      isGreen={selectedItem?.isGreen}
      isRed={selectedItem?.isRed}
      onClick={() => setDropdownOpen(!isDropdownOpen)}
      tabIndex={0}
    >
      <StyledText>
        {selectedItem ? (
          selectedItem.name
        ) : (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
      </StyledText>
      <StyledIcon
        svg={isDropdownOpen ? arrowUpIcon : arrowDownIcon}
        alt={placeholder}
      />
      {isDropdownOpen && (
        <StyledDropdownList>
          {items.map((item) => (
            <StyledDropdownItem
              key={_.uniqueId()}
              isSelected={item.name === selectedItem?.name}
              tabIndex={0}
              onClick={() => onSelect(item)}
            >
              {item.name}
            </StyledDropdownItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledWrapper>
  );
};
