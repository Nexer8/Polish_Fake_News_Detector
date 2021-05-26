import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import routes from 'routes';
import { selectAlerts } from 'state/slices/alertSlice';
import { selectEditorStatus } from 'state/slices/editorSlice';
import { useAppSelector } from 'state/hooks';
import { EditorReports } from 'editor-pages/EditorReports';
import { EditorReport } from 'editor-pages/EditorReport';
import { EditorLogin } from 'editor-pages/EditorLogin';
import { Result } from 'client-pages/Result';
import { ResultReport } from 'client-pages/ResultReport';
import { StatementVerifier } from 'client-pages/StatementVerifier';
import { VerdictType } from 'components/StatementEvaluation';
import { IResult } from 'models/Result';
import { Alerts } from 'components/Alerts';
import { Spinner } from 'components/Spinner';

const testResultData: IResult = {
  statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  verdict: VerdictType.TRUTH,
  probability: 97,
  id: 'chyba-niepotrzebne-bo-jest-w-url',
};

const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  ${Spinner} {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${({ theme }) => theme.zindex.alwaysVisible};
  }
`;

const Root: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const alerts = useAppSelector(selectAlerts);
  const editorStatus = useAppSelector(selectEditorStatus);

  useEffect(() => {
    setLoading(editorStatus === 'loading');
  }, [editorStatus]);

  return (
    <>
      <Alerts alerts={alerts} />
      {isLoading && (
        <StyledSpinnerWrapper>
          <Spinner />
        </StyledSpinnerWrapper>
      )}
      <BrowserRouter>
        <Switch>
          <Route path={routes.editorReport} exact>
            <EditorReport />
          </Route>
          <Route path={routes.editorReports} exact>
            <EditorReports />
          </Route>
          <Route path={routes.editorLogin} exact>
            <EditorLogin />
          </Route>
          <Route path={routes.result} exact>
            <Result result={testResultData} />
          </Route>
          <Route path={routes.resultReport} exact>
            <ResultReport />
          </Route>
          <Route path={routes.statementVerifier} exact>
            <StatementVerifier />
          </Route>
          <Route
            path={routes.wildcard}
            render={() => <Redirect to={routes.statementVerifier} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
