import React, {useContext} from 'react';
import Tile from '../components/Tile';
import theme from '../styles/theme';
import styled from 'styled-components';
import {usePlayerStore} from '../store';
import constants from '../constants';

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(${constants.COLUMNS}, 1fr);
    grid-template-rows: repeat(${constants.ROWS}, 1fr);
    gap: 1.25rem;
`
    


const Board = (props) => {
    const rows = [...Array(props.rows).keys()];
    const columns = [...Array(props.columns).keys()];
    // const {player, setPlayer} = useContext(PlayerContext);
    const player = usePlayerStore((state) => state);
    
    return (
        <StyledBoard>
            {rows.map((row, rowIndex) =>
                columns.map((column, columnIndex) => {
                    return <Tile key={`${rowIndex} ${columnIndex}`} player={player} row={rowIndex} column={columnIndex}/>;
                })
            )}
        </StyledBoard>
    );
};

export default Board;
