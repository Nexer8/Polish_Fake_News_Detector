import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import _ from 'lodash';

import routes from 'routes';
import useQueryParams from 'hooks/useQueryParams';
import { headers } from 'headers';
import { SidebarTemplate } from 'templates/SidebarTemplate';
import { Report } from 'editor-pages/EditorReports/Report';
import { ResultsFilterInfo } from 'components/ResultsFilterInfo';
import { IReport } from 'models/Report';
import {
  Filters,
  FiltersFormType,
  CATEGORY_FIELD,
  DATE_FROM_FIELD,
  DATE_TO_FIELD,
  POLITICIAN_FIELD,
  QueryParamsType,
} from 'editor-pages/EditorReports/Filters';

interface Props {
  reports: IReport[];
}

const StyledReportsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const StyledInfoWrapper = styled.div`
  margin-bottom: 50px;
`;

const StyledReportWrapper = styled.div`
  margin-bottom: 50px;
`;

export const EditorReports: React.FC<Props> = ({ reports }) => {
  const history = useHistory();
  const queryParams = useQueryParams();

  const handleFiltersChange = (values: FiltersFormType) => {
    const urlSearchParams = new URLSearchParams();

    values.category?.name &&
      urlSearchParams.append(CATEGORY_FIELD, values.category.name);

    values.dateFrom && urlSearchParams.append(DATE_FROM_FIELD, values.dateFrom);

    values.dateTo && urlSearchParams.append(DATE_TO_FIELD, values.dateTo);

    values.politician &&
      urlSearchParams.append(POLITICIAN_FIELD, values.politician);

    history.push({ search: urlSearchParams.toString() });
  };

  const handleFiltersReset = () => {
    history.push(routes.editorReports);
  };

  const handleReviewClick = (id: string) => {
    history.push(routes.editorReport.replace(':id', '') + id);
  };

  return (
    <SidebarTemplate
      headerItems={headers.editor}
      sidebar={
        <Filters
          queryParams={
            {
              category: queryParams.get(CATEGORY_FIELD),
              dateFrom: queryParams.get(DATE_FROM_FIELD),
              dateTo: queryParams.get(DATE_TO_FIELD),
              politician: queryParams.get(POLITICIAN_FIELD),
            } as QueryParamsType
          }
          onApplyClick={handleFiltersChange}
          onResetClick={handleFiltersReset}
        />
      }
    >
      <StyledReportsWrapper>
        <StyledInfoWrapper>
          <ResultsFilterInfo
            hasFiltersApplied={
              !!(
                queryParams.get(CATEGORY_FIELD) ||
                queryParams.get(DATE_FROM_FIELD) ||
                queryParams.get(DATE_TO_FIELD) ||
                queryParams.get(POLITICIAN_FIELD)
              )
            }
          />
        </StyledInfoWrapper>
        {reports.map((report) => (
          <StyledReportWrapper key={_.uniqueId()}>
            <Report report={report} onReviewClick={handleReviewClick} />
          </StyledReportWrapper>
        ))}
      </StyledReportsWrapper>
    </SidebarTemplate>
  );
};
