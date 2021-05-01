import React from 'react';
import styled from 'styled-components';
import { theme } from 'theme/mainTheme';
import { Icon } from 'components/Icon';

export interface Props {
  title: string;
  icon: string;
  // default args are optional
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  activeColor?: string;
}

const Btn = styled.button<{
  color: string;
  hoverColor: string;
  activeColor: string;
  backgroundColor: string;
}>`
  cursor: pointer;
  width: 150px;
  padding: 10px 15px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 4px;
  color: ${({ color }) => color};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.s};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
    transition: 0.5s;
  }

  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
`;

const IconWrapper = styled.div`
  float: right;
`;

export const Button: React.FC<Props> = ({
  title,
  icon,
  color = theme.colors.gray,
  backgroundColor = theme.colors.mediumDark,
  hoverColor = theme.colors.blue,
  activeColor = theme.colors.blue,
}) => {
  return (
    <Btn
      type="button"
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      activeColor={activeColor}
    >
      {title}

      <IconWrapper>
        <Icon svg={icon} alt={title} />
      </IconWrapper>
    </Btn>
  );
};
