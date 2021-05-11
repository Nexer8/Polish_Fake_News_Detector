import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/Icon';
import clipboardIcon from 'icons/clipboard.svg';

export interface Props {
  path: string;
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 7px 11px;
  cursor: pointer;
`;

export const Share: React.FC<Props> = ({ path }) => {
  const handleClick = () => {
    // TODO: display custom success/error alerts
    navigator.clipboard
      .writeText(path)
      .then((_) => {
        console.log('Path copied to clipboard');
      })
      .catch((_) => {
        console.log('Failed copying to clipboard');
      });
  };

  return (
    <StyledWrapper tabIndex={0} onClick={handleClick}>
      <span>{path}</span>
      <Icon svg={clipboardIcon} alt="Share link" />
    </StyledWrapper>
  );
};
