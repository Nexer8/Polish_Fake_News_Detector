import React from 'react';
import styled from 'styled-components';

export interface Props {
  svg: string;
  alt: string;
  size?: number;
  hasTooltip?: boolean;
}

const StyledIcon = styled.img<{ cursor: string }>`
  cursor: ${({ cursor }) => cursor};
`;

const StyledTooltip = styled.div<{ size: number }>`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  width: 200px;
  background-color: ${({ theme }) => theme.colors.green};
  text-align: center;
  padding: 5px 0;
  border-radius: 4px;
  top: -4px;
  left: ${({ size }) => size + 10}px;
  padding: 16px 8px;
`;

const StyledWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;

  &:hover ${StyledTooltip} {
    visibility: visible;
  }
`;

export const Icon: React.FC<Props> = ({
  svg,
  alt,
  size = 16,
  hasTooltip = false,
}) => {
  return (
    <>
      {hasTooltip ? (
        <StyledWrapper size={size}>
          <StyledIcon
            cursor={'pointer'}
            src={svg}
            alt={alt}
            width={size}
            height={size}
          />{' '}
          <StyledTooltip size={size}>{alt}</StyledTooltip>
        </StyledWrapper>
      ) : (
        <StyledIcon
          cursor={'default'}
          src={svg}
          alt={alt}
          width={size}
          height={size}
        />
      )}
    </>
  );
};
