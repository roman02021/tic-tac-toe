// import {createContext} from 'react';

// const PlayerContext = createContext();
// export default PlayerContext;

import create from 'zustand';
import constants from '../constants';

export const usePlayerStore = create((set) => ({
    symbol: constants.CROSS,
    wins: 0,
    looses: 0,
    ties: 0,
    isYourTurn: true,
    setSymbol: (symbol) => set((state) => set({symbol})),
    setIsYourTurn: (isYourTurn) => set((state) => ({isYourTurn})),
    increaseWins: () => set((state) => ({wins: state.wins++})),
    increaseTies: () => set((state) => ({wins: state.ties++})),
    increaseLooses: () => set((state) => ({wins: state.looses++})),
}))


export const useGameStore = create((set) => ({
    //creates game board with fields initialized at 0
    board: Array.from(Array(constants.ROWS).fill(constants.EMPTY), () => Array(constants.COLUMNS).fill(0)),
    lastTile: [0,0],
    lastPlayerSymbol: constants.CIRCLE,
    setTile: (symbol, row, column) => set((state) => {
        state.board[row][column] = symbol;
        state.lastPlayerSymbol = symbol;
        state.lastTile = [row, column];
    }
    )
}))
