import styled from 'styled-components';

export interface Props {
  isBiggerFont?: boolean;
  isBgDark?: boolean;
}

export const TextDisplay = styled.p<Props>`
  font-size: ${({ theme, isBiggerFont }) =>
    isBiggerFont ? theme.fontSize.m : theme.fontSize.s};
  background-color: ${({ theme, isBgDark }) =>
    isBgDark ? theme.colors.mediumDark : 'none'};
  border: ${({ theme, isBgDark }) =>
    isBgDark ? 'none' : `1px solid ${theme.colors.mediumDark}`};
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
