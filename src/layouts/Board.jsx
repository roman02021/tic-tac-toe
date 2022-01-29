import React from 'react';
import Tile from '../components/Tile';
import theme from '../styles/theme';
import styled from 'styled-components';


const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(${theme.dimensions.columns}, 1fr);
    grid-template-rows: repeat(${theme.dimensions.rows}, 1fr);
    gap: 1.25rem;
`
    


const Board = (props) => {
    const rows = [...Array(props.rows).keys()];
    const columns = [...Array(props.columns).keys()];

    return (
        <StyledBoard>
            {rows.map((row, rowIndex) =>
                columns.map((column, columnIndex) => {
                    return <Tile key={`${rowIndex} ${columnIndex}`} />;
                })
            )}
        </StyledBoard>
    );
};

export default Board;
