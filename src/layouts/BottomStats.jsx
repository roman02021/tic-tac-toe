import React, {useContext} from 'react';
import theme from '../styles/theme';
import styled from 'styled-components';
import Score from '../components/Score';
import {usePlayerStore} from '../store';
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

    return <StyledBottomStats>
        <Score counter={player.wins} text='X (YOU)' color='blue'/>
        <Score counter={player.ties} text='TIES' color='silver'/>
        <Score counter={player.looses} text='O (CPU)' color='yellow'/>
    </StyledBottomStats>;
};

export default BottomStats;
