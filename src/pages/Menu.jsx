import React from 'react';
import ChooseMark from '../layouts/ChooseMark';
import Button from '../components/Button';
import Switch from '../components/Switch';
import Logo from '../components/icons/Logo';
import styled from 'styled-components';
import theme from '../styles/theme';
import {useGameStore, usePlayerStore, useMultiplayerStore} from '../store';
import constants from '../constants';

const StyledMenu = styled.section`
    width: 28.75rem;
    height: 29.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: ${theme.breakpoints.mobile}) {
        width: 20.5rem;
    }
`
const StyledMenuText = styled.div`
    font-size: ${(props) => props.$slim ? theme.fontSize.body : theme.fontSize.xs};
    font-weight: ${(props) => props.$slim ? '500' : 'bold'};
    letter-spacing: ${(props) => props.$slim ? theme.kerning.body : theme.kerning.xs};
`


function Menu(props) {
    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);

    return (
        <StyledMenu >
            <div className="logo">
                <Logo className="logo__logo" />
            </div>
            <ChooseMark >
                <StyledMenuText className="heading-xs choose-mark__title">
                    PICK PLAYER 1’S MARK
                </StyledMenuText>
                <Switch />
                <StyledMenuText $slim className="choose-mark__subtitle">REMEMBER : X GOES FIRST</StyledMenuText>
            </ChooseMark>
            <Button fullWidth={true} cross={true} onClick={()=>{
                game.resetBoard();
                game.setWinner('');
                game.setIsMultiplayer(false);
                player.resetScore();
                if(player.symbol === constants.CROSS){
                    player.setIsYourTurn(true);
                    player.setIsEnemyTurn(false);
                }
                else {
                    player.setIsYourTurn(false);
                    player.setIsEnemyTurn(true);
                }
            }} route="/game" color="yellow" vertical>
                New game (vs CPU)
            </Button>
            <Button fullWidth={true} cross={false}
            onClick={()=>{
                game.resetBoard();
                game.setWinner('');
                multiplayer.setIsPlayerOneTurn(true);
                game.setIsMultiplayer(true);
                
                multiplayer.setIsGameOver(false);
                multiplayer.resetScore();
            }}
            route="/game" color="blue" vertical>
                New game (vs Player)
            </Button>
        </StyledMenu>
    );
}

export {Menu as default, StyledMenu};