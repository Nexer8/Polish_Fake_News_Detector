import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';

type InputType = 'text' | 'password';

export interface Props {
  icon: string;
  isDisabled?: boolean;
  placeholder: string;
  type?: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const StyledInput = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 7px 34px 7px 11px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 11px;
`;

export const Input: React.FC<Props> = ({
  icon,
  isDisabled = false,
  placeholder,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <StyledWrapper>
      <StyledInput
        disabled={isDisabled}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      <StyledIcon svg={icon} alt={placeholder} />
    </StyledWrapper>
  );
};
