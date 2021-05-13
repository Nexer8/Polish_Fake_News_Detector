import React from 'react';
import styled from 'styled-components';
import { StyledInput } from 'components/Input';
import calendar from 'icons/calendar.svg';

export interface Props {
  className?: string;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO make placeholder work
const StyledDateInput = styled(StyledInput)`
  position: relative;

  ::-webkit-calendar-picker-indicator {
    content: attr(${(props) => props.placeholder}) !important;
    opacity: 1;
    display: block;
    background: url(${calendar}) no-repeat;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 11px;
  }

  ::-webkit-datetime-edit-text,
  ::-webkit-datetime-edit-year-field,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-day-field {
    color: ${({ theme }) => theme.colors.lightDark};
  }
`;

export const DateInput: React.FC<Props> = ({
  className,
  id,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <StyledDateInput
      className={className}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="date"
      value={value}
    />
  );
};
