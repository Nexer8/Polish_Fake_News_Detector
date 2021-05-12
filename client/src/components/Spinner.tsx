import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};;
  border-right: 2px solid ${({ theme }) => theme.colors.lightGray};;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};;
  border-left: 4px solid  ${({ theme }) => theme.colors.dark};
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
