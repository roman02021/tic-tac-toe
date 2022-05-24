import React, {useContext} from 'react';
import theme from '../styles/theme';
import styled from 'styled-components';
import Score from '../components/Score';
import {usePlayerStore, useGameStore} from '../store';
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

    console.log(player.symbol, constants.CROSS, player.symbol === constants.CROSS);
    return <StyledBottomStats>
        <Score counter={player.wins} text={`${player.symbol === constants.CROSS ? 'X' : 'O'} (${game.isMultiplayer ? 'PLAYER 1' : 'YOU'})`} color={`${player.symbol === constants.CROSS ? 'blue' : 'yellow'}`}/>
        <Score counter={player.ties} text='TIES' color='silver'/>
        <Score counter={player.looses} text={`${player.symbol === constants.CROSS ? 'O' : 'X'} (${game.isMultiplayer ? 'PLAYER 2' : 'CPU'})`} color={`${player.symbol === constants.CROSS ? 'yellow' : 'blue'}`}/>
    </StyledBottomStats>;
};

export default BottomStats;
