import React, {useContext} from 'react';
import Tile from '../components/Tile';
import theme from '../styles/theme';
import styled from 'styled-components';
import PlayerContext from '../contexts/PlayerContext';

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(${theme.dimensions.columns}, 1fr);
    grid-template-rows: repeat(${theme.dimensions.rows}, 1fr);
    gap: 1.25rem;
`
    


const Board = (props) => {
    const rows = [...Array(props.rows).keys()];
    const columns = [...Array(props.columns).keys()];
    const {player, setPlayer} = useContext(PlayerContext);

    return (
        <StyledBoard>
            {rows.map((row, rowIndex) =>
                columns.map((column, columnIndex) => {
                    return <Tile key={`${rowIndex} ${columnIndex}`} player={player} setPlayer={setPlayer}  />;
                })
            )}
        </StyledBoard>
    );
};

export default Board;
