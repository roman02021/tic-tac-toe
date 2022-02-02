// import {createContext} from 'react';

// const PlayerContext = createContext();
// export default PlayerContext;

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import constants from '../constants';



export const usePlayerStore = create(devtools((set) => ({
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
})))


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
    resetBoard: () => set((state)=> {state.board = Array.from(Array(constants.ROWS).fill(constants.EMPTY), () => Array(constants.COLUMNS).fill(0))}),
    winner: '',
    setWinner: (winner) => set((state) => set({winner})),
    setGameOver: (gameOver) => set((state) => {
        // console.log('INSIDE SHIT', gameOver);
        (set({isGameOver: gameOver}));
        // console.log('INSIDE SHIT', state.isGameOver);
    }),
    // checkEndCondition: async () => await checkEndCondition()
    
})))


// const enemyMovement = () => {
//     const player = usePlayerStore((state) => state);
//     const game = useGameStore((state) => state);

//     const enemySymbol = player.symbol === constants.CROSS ? constants.CIRCLE : constants.CROSS;

//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }
//     function random(max) {
//         return Math.floor(Math.random() * max);
//     }


//     let availablePositions = [];

//     game.board.map((row, rowIndex) => row.map((symbolOnTile, columnIndex) => {
//         if(symbolOnTile === constants.EMPTY){
//             availablePositions.push([rowIndex, columnIndex]);
//         }
//         return null;
//     }))
//     const enemyMove = availablePositions[random(availablePositions.length)];
    
//     sleep(300);
    
//     if(!game.isGameOver){
//         console.log("ENEMY MOVEMENT", game.isGameOver);
//         game.setTile(enemySymbol, enemyMove[0], enemyMove[1]);
//         console.log("ENEMY MOVEMENT", game.isGameOver);
//     }
// }

const checkEndCondition = (state) => {
    // const game = useGameStore((state) => state);
    if(!state.board.some(row => row.includes(constants.EMPTY))){
        state.setGameOver(true);
        state.setIsTie(true);
        return true;
    }
    const lastChangedTile = state.lastTile;
    const initialSymbol = state.board[lastChangedTile[0]][lastChangedTile[1]];
    let currentX = lastChangedTile[1];
    let currentY = lastChangedTile[0];

    function checkAllAxis(lastTile){
        const originX = lastTile[1];
        const originY = lastTile[0];
        let [leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis] = [0,0,0,0];
        for(let i = 1; i < constants.ROWS; i++){
            
            if(originX - i >= 0 && state.board[originY][originX - i] === initialSymbol){
                leftRightAxis++;
            }
            if(originX + i < constants.COLUMNS && state.board[originY][originX + i] === initialSymbol){
                console.log('bbb');
                leftRightAxis++;
            }
            if(originY - i >= 0 && state.board[originY - i][originX] === initialSymbol){
                topBottomAxis++;
            }
            if(originY + i < constants.ROWS && state.board[originY + i][originX] === initialSymbol){
                topBottomAxis++;
            }
            if(originY - i >= 0 && originX + i < constants.COLUMNS && state.board[originY - i][originX + i] === initialSymbol){
                topLeftBottomRightAxis++;
            }
            if(originY + i < constants.ROWS && originX - i >= 0 && state.board[originY + i][originX - i] === initialSymbol){
                topLeftBottomRightAxis++;
            }
            if(originY + i < constants.ROWS && originX + i < constants.COLUMNS && state.board[originY + i][originX + i] === initialSymbol){
                topRightBottomLeftAxis++;
            }
            if(originY - i >= 0 && originX - i >= 0 && state.board[originY - i][originX - i] === initialSymbol){
                topRightBottomLeftAxis++;
            }
            if([leftRightAxis, topBottomAxis, topLeftBottomRightAxis, topRightBottomLeftAxis].includes(2)){
                console.log('GAME OVER');
                state.setWinner(initialSymbol);
                state.setGameOver(true);
                break;
            }
        }
    }

    checkAllAxis(state.lastTile);

}