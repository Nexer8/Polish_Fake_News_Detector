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
  text: string;
  path: string;
}

export const ReturnButton: React.FC<Props> = ({ text, path }) => {
  return (
    <Container>
      <Link to={path}>
        <Icon svg={arrowIcon} alt="navigation indicator" />
        <span>{text}</span>
      </Link>
    </Container>
  );
};
