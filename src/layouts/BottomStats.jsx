import React, {useContext} from 'react';
import theme from '../styles/theme';
import styled from 'styled-components';
import Score from '../components/Score';
import {usePlayerStore, useGameStore, useMultiplayerStore} from '../store';
import constants from '../constants';

const StyledBottomStats = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(${constants.COLUMNS}, 1fr);
    gap: 1.25rem;
    margin-top: 1.25rem;
`

const BottomStats = () => {

    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);


    return <StyledBottomStats>
        <Score counter={game.isMultiplayer ? multiplayer.playerOneScore : (player.symbol === constants.CROSS ? player.wins : player.looses)} text={`${'X'} (${game.isMultiplayer ? player.symbol === constants.CROSS ? 'P1' : 'P2' : player.symbol === constants.CROSS ? 'YOU' : 'CPU'})`} color={`blue`}/>
        <Score counter={game.isMultiplayer ? multiplayer.ties : player.ties} text='TIES' color='silver'/>
        <Score counter={game.isMultiplayer ? multiplayer.playerTwoScore : (player.symbol === constants.CIRCLE ? player.wins : player.looses)} text={`${'O'} (${game.isMultiplayer ? player.symbol === constants.CROSS ? 'P2' : 'P1' : player.symbol === constants.CIRCLE ? 'YOU' : 'CPU'})`} color={`yellow`}/>
    </StyledBottomStats>;
};

export default BottomStats;
