import React from 'react';
import ChooseMark from '../layouts/ChooseMark';
import Button from '../components/Button';
import Switch from '../components/Switch';
import Logo from '../components/icons/Logo';
import styled from 'styled-components';
import theme from '../styles/theme';
import Toggle from '../components/Toggle';
import { useGameStore, usePlayerStore, useMultiplayerStore } from '../store';
import constants from '../constants';
import Moon from '../components/icons/Moon';
import Sun from '../components/icons/Sun';
import VolumeOn from '../components/icons/VolumeOn';
import VolumeOff from '../components/icons/VolumeOff';
import Icon from '../components/icons/Icon';

const StyledMenu = styled.section`
  width: 28.75rem;
  height: 29.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 20.5rem;
  }
`;
const StyledMenuText = styled.div`
  font-size: ${(props) =>
    props.$slim ? theme.fontSize.body : theme.fontSize.xs};
  font-weight: ${(props) => (props.$slim ? '500' : 'bold')};
  letter-spacing: ${(props) =>
    props.$slim ? theme.kerning.body : theme.kerning.xs};
  ${(props) =>
    props.$slim ? 'padding-top: 1.5rem;' : 'padding-bottom: 1.5rem;'}
  text-align: center;
  color: ${(props) => (props.$slim ? 'rgba(168, 191, 201, 0.5)' : '#a8bfc9')};
`;
const TopBar = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  width: 100%;
`;

// .choose-mark__title {
//     text-align: center;
//     padding-bottom: 1.5rem;
//   }
//   .choose-mark__subtitle {

//     padding-top: 1.5rem;
//     color: rgba(168, 191, 201, 0.5);
//   }

function Menu(props) {
  const player = usePlayerStore((state) => state);
  const game = useGameStore((state) => state);
  const multiplayer = useMultiplayerStore((state) => state);

  return (
    <StyledMenu>
      <TopBar>
        {/* <Toggle leftIcon={<Icon icon={<Moon color={theme.colors.primaryCrossBorder} height='16' 
            width='16' 
           />}/>} 
            rightIcon={<Icon icon={<Sun color={theme.colors.primaryCrossBorder} height='16' 
            width='16' 
            />}/>}/> */}
        <Logo className="logo__logo" />
        {/* <Toggle leftIcon={<Icon icon={<Moon height='16' 
            width='16' 
           />}/>} 
            rightIcon={<Icon icon={<Sun height='16' 
            width='16' 
            />}/>}/> */}
      </TopBar>
      <ChooseMark>
        <StyledMenuText className="heading-xs choose-mark__title">
          PICK PLAYER 1’S MARK
        </StyledMenuText>
        <Switch />
        <StyledMenuText $slim className="choose-mark__subtitle">
          REMEMBER : X GOES FIRST
        </StyledMenuText>
      </ChooseMark>
      <Button
        fullWidth={true}
        cross={true}
        onClick={() => {
          game.resetBoard();
          game.setWinner('');
          game.setIsMultiplayer(false);
          player.resetScore();
          if (player.symbol === constants.CROSS) {
            player.setIsYourTurn(true);
            player.setIsEnemyTurn(false);
          } else {
            player.setIsYourTurn(false);
            player.setIsEnemyTurn(true);
          }
        }}
        route="/game"
        color="yellow"
        vertical
      >
        New game (vs CPU)
      </Button>
      <Button
        fullWidth={true}
        cross={false}
        onClick={() => {
          game.resetBoard();
          game.setWinner('');
          multiplayer.setIsPlayerOneTurn(true);
          game.setIsMultiplayer(true);

          multiplayer.setIsGameOver(false);
          multiplayer.resetScore();
        }}
        route="/game"
        color="blue"
        vertical
      >
        New game (vs Player)
      </Button>
    </StyledMenu>
  );
}

export { Menu as default, StyledMenu };
