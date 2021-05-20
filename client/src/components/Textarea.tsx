import styled, { css } from 'styled-components';

interface Props {
  isBiggerFont?: boolean;
  isResizeable?: boolean;
}

export const Textarea = styled.textarea<Props>`
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  min-height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-color: ${({ theme }) => theme.colors.mediumDark};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme, isBiggerFont }) =>
    isBiggerFont ? theme.fontSize.m : theme.fontSize.s};
  padding: ${({ isBiggerFont }) => (isBiggerFont ? '16px' : '7px 11px')};

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }

  ${({ isResizeable }) =>
    !isResizeable &&
    css`
      resize: none;
    `}
`;
