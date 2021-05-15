import React from 'react';
import styled from 'styled-components';

import closeIcon from 'icons/close.svg';
import categoryIcon from 'icons/finance.svg';
import calendarIcon from 'icons/calendar.svg';
import politicianIcon from 'icons/user.svg';
import { Button } from 'components/Button';
import { StatementData } from 'components/StatementData';
import { IReport } from 'models/Report';
import { TextDisplay } from 'components/TextDisplay';

export interface Props {
  report: IReport;
  onReviewClick: (id: string) => void;
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
  color: ${({ theme }) => theme.colors.lightDark};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextDisplay = styled(TextDisplay)`
  margin: 15px 0;
`;

const StyledStatementDataWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Report: React.FC<Props> = ({ report, onReviewClick }) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledTitle>Zgłoszenie {report.id}</StyledTitle>
        <Button
          title="Zrecenzuj"
          icon={closeIcon}
          onClick={() => onReviewClick(report.id)}
        />
      </StyledHeader>
      <StyledTextDisplay>{report.result.statement}</StyledTextDisplay>
      {report.politician && (
        <StyledStatementDataWrapper>
          <StatementData
            category="Polityk"
            content={report.politician}
            icon={politicianIcon}
          />
        </StyledStatementDataWrapper>
      )}
      {report.date && (
        <StyledStatementDataWrapper>
          <StatementData
            category="Data"
            content={report.date}
            icon={calendarIcon}
          />
        </StyledStatementDataWrapper>
      )}
      {report.category && (
        <StyledStatementDataWrapper>
          <StatementData
            category="Kategoria"
            content={report.category}
            icon={categoryIcon}
          />
        </StyledStatementDataWrapper>
      )}
    </StyledWrapper>
  );
};
