import styled, { css } from 'styled-components';

interface Props {
  isResizeable?: boolean;
}

export const Textarea = styled.textarea<Props>`
  width: 100%;
  min-height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-color: ${({ theme }) => theme.colors.mediumDark};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 16px;

  ${({ isResizeable }) =>
    !isResizeable &&
    css`
      resize: none;
    `}
`;
