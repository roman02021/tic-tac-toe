import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const StyledTile = styled.div`
  box-sizing: border-box;
  background-color: ${theme.colors.backgroundColor};
  border-radius: ${theme.borders.borderRadius};
  border-bottom: 0.25rem solid #10212a;
  width: 8.75rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 6rem;
    height: 2.5rem;
    border-radius: ${theme.borders.borderRadiusSmall};
  }
`;
const StyledTileText = styled.span`
  margin-left: 0.8125rem;
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.body};
  }
`;

const SlimTile = (props) => {
  return (
    <StyledTile className="slim-tile">
      {props.icon}
      <StyledTileText className="slim-tile__text heading-xs">
        {props.children}
      </StyledTileText>
    </StyledTile>
  );
};

export default SlimTile;
