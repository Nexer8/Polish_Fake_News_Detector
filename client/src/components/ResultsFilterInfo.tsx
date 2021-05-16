import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/Icon';
import infoIcon from 'icons/info-inactive.svg';

const RESULTS_WITH_NO_FILTERS_INFO: string =
  'Wyświetlane są wszystkie zgłoszenia';
const RESULTS_WITH_FILTERS_INFO: string =
  'Wyświetlane są przefiltrowane zgłoszenia';

const Container = styled.div`
  display: flex;

  span {
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ theme }) => theme.colors.lightDark};
    margin-left: 10px;
  }
`;

export interface Props {
  hasFiltersApplied?: boolean;
}

export const ResultsFilterInfo: React.FC<Props> = ({
  hasFiltersApplied = false,
}) => {
  return (
    <Container>
      <Icon svg={infoIcon} alt="navigation indicator" />
      <span>
        {hasFiltersApplied
          ? RESULTS_WITH_FILTERS_INFO
          : RESULTS_WITH_NO_FILTERS_INFO}
      </span>
    </Container>
  );
};
