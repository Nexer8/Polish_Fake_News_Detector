import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { Icon } from 'components/Icon';
import applyIcon from 'icons/apply.svg';
import closeIcon from 'icons/close.svg';
import filterIcon from 'icons/filter-darker.svg';
import politicianIcon from 'icons/user.svg';

import { Button } from 'components/Button';
import { DateInput } from 'components/DateInput';
import { Input } from 'components/Input';
import { DropdownItem, Select } from 'components/Select';

export const CATEGORY_FIELD: string = 'category';
export const DATE_FROM_FIELD: string = 'dateFrom';
export const DATE_TO_FIELD: string = 'dateTo';
export const POLITICIAN_FIELD: string = 'politician';

export type QueryParamsType = {
  category: string;
  dateFrom: string;
  dateTo: string;
  politician: string;
};

export type FiltersFormType = {
  category: DropdownItem;
  dateFrom: string;
  dateTo: string;
  politician: string;
};

export interface Props {
  queryParams: QueryParamsType;
  onApplyClick: (form: FiltersFormType) => void;
  onResetClick: () => void;
}

// TODO: provide valid categories (prossibly fetch from backend)
const categories: DropdownItem[] = [
  {
    name: 'Lorem',
  },
  {
    name: 'Ipsum',
  },
  {
    name: 'Dolor Sit',
  },
  {
    name: 'Amet',
  },
  {
    name: 'Ars bene moriendi',
  },
];

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.lightDark};
  font-size: ${({ theme }) => theme.fontSize.s};

  span {
    margin-left: 11px;
  }
`;

const StyledSelect = styled.div`
  margin-top: 10px;
`;

const StyledDateInput = styled(DateInput)`
  margin-top: 10px;
`;

const StyledButtons = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;

const StyledButtonMargin = styled.div`
  margin-top: 10px;
`;

export const Filters: React.FC<Props> = ({
  queryParams,
  onApplyClick,
  onResetClick,
}) => {
  const formik = useFormik({
    initialValues: {
      category: (null as unknown) as DropdownItem,
      dateFrom: '',
      dateTo: '',
      politician: '',
    },
    onSubmit: (values) => {
      onApplyClick(values);
    },
    onReset: () => {
      onResetClick();
    },
  });

  const setFiltersBasedOnQueryParams = () => {
    queryParams?.category &&
      formik.setFieldValue(CATEGORY_FIELD, {
        name: queryParams.category,
      } as DropdownItem);

    queryParams?.dateFrom &&
      formik.setFieldValue(DATE_FROM_FIELD, queryParams.dateFrom);

    queryParams?.dateTo &&
      formik.setFieldValue(DATE_TO_FIELD, queryParams.dateTo);

    queryParams?.politician &&
      formik.setFieldValue(POLITICIAN_FIELD, queryParams.politician);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setFiltersBasedOnQueryParams, []);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Icon svg={filterIcon} alt="Filters" />
        <span>Filtry</span>
      </StyledTitle>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Input
          icon={politicianIcon}
          id={POLITICIAN_FIELD}
          name={POLITICIAN_FIELD}
          onChange={formik.handleChange}
          placeholder="Polityk"
          type={POLITICIAN_FIELD}
          value={formik.values.politician}
        />
        <StyledSelect>
          <Select
            items={categories}
            selectedItem={formik.values.category}
            placeholder="Kategoria"
            onSelect={(item: DropdownItem) =>
              formik.setFieldValue(CATEGORY_FIELD, item)
            }
          />
        </StyledSelect>
        <StyledDateInput
          className={DATE_FROM_FIELD}
          id={DATE_FROM_FIELD}
          name={DATE_FROM_FIELD}
          onChange={formik.handleChange}
          placeholder="Data wypowiedzi od"
          value={formik.values.dateFrom}
        />
        <StyledDateInput
          className={DATE_TO_FIELD}
          id={DATE_TO_FIELD}
          name={DATE_TO_FIELD}
          onChange={formik.handleChange}
          placeholder="Data wypowiedzi do"
          value={formik.values.dateTo}
        />
        <StyledButtons>
          <Button type="submit" title="Zastosuj" icon={applyIcon} isFullWidth />
          <StyledButtonMargin>
            <Button
              type="reset"
              title="Resetuj"
              icon={closeIcon}
              onClick={onResetClick}
              isFullWidth
            />
          </StyledButtonMargin>
        </StyledButtons>
      </form>
    </StyledWrapper>
  );
};
