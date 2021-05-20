import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { theme } from 'theme/mainTheme';

export enum VerdictType {
  TRUTH = 'Prawda',
  FAKE = 'Fałsz',
}

export interface Props {
  probability: number;
  verdict: VerdictType;
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

export const StatementEvaluation: React.FC<Props> = ({
  probability,
  verdict,
}) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    switch (verdict) {
      case VerdictType.TRUTH:
        setColor(theme.colors.green);
        break;
      case VerdictType.FAKE:
        setColor(theme.colors.red);
        break;
      default:
        setColor(theme.colors.green);
    }
  }, [verdict]);

  return (
    <Container backgroundColor={color}>
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
