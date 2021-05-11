import React from 'react';
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
  const handleAlertClose = (id: String) => {
    // TODO: store alerts either in context or redux
    console.log(id);
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
