import { React, useState, useContext } from 'react';

import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import theme from '../styles/theme';
import { usePlayerStore } from '../store';
import constants from '../constants';
import styled, { css } from 'styled-components';

const StyledSwitch = styled.div`
  background-color: #1a2a33;
  border-radius: ${theme.borders.borderRadiusMedium};
  padding: 0.5rem;
  display: flex;
  position: relative;
  ${(props) => (props.symbol === constants.CROSS ? css`` : '')}
  &::after {
    content: '';
    display: block;
    height: calc(100% - 1rem);
    position: absolute;
    width: calc(50% - 0.5rem);
    left: 0.5rem;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    background-color: ${theme.colors.secondary};
    border-radius: ${theme.borders.borderRadiusMedium};
    transition: all 0.2s ease-out;
    ${(props) =>
      !props.isCross &&
      css`
        transform: translate(calc(100%), -50%);
      `}
  }
`;
const SwitchCrossButton = styled.div`
  cursor: pointer;
  width: 50%;
  border-radius: ${theme.borders.borderRadiusMedium};
  background-color: transparent;
  border: none;
  padding: 0.75rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  z-index: 5;
  transition: background-color 0.2s ease-out;
  path {
    transition: all 0.3s ease-in-out;
    fill: ${(props) =>
      props.isSelected
        ? css`
            ${theme.colors.backgroundColor}
          `
        : css`#a8bfc9`};
  }
  &:hover {
    background-color: rgba(168, 191, 201, 0.05);
  }
`;
const SwitchCircleButton = styled.div`
  cursor: pointer;
  width: 50%;
  border-radius: ${theme.borders.borderRadiusMedium};
  background-color: transparent;
  border: none;
  padding: 0.75rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  z-index: 5;
  transition: background-color 0.2s ease-out;
  path {
    transition: all 0.3s ease-in-out;
    fill: ${(props) =>
      props.isSelected
        ? css`
            ${theme.colors.backgroundColor}
          `
        : css`#a8bfc9`};
  }
  &:hover {
    background-color: rgba(168, 191, 201, 0.05);
  }
`;

export default function Switch() {
  const player = usePlayerStore((state) => state);

  const [isCross, setIsCross] = useState(player.symbol === constants.CROSS);

  return (
    <StyledSwitch
      isCross={isCross}
      symbol={player.symbol}
      className={`${
        player.symbol === constants.CROSS ? 'switch--cross-active' : ''
      }`}
    >
      <SwitchCrossButton
        className={`switch__cross-container`}
        isSelected={isCross}
        onClick={() => {
          player.setSymbol(constants.CROSS);
          player.setEnemySymbol(constants.CIRCLE);
          player.setIsYourTurn(true);
          player.setIsEnemyTurn(false);
          setIsCross(true);
        }}
      >
        <Cross
          width={32}
          height={32}
          color={
            player.symbol === constants.CROSS
              ? theme.colors.borderColor
              : theme.colors.secondary
          }
        />
      </SwitchCrossButton>
      <SwitchCircleButton
        isSelected={!isCross}
        onClick={() => {
          player.setSymbol(constants.CIRCLE);
          player.setEnemySymbol(constants.CROSS);
          player.setIsYourTurn(false);
          player.setIsEnemyTurn(true);
          setIsCross(false);
        }}
      >
        <Circle
          width={32}
          height={32}
          color={
            player.symbol === constants.CIRCLE
              ? theme.colors.borderColor
              : theme.colors.secondary
          }
        />
      </SwitchCircleButton>
    </StyledSwitch>
  );
}
