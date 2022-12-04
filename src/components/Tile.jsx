import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Circle from '../components/icons/Circle';
import Icon from './icons/Icon';
import useMediaQuery from '../hooks/useMediaQuery';
import Cross from '../components/icons/Cross';
import CircleOutline from '../components/icons/CircleOutline';
import CrossOutline from '../components/icons/CrossOutline';
import constants from '../constants';
import { useGameStore, usePlayerStore, useMultiplayerStore } from '../store';

const StyledTile = styled.div`
  height: 8.75rem;
  width: 8.75rem;
  box-sizing: border-box;
  /* background-color: ${theme.colors.backgroundColor}; */
  ${(props) => {
    if (
      !props.$isMultiplayer &&
      props.$isHighlighted &&
      props.$playerSymbol === constants.CROSS
    ) {
      return `background-color: ${
        props.$isEnemy ? theme.colors.primaryCircle : theme.colors.primaryCross
      };`;
    } else if (
      !props.$isMultiplayer &&
      props.$isHighlighted &&
      props.$playerSymbol === constants.CIRCLE
    ) {
      return `background-color: ${
        props.$isEnemy ? theme.colors.primaryCross : theme.colors.primaryCircle
      };`;
    } else if (props.$isMultiplayer && props.$isHighlighted && props.$isCross) {
      return `background-color: ${
        props.$isEnemy ? theme.colors.primaryCircle : theme.colors.primaryCross
      };`;
    } else if (
      props.$isMultiplayer &&
      props.$isHighlighted &&
      !props.$isCross
    ) {
      return `background-color: ${
        props.$isEnemy ? theme.colors.primaryCircle : theme.colors.primaryCircle
      };`;
    } else {
      return `background-color: ${theme.colors.backgroundColor};`;
    }
  }}
  border-radius: ${theme.borders.borderRadius};
  border-bottom: 0.5rem solid #10212a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) =>
    props.$isMultiplayer
      ? props.isChecked
        ? 'default'
        : 'pointer'
      : props.isChecked || !props.isYourTurn
      ? 'default'
      : 'pointer'};
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 6rem;
    width: 6rem;
  }
  transition: all 0.3s ease-out;
  /* & svg {
        background-color: red!important;
        transition: all 2s linear;
        transform: translateY(50px);
        ${(props) => props.$isHovering && 'transform: translatey(0px)'};
    } */
`;

