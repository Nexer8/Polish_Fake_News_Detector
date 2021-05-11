import React from 'react';
import styled, { css } from 'styled-components';
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
  isFullWidth?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Btn = styled.button<{
  color: string;
  hoverColor: string;
  activeColor: string;
  backgroundColor: string;
  isFullWidth: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 7px 11px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 4px;
  color: ${({ color }) => color};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.s};

  ${({ isFullWidth }) =>
    isFullWidth
      ? css`
          width: 100%;
        `
      : css`
          min-width: 120px;
          max-width: 300px;
        `}

  span {
    padding-right: 11px;
  }

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
    transition: 0.5s;
  }

  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
`;

export const Button: React.FC<Props> = ({
  title,
  icon,
  color = theme.colors.gray,
  backgroundColor = theme.colors.mediumDark,
  hoverColor = theme.colors.blue,
  activeColor = theme.colors.blue,
  isFullWidth = false,
  onClick,
}) => {
  return (
    <Btn
      type="button"
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      activeColor={activeColor}
      isFullWidth={isFullWidth}
    >
      <span>{title}</span>
      <Icon svg={icon} alt={title} />
    </Btn>
  );
};
