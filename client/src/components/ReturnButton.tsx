import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Icon } from 'components/Icon';
import arrowIcon from 'icons/arrowRight.svg';

const Container = styled.div`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  img {
    cursor: pointer;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ theme }) => theme.colors.lightDark};
    margin-left: 10px;
  }
`;

export interface Props {
  content: string;
}

export const ReturnButton: React.FC<Props> = ({ content }) => {
  return (
    <Container>
      <Link to="/#">
        <Icon svg={arrowIcon} alt="navigation indicator" />
        <span>{content}</span>
      </Link>
    </Container>
  );
};
