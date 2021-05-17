import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import routes from 'routes';
import { EditorReports } from 'editor-pages/EditorReports';
import { EditorReport } from 'editor-pages/EditorReport';
import { EditorLogin } from 'editor-pages/EditorLogin';
import { Result } from 'client-pages/Result';
import { ResultReport } from 'client-pages/ResultReport';
import { StatementVerifier } from 'client-pages/StatementVerifier';
import { VerdictType } from 'components/StatementEvaluation';
import { IResult } from 'models/Result';
import { IReport } from 'models/Report';

const testResultData: IResult = {
  statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  verdict: VerdictType.TRUTH,
  probability: 97,
  id: 'chyba-niepotrzebne-bo-jest-w-url',
};

const testReportData: IReport = {
  id: 'lorem',
  category: 'Finanse',
  comment: 'Zaraz mi odpadnie łapa',
  date: '29.12.2020',
  politician: 'Mateusz Morawiecki',
  reporter: 'jan.doewski@a.pl',
  result: testResultData,
};

const Root: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={routes.editorReport} exact>
            <EditorReport report={testReportData} />
          </Route>
          <Route path={routes.editorReports} exact>
            <EditorReports />
          </Route>
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
            render={() => <Redirect to={routes.statementVerifier} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
