import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import routes from 'routes';
import { selectAlerts } from 'state/slices/alertSlice';
import {
  checkSessionAsync,
  selectEditorLoggedIn,
  selectEditorStatus,
} from 'state/slices/editorSlice';
import { selectClientStatus } from 'state/slices/clientSlice';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { EditorReports } from 'editor-pages/EditorReports';
import { EditorReport } from 'editor-pages/EditorReport';
import { EditorLogin } from 'editor-pages/EditorLogin';
import { Result } from 'client-pages/Result';
import { ResultReport } from 'client-pages/ResultReport';
import { StatementVerifier } from 'client-pages/StatementVerifier';
import { Alerts } from 'components/Alerts';
import { Spinner } from 'components/Spinner';

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
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);

  const alerts = useAppSelector(selectAlerts);
  const editorStatus = useAppSelector(selectEditorStatus);
  const clientStatus = useAppSelector(selectClientStatus);

  const isLoggedIn = useAppSelector(selectEditorLoggedIn);

  useEffect(() => {
    dispatch(checkSessionAsync());
  }, [dispatch]);

  useEffect(() => {
    setLoading(editorStatus === 'loading' || clientStatus === 'loading');
  }, [editorStatus, clientStatus]);

  return (
    <>
      <Alerts alerts={alerts} />
      {isLoading && (
        <StyledSpinnerWrapper>
          <Spinner />
        </StyledSpinnerWrapper>
      )}
      <BrowserRouter>
        {isLoggedIn ? (
          <Switch>
            <Route path={routes.editorReport} exact>
              <EditorReport />
            </Route>
            <Route path={routes.editorReports} exact>
              <EditorReports />
            </Route>
            <Route
              path={routes.wildcard}
              render={() => (
                <Redirect
                  to={{
                    pathname: routes.editorReports,
                    search: new URLSearchParams(
                      window.location.search,
                    ).toString(),
                  }}
                />
              )}
            />
          </Switch>
        ) : (
          <Switch>
            <Route path={routes.editorLogin} exact>
              <EditorLogin />
            </Route>
            <Route path={routes.result} exact>
              <Result />
            </Route>
            <Route path={routes.resultReport} exact>
              <ResultReport />
            </Route>
            <Route path={routes.statementVerifier} exact>
              <StatementVerifier />
            </Route>
            <Route
              path={routes.wildcard}
              render={() => (
                <Redirect
                  to={{
                    pathname: routes.statementVerifier,
                    search: new URLSearchParams(
                      window.location.search,
                    ).toString(),
                  }}
                />
              )}
            />
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
};

export default Root;
