import { Icon } from 'components/Icon';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import closeIcon from 'icons/close.svg';

export enum AlertType {
  ERROR = 'Error',
  SUCCESS = 'Success',
}

export interface IAlert {
  id: string;
  message: string;
  type?: AlertType;
  durationMs?: number;
}

export interface Props {
  id: string;
  message: string;
  type?: AlertType;
  durationMs?: number;
  onCloseClick: (id: string) => void;
}

const StyledAlert = styled.div<{ type: AlertType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 7px 11px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.green};
  font-size: ${({ theme }) => theme.fontSize.s};

  ${({ type }) =>
    type === AlertType.ERROR &&
    css`
      background-color: ${({ theme }) => theme.colors.red};
    `}

  button {
    display: flex;
    background: none;
    border: none;
  }
`;

export const Alert: React.FC<Props> = ({
  id,
  message,
  type = AlertType.SUCCESS,
  durationMs = 3000,
  onCloseClick,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseClick(id);
    }, durationMs);
  }, [id, durationMs, onCloseClick]);

  return (
    <StyledAlert type={type}>
      {message}
      <button type="button" onClick={() => onCloseClick(id)}>
        <Icon svg={closeIcon} alt="Close" />
      </button>
    </StyledAlert>
  );
};
