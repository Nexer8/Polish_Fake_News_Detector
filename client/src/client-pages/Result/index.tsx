import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'headers';
import { Button } from 'components/Button';
import { TextDisplay } from 'components/TextDisplay';
import { Icon } from 'components/Icon';
import {
  StatementEvaluation,
  VerdictType,
} from 'components/StatementEvaluation';
import { Share } from 'client-pages/StatementVerifier/Share';
import reloadIcon from 'icons/reload.svg';
import infoIcon from 'icons/info.svg';
import flagIcon from 'icons/flag.svg';
import Routes from 'routes';

interface Props {
  text: string;
  probability: number;
  verdict: VerdictType;
  path: string;
}

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 150px;
`;

const StyledTextDisplay = styled(TextDisplay)`
  margin-top: 30px;
  margin-bottom: 60px;
`;

const StyledStamentEvaluation = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
`;

const ProblemsText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledHeader = styled.h2`
  margin-top: 50px;
  margin-bottom: 35px;
`;

export const Result: React.FC<Props> = ({
  text,
  probability,
  verdict,
  path,
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  return (
    <MainTemplate headerItems={headers.client}>
      <Container>
        <HeaderRow>
          <h2>Podejrzana wypowiedź</h2>
          <ButtonWrapper>
            <Button
              isFullWidth={true}
              title="Sprawdź inną"
              icon={reloadIcon}
              onClick={() => {
                history.push(Routes.statementVerifier);
              }}
            />
          </ButtonWrapper>
        </HeaderRow>
        <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
          {text}
        </StyledTextDisplay>
        <HeaderRow>
          <h2>Ocena wypowiedzi przez model</h2>
          <Icon svg={infoIcon} alt="Information icon" />
        </HeaderRow>
        <StyledStamentEvaluation>
          <StatementEvaluation
            probability={probability}
            verdict={verdict}
          ></StatementEvaluation>
        </StyledStamentEvaluation>
        <HeaderRow>
          <ProblemsText>
            Jeśli masz wątpliwości, przekaż wynik do weryfikacji.
          </ProblemsText>
          <ButtonWrapper>
            <Button
              isFullWidth={true}
              title="Zgłoś wynik"
              icon={flagIcon}
              onClick={() => {
                history.push(Routes.resultReport.replace(':id', id));
              }}
            />
          </ButtonWrapper>
        </HeaderRow>
        <StyledHeader>Udostępnij wynik</StyledHeader>
        <Share path={path} />
      </Container>
    </MainTemplate>
  );
};
