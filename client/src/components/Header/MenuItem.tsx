import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { Icon } from 'components/Icon';
import { theme } from 'theme/mainTheme';

export interface Props {
  isActive: boolean;
  iconInactive: string;
  iconActive: string;
  text: string;
  path: string;
  onClick?: (text: string) => void;
}

const Container = styled.div<{
  isActive: boolean;
}>`
  span {
    margin-left: 15px;
    font-size: ${({ theme }) => theme.fontSize.s};
    ${({ isActive }) =>
      isActive
        ? css`
            color: ${theme.colors.gray};
          `
        : css`
            color: ${theme.colors.lightDark};
          `}
  }

  a {
    text-decoration: none;
    display: flex;
    align-content: center;
  }

  :hover {
    span {
      color: ${theme.colors.gray};
    }
  }
`;

export const MenuItem: React.FC<Props> = ({
  isActive,
  iconInactive,
  iconActive,
  text,
  path,
  onClick = () => {},
}) => {
  const [icon, setIcon] = useState(isActive ? iconActive : iconInactive);

  return (
    <Container
      isActive={isActive}
      onMouseOver={() => {
        if (!isActive) setIcon(iconActive);
      }}
      onMouseOut={() => {
        if (!isActive) setIcon(iconInactive);
      }}
    >
      <Link to={path}>
        <Icon svg={icon} alt="navigation indicator" />
        <span onClick={() => onClick(text)}>{text}</span>
      </Link>
    </Container>
  );
};
