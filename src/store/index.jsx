// import {createContext} from 'react';

// const PlayerContext = createContext();
// export default PlayerContext;

import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import checkAllAxis from './checkAllAxis';
import constants from '../constants';



export const usePlayerStore = create((devtools((set) => ({
    symbol: constants.CROSS,
    enemySymbol: constants.CIRCLE,
    wins: 0,
    looses: 0,
    ties: 0,
    isYourTurn: true,
    isEnemyTurn: false,
    setIsEnemyTurn: (isEnemyTurn) => set(state => {set({isEnemyTurn})}),
    setSymbol: (symbol) => set((state) => set({symbol})),
    setEnemySymbol: (enemySymbol) => set((state) => set({enemySymbol})),
    setIsYourTurn: (isYourTurn) => set((state) => ({isYourTurn})),
    increaseWins: () => set((state) => ({wins: state.wins + 1})),
    increaseTies: () => set((state) => ({ties: state.ties + 1})),
    increaseLooses: () => set((state) => ({looses: state.looses + 1})),
}))))


export const useGameStore = create(devtools((set, get) => ({
    //creates game board with fields initialized at 0
    board: Array.from(Array(constants.ROWS).fill(constants.EMPTY), () => Array(constants.COLUMNS).fill(0)),
    lastTile: [0,0],
    lastPlayerSymbol: constants.CIRCLE,
    isGameOver: false,
    isTie: false,
    setIsTie: (isTie) => set({isTie}),
    setTile: (symbol, row, column) => set((state) => {
        state.board[row][column] = symbol;
        state.lastPlayerSymbol = symbol;
        state.lastTile = [row, column];
        if(checkEndCondition(state)){
            // console.log('GAME OVER', symbol);
            state.isGameOver = true;
            state.winner = symbol;
        }
    },
    ),

    showRestartModal: false,
    setShowRestartModal: (showRestartModal) => set((state) =>{ console.log("KURVA"); set({showRestartModal})}),
    resetBoard: () => set((state)=> set({board: Array.from(Array(constants.ROWS).fill(constants.EMPTY), () => Array(constants.COLUMNS).fill(0))})),
    winner: '',
    setWinner: (winner) => set((state) => set({winner})),
    winningTileCoordinates: [[constants.EMPTY, constants.EMPTY], [constants.EMPTY, constants.EMPTY], [constants.EMPTY, constants.EMPTY]],
    setWinningTileCoordinates: (winningTileCoordinates) => set((state) => set({winningTileCoordinates})),
    setGameOver: (gameOver) => set((state) => {
        // console.log('INSIDE SHIT', gameOver);
        (set({isGameOver: gameOver}));
        // console.log('INSIDE SHIT', state.isGameOver);
    }),
    // checkEndCondition: async () => await checkEndCondition()
    
})))





const checkEndCondition = (state) => {
    // const game = useGameStore((state) => state);


    if(checkAllAxis(state)){
        console.log('game ended');
    }

    else if(!state.board.some(row => row.includes(constants.EMPTY))){
        state.setGameOver(true);
        state.setIsTie(true);
        state.setWinner(state.lastPlayerSymbol);
        return true;
    }


}