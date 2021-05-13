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
}

const Container = styled.div<{
  isActive: boolean;
}>`
  span {
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
    justify-content: space-between;
    align-content: center;
    width: 150px;
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
        <span>{text}</span>
      </Link>
    </Container>
  );
};
