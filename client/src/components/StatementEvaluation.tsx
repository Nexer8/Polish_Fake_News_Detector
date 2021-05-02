import React from 'react';
import styled from 'styled-components';

export interface Props {
  // we still dunno how many classes are there, so cannot if-else that
  backgroundColor: string;
  probability: number;
  verdict: string;
}

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  justify-content: space-around;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-family: 'Playfair Display', serif;
  width: 100%;
  height: 170px;
  border-radius: 4px;
`;

const BaseColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Verdict = styled(BaseColumn)`
  span {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Explanation = styled(BaseColumn)`
  span {
    display: block;
    text-align: center;

    &:last-child {
      margin-top: 20px;
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  }
`;

const Row = styled.span``;

export const StatementEvaluation: React.FC<Props> = ({
  backgroundColor,
  probability,
  verdict,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Verdict>
        <span>{verdict}</span>
      </Verdict>
      <Explanation>
        <span>Z&nbsp;prawdopodobnieństwem</span>
        <span>{probability}%</span>
      </Explanation>
    </Container>
  );
};
