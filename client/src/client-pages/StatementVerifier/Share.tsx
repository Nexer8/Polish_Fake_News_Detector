import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { Icon } from 'components/Icon';
import clipboardIcon from 'icons/clipboard.svg';
import { AlertType, IAlert } from 'components/Alerts/Alert';
import { addAlert } from 'state/slices/alertSlice';
import { useAppDispatch } from 'state/hooks';

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
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigator.clipboard
      .writeText(path)
      .then(() => {
        dispatch(
          addAlert({
            id: _.uniqueId(),
            message: 'Skopiowano do schowka',
            type: AlertType.SUCCESS,
          } as IAlert),
        );
      })
      .catch(() => {
        addAlert({
          id: _.uniqueId(),
          message: 'Nie udało się skopiować do schowka',
          type: AlertType.ERROR,
        } as IAlert);
      });
  };

  return (
    <StyledWrapper tabIndex={0} onClick={handleClick}>
      <span>{path}</span>
      <Icon svg={clipboardIcon} alt="Share link" />
    </StyledWrapper>
  );
};
