import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import _ from 'lodash';

import routes from 'routes';
import { headers } from 'headers';
import { SidebarTemplate } from 'templates/SidebarTemplate';
import { Report } from 'editor-pages/EditorReports/Report';
import { ResultsFilterInfo } from 'components/ResultsFilterInfo';
import {
  Filters,
  FiltersFormType,
  CATEGORY_FIELD,
  DATE_FROM_FIELD,
  DATE_TO_FIELD,
  POLITICIAN_FIELD,
  QueryParamsType,
} from 'editor-pages/EditorReports/Filters';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { fetchReportsAsync, selectReports } from 'state/slices/editorSlice';

interface Props {}

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

const StyledEmptyListInfo = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.lightDark};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const EditorReports: React.FC<Props> = () => {
  const reports = useAppSelector(selectReports);

  const [filters, setFilters] = useState<QueryParamsType>({
    category: '',
    dateFrom: '',
    dateTo: '',
    politician: '',
  });

  const history = useHistory();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleFiltersChange = (values: FiltersFormType) => {
    const urlSearchParams = new URLSearchParams();

    const category = values.category?.name ? values.category?.name : '';
    const dateFrom = values.dateFrom ? values.dateFrom : '';
    const dateTo = values.dateTo ? values.dateTo : '';
    const politician = values.politician ? values.politician : '';

    category && urlSearchParams.append(CATEGORY_FIELD, category);

    dateFrom && urlSearchParams.append(DATE_FROM_FIELD, dateFrom);

    dateTo && urlSearchParams.append(DATE_TO_FIELD, dateTo);

    politician && urlSearchParams.append(POLITICIAN_FIELD, politician);

    history.push({ search: urlSearchParams.toString() });

    setFilters({
      category,
      dateFrom,
      dateTo,
      politician,
    });
  };

  const handleFiltersReset = () => {
    history.push(routes.editorReports);
  };

  const handleReviewClick = (id: string) => {
    history.push(routes.editorReport.replace(':id', '') + id);
  };

  useEffect(() => {
    const { search } = location;
    const queryParams = new URLSearchParams(search);

    const category = queryParams.get(CATEGORY_FIELD);
    const dateFrom = queryParams.get(DATE_FROM_FIELD);
    const dateTo = queryParams.get(DATE_TO_FIELD);
    const politician = queryParams.get(POLITICIAN_FIELD);

    setFilters({
      category: category ? category : '',
      dateFrom: dateFrom ? dateFrom : '',
      dateTo: dateTo ? dateTo : '',
      politician: politician ? politician : '',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const { category, dateFrom, dateTo, politician } = filters;

    dispatch(
      fetchReportsAsync({
        category,
        dateFrom,
        dateTo,
        politician,
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    filters.category,
    filters.dateFrom,
    filters.dateTo,
    filters.politician,
  ]);

  return (
    <SidebarTemplate
      headerItems={headers.editor}
      sidebar={
        <Filters
          queryParams={
            {
              category: filters.category,
              dateFrom: filters.dateFrom,
              dateTo: filters.dateTo,
              politician: filters.politician,
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
                filters.category ||
                filters.dateFrom ||
                filters.dateTo ||
                filters.politician
              )
            }
          />
        </StyledInfoWrapper>
        {reports.map((report) => (
          <StyledReportWrapper key={_.uniqueId()}>
            <Report report={report} onReviewClick={handleReviewClick} />
          </StyledReportWrapper>
        ))}
        {reports.length === 0 && (
          <StyledEmptyListInfo>Nie znaleziono wyników</StyledEmptyListInfo>
        )}
      </StyledReportsWrapper>
    </SidebarTemplate>
  );
};
