import React from 'react';
import { useAppDispatch } from 'state/hooks';
import { removeAlert } from 'state/slices/alertSlice';
import styled from 'styled-components';
import { Alert, IAlert } from './Alert';

export interface Props {
  alerts: IAlert[];
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const Alerts: React.FC<Props> = ({ alerts }) => {
  const dispatch = useAppDispatch();

  const handleAlertClose = (id: string) => {
    dispatch(removeAlert(id));
  };

  return (
    <StyledWrapper>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          message={alert.message}
          durationMs={alert.durationMs}
          type={alert.type}
          onCloseClick={handleAlertClose}
        />
      ))}
    </StyledWrapper>
  );
};
