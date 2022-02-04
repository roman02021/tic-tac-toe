import React from 'react';
import '../styles/styles.css';
import ChooseMark from '../layouts/ChooseMark';
import Button from '../components/Button';
import Logo from '../components/icons/Logo';
import styled from 'styled-components';
import {useGameStore, usePlayerStore} from '../store';
import constants from '../constants';
import Game from './Game';

const StyledMenu = styled.section`
    width: 28.75rem;
    height: 29.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Menu(props) {
    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    return (
        <StyledMenu >
            <div className="logo">
                <Logo className="logo__logo" />
            </div>
            <ChooseMark />
            <Button fullWidth cross={true} onClick={()=>{
                game.resetBoard();
                game.setWinner('');
                if(player.symbol === constants.CROSS){
                    player.setIsYourTurn(true);
                }
                else {
                    player.setIsYourTurn(false);
                }
            }} route="/game" color="yellow" vertical>
                New game (vs CPU)
            </Button>
            <Button fullWidth cross={false} route="/multiplayer" color="blue" vertical>
                New game (vs Player)
            </Button>
        </StyledMenu>
    );
}
