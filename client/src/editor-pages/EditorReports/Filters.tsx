import React from 'react';
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

const CATEGORY_FIELD: string = 'category';
const DATE_FROM_FIELD: string = 'dateFrom';
const DATE_TO_FIELD: string = 'dateTo';
const POLITICIAN_FIELD: string = 'politician';

export interface Props {
  onApplyClick: (form: { [x: string]: string | DropdownItem }) => void;
  onCancelClick: () => void;
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

export const Filters: React.FC<Props> = ({ onApplyClick, onCancelClick }) => {
  const formik = useFormik({
    initialValues: {
      [CATEGORY_FIELD]: (null as unknown) as DropdownItem,
      [DATE_FROM_FIELD]: '',
      [DATE_TO_FIELD]: '',
      [POLITICIAN_FIELD]: '',
    },
    onSubmit: (values) => {
      onApplyClick(values);
    },
    onReset: (values) => {
      onCancelClick();
    },
  });

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
          value={formik.values[POLITICIAN_FIELD].toString()}
        />
        <StyledSelect>
          <Select
            items={categories}
            selectedItem={formik.values[CATEGORY_FIELD] as DropdownItem}
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
          value={formik.values[DATE_FROM_FIELD].toString()}
        />
        <StyledDateInput
          className={DATE_TO_FIELD}
          id={DATE_TO_FIELD}
          name={DATE_TO_FIELD}
          onChange={formik.handleChange}
          placeholder="Data wypowiedzi do"
          value={formik.values[DATE_TO_FIELD].toString()}
        />
        <StyledButtons>
          <Button type="submit" title="Zastosuj" icon={applyIcon} isFullWidth />
          <StyledButtonMargin>
            <Button
              type="reset"
              title="Resetuj"
              icon={closeIcon}
              onClick={onCancelClick}
              isFullWidth
            />
          </StyledButtonMargin>
        </StyledButtons>
      </form>
    </StyledWrapper>
  );
};
