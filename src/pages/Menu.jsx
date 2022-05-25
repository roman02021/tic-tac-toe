import React from 'react';
import '../styles/styles.css';
import ChooseMark from '../layouts/ChooseMark';
import Button from '../components/Button';
import Switch from '../components/Switch';
import Logo from '../components/icons/Logo';
import styled from 'styled-components';
import {useGameStore, usePlayerStore, useMultiplayerStore} from '../store';
import constants from '../constants';
import Game from './Game';

const StyledMenu = styled.section`
    width: 28.75rem;
    height: 29.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
                <div className="heading-xs choose-mark__title">
                    PICK PLAYER 1’S MARK
                </div>
                <Switch />
                <div className="choose-mark__subtitle">REMEMBER : X GOES FIRST</div>
            </ChooseMark>
            <Button fullWidth cross={true} onClick={()=>{
                game.resetBoard();
                game.setWinner('');
                game.setIsMultiplayer(false);
                if(player.symbol === constants.CROSS){
                    player.setIsYourTurn(true);
                }
                else {
                    player.setIsYourTurn(false);
                }
            }} route="/game" color="yellow" vertical>
                New game (vs CPU)
            </Button>
            <Button fullWidth cross={false}
            onClick={()=>{
                game.resetBoard();
                game.setWinner('');
                game.setIsMultiplayer(true);
                multiplayer.setIsPlayerOneTurn(true);
                // if(player.symbol === constants.CROSS){
                //     player.setIsYourTurn(true);
                // }
                // else {
                //     player.setIsYourTurn(false);
                // }
            }}
            route="/game" color="blue" vertical>
                New game (vs Player)
            </Button>
        </StyledMenu>
    );
}

export {Menu as default, StyledMenu};