import styled from 'styled-components';

export const Input = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.mediumDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 7px 11px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;
