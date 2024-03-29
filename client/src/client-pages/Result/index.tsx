import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import routes from 'routes';
import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'constants/headers';
import { Button } from 'components/Button';
import { TextDisplay } from 'components/TextDisplay';
import { Icon } from 'components/Icon';
import { StatementEvaluation } from 'components/StatementEvaluation';
import { Share } from 'client-pages/StatementVerifier/Share';
import reloadIcon from 'icons/reload.svg';
import infoIcon from 'icons/info.svg';
import flagIcon from 'icons/flag.svg';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { getResult, selectResult } from 'state/slices/clientSlice';

export interface Props {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin-bottom: 50px;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
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
  margin-bottom: 50px;
`;

const StyledStamentEvaluation = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ProblemsText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledHeader = styled.h2`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Result: React.FC<Props> = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const result = useAppSelector(selectResult);

  useEffect(() => {
    if (result?.id !== id) {
      dispatch(getResult(id));
    }
  }, [id, result?.id, dispatch]);

  return (
    <MainTemplate headerItems={headers.client}>
      {result && (
        <Container>
          <HeaderRow>
            <h2>Podejrzana wypowiedź</h2>
            <ButtonWrapper>
              <Button
                isFullWidth={true}
                title="Sprawdź inną"
                icon={reloadIcon}
                onClick={() => {
                  history.push(routes.statementVerifier);
                }}
              />
            </ButtonWrapper>
          </HeaderRow>
          <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
            {result.statement}
          </StyledTextDisplay>
          <HeaderRow>
            <h2>Ocena wypowiedzi przez model</h2>
            <Icon
              svg={infoIcon}
              hasTooltip={true}
              alt="Werdykt i pewność, z jaką go stwierdzamy"
            />
          </HeaderRow>
          <StyledStamentEvaluation>
            <StatementEvaluation
              probability={result.probability}
              verdict={result.verdict}
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
                  history.push(routes.resultReport.replace(':id', id));
                }}
              />
            </ButtonWrapper>
          </HeaderRow>
          <StyledHeader>Udostępnij wynik</StyledHeader>
          <Share path={window.location.href} />
        </Container>
      )}
    </MainTemplate>
  );
};