export default function Tile(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnemy, setIsEnemy] = useState(false);
  const [isCross, setIsCross] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const game = useGameStore((state) => state);
  const player = usePlayerStore((state) => state);
  const multiplayer = useMultiplayerStore((state) => state);
  const handleMouseEnter = (e) => {
    if (props.player.isYourTurn || game.isMultiplayer) {
      setIsHovering(true);
    }
  };
  const handleMouseLeave = () => {
    if (props.player.isYourTurn || game.isMultiplayer) {
      setIsHovering(false);
    }
  };
  const handleClick = () => {
    if (!isChecked && props.player.isYourTurn && !game.isMultiplayer) {
      game.setTile(props.player.symbol, props.row, props.column);
      setIsChecked(true);
      player.setIsYourTurn(false);
      player.setIsEnemyTurn(true);
    }
    // else if(!isChecked && props.player.isEnemyTurn){
    //     game.setTile(props.player.symbol, props.row, props.column);
    // }
    else if (!isChecked && game.isMultiplayer) {
      setIsChecked(true);
      if (multiplayer.isPlayerOneTurn) {
        game.setTile(constants.CROSS, props.row, props.column);
        setIsCross(true);

        if (!game.isGameOver) {
          multiplayer.setIsPlayerOneTurn(false);
        }
      } else {
        game.setTile(constants.CIRCLE, props.row, props.column);
        setIsCross(false);
        if (!game.isGameOver) {
          multiplayer.setIsPlayerOneTurn(true);
        }
      }
    }
  };
  useEffect(() => {
    if (!game.isMultiplayer) {
      if (game.board[props.row][props.column] === constants.EMPTY) {
        setIsChecked(false);
        setIsEnemy(false);
        setIsHovering(false);
      } else if (game.board[props.row][props.column] === player.symbol) {
        setIsChecked(true);
        player.setIsEnemyTurn(true);
        player.setIsYourTurn(false);
      } else if (game.board[props.row][props.column] === player.enemySymbol) {
        setIsEnemy(true);
        setIsChecked(true);
        player.setIsYourTurn(true);
        player.setIsEnemyTurn(false);
      }
    } else {
      if (game.board[props.row][props.column] === constants.EMPTY) {
        setIsChecked(false);
        setIsEnemy(false);
        setIsHovering(false);
      } else {
      }
    }
  }, [game.board[props.row][props.column]]);

  useEffect(() => {
    //Check if this tile is on the winning line

    // game.winningLineCoordinates.map((coordinate) =>{
    //     if(JSON.stringify(coordinate) === JSON.stringify([props.row, props.column])){
    //         setIsHighlighted(true);
    //     }
    // })
    for (let i = 0; i < game.winningLineCoordinates.length; i++) {
      if (
        JSON.stringify(game.winningLineCoordinates[i]) ===
        JSON.stringify([props.row, props.column])
      ) {
        setIsHighlighted(true);
        break;
      } else if (i === game.winningLineCoordinates.length - 1) {
        setIsHighlighted(false);
      }
    }
  }, [game.winningLineCoordinates]);
  return (
    <StyledTile
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      isChecked={isChecked}
      isYourTurn={props.player.isYourTurn}
      $isHighlighted={isHighlighted}
      $isHovering={isHovering}
      $isMultiplayer={game.isMultiplayer}
      $isCross={isCross}
      $playerSymbol={player.symbol}
      $enemySymbol={player.enemySymbol}
      $isEnemy={isEnemy}
    >
      {!game.isMultiplayer ? (
        <>
          {props.player.symbol === constants.CROSS && !isChecked ? (
            <Icon
              isHovering={isHovering}
              isOnBoard
              icon={
                <CrossOutline
                  height={isMobile ? 48 : 64}
                  width={isMobile ? 48 : 64}
                  color={theme.colors.primaryCross}
                />
              }
            />
          ) : (
            ''
          )}

          {props.player.symbol === constants.CIRCLE && !isChecked ? (
            <Icon
              isHovering={isHovering}
              isOnBoard
              icon={
                <CircleOutline
                  height={isMobile ? 48 : 64}
                  width={isMobile ? 48 : 64}
                  color={theme.colors.primaryCircle}
                />
              }
            />
          ) : (
            ''
          )}

          {isChecked && props.player.symbol === constants.CROSS ? (
            !isEnemy ? (
              <Icon
                checked={isChecked}
                isOnBoard
                icon={
                  <Cross
                    height={isMobile ? 48 : 64}
                    width={isMobile ? 48 : 64}
                    color={
                      isHighlighted
                        ? theme.colors.backgroundColor
                        : theme.colors.primaryCross
                    }
                  />
                }
              />
            ) : (
              <Icon
                checked={isChecked}
                isOnBoard
                icon={
                  <Circle
                    height={isMobile ? 48 : 64}
                    width={isMobile ? 48 : 64}
                    color={
                      isHighlighted
                        ? theme.colors.backgroundColor
                        : theme.colors.primaryCircle
                    }
                  />
                }
              />
            )
          ) : (
            ''
          )}

          {isChecked && props.player.symbol === constants.CIRCLE ? (
            !isEnemy ? (
              <Circle
                height={isMobile ? 48 : 64}
                width={isMobile ? 48 : 64}
                color={
                  isHighlighted
                    ? theme.colors.backgroundColor
                    : theme.colors.primaryCircle
                }
              />
            ) : (
              <Cross
                height={isMobile ? 48 : 64}
                width={isMobile ? 48 : 64}
                color={
                  isHighlighted
                    ? theme.colors.backgroundColor
                    : theme.colors.primaryCross
                }
              />
            )
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          {isHovering && multiplayer.isPlayerOneTurn && !isChecked ? (
            <CrossOutline
              height={isMobile ? 48 : 64}
              width={isMobile ? 48 : 64}
              color={theme.colors.primaryCross}
            />
          ) : (
            ''
          )}

          {isHovering && !multiplayer.isPlayerOneTurn && !isChecked ? (
            <CircleOutline
              height={isMobile ? 48 : 64}
              width={isMobile ? 48 : 64}
              color={theme.colors.primaryCircle}
            />
          ) : (
            ''
          )}

          {isChecked && isCross ? (
            <Cross
              height={isMobile ? 48 : 64}
              width={isMobile ? 48 : 64}
              color={
                isHighlighted
                  ? theme.colors.backgroundColor
                  : theme.colors.primaryCross
              }
            />
          ) : (
            ''
          )}

          {isChecked && !isCross ? (
            <Circle
              height={isMobile ? 48 : 64}
              width={isMobile ? 48 : 64}
              color={
                isHighlighted
                  ? theme.colors.backgroundColor
                  : theme.colors.primaryCircle
              }
            />
          ) : (
            ''
          )}
        </>
      )}
    </StyledTile>
  );
}
