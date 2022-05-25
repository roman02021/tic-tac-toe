// import {createContext} from 'react';

// const PlayerContext = createContext();
// export default PlayerContext;

import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import checkAllAxis from './checkAllAxis';
import constants from '../constants';



export const usePlayerStore = create((persist((set) => ({
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
}), {
    name: "player-storage"
    }
)));


export const useGameStore = create((persist((set, get) => ({
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
            state.isGameOver = true;
            state.winner = symbol;
        }
    },
    ),
    isMultiplayer: false,
    setIsMultiplayer: (isMultiplayer) => set((state) => set({isMultiplayer})),
    showRestartModal: false,
    setShowRestartModal: (showRestartModal) => set((state) =>{ set({showRestartModal})}),
    resetBoard: () => set((state)=> set({board: Array.from(Array(constants.ROWS).fill(constants.EMPTY), () => Array(constants.COLUMNS).fill(0))})),
    winner: '',
    setWinner: (winner) => set((state) => set({winner})),
    winningLineCoordinates: [[-1, -1], [-1, -1], [-1, -1]],
    resetWinningLineCoordinates: () => set((state) => set({winningLineCoordinates: [[-1, -1], [-1, -1], [-1, -1]]})),
    setWinningLineCoordinates: (winningLineCoordinates) => set((state) => set({winningLineCoordinates})),
    setGameOver: (gameOver) => set((state) => {
        (set({isGameOver: gameOver}));
    }),    
}), {
    name: "game-storage"
    }
)));


export const useMultiplayerStore = create((persist((set, get) => ({
    //creates game board with fields initialized at 0
    isPlayerOneTurn: true,
    setIsPlayerOneTurn: (isPlayerOneTurn) => set({isPlayerOneTurn}),
    playerOneScore: 0,
    incrementPlayerOneScore: () => set((state) => ({playerOneScore: state.playerOneScore + 1})),
    playerTwoScore: 0,
    incrementPlayerTwoScore: () => set((state) => ({playerTwoScore: state.playerTwoScore + 1})),
    ties: 0,
    incrementTies: () => set((state) => ({ties: state.ties + 1})),
    resetScore: set((state) => ({playerOneScore: 0, playerTwoScore: 0}))
}), {
    name: "multiplayer-storage"
    }
)));


const checkEndCondition = (state) => {
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