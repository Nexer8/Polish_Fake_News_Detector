import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/Icon';
import warningIcon from 'icons/warning-red.svg';

export interface Props {
  currentCount: number;
  maxCharacters: number;
  isValid: boolean;
}

const StyledWrapper = styled.div<{ isValid: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.s};
  display: flex;
  align-items: center;
  color: ${({ theme, isValid }) => !isValid && theme.colors.red};

  span {
    margin-right: 7px;
  }
`;

export const CharacterCounter: React.FC<Props> = ({
  currentCount,
  maxCharacters,
  isValid,
}) => {
  return (
    <StyledWrapper isValid={isValid}>
      <span>
        Wprowadzone znaki: {currentCount}/{maxCharacters}
      </span>
      {!isValid && <Icon svg={warningIcon} alt="Warning" />}
    </StyledWrapper>
  );
};
