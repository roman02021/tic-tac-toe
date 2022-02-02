import { useState, useEffect, useRef } from "react";
import {useGameStore, usePlayerStore} from '../store';
import constants from "../constants";

const useEnemy = () => {
    const initialRender = useRef(true);
    const player = usePlayerStore((state) => state);

    const setTile = useGameStore((state) => state.setTile);
    const isGameOver = useGameStore((state) => state.isGameOver);
    const setGameOver = useGameStore((state) => state.setGameOver);
    const setWinner = useGameStore((state) => state.setWinner);
    const board = useGameStore((state) => state.board);
    const lastTile = useGameStore((state) => state.lastTile);


    const enemySymbol = player.symbol === constants.CROSS ? constants.CIRCLE : constants.CROSS;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function random(max) {
        return Math.floor(Math.random() * max);
    }



    const enemyMovement = () => {
        // console.log('ENEMY GAME OVER?:', checkEndCondition());
        let availablePositions = [];

        board.map((row, rowIndex) => row.map((symbolOnTile, columnIndex) => {
            if(symbolOnTile === constants.EMPTY){
                availablePositions.push([rowIndex, columnIndex]);
            }
            return null;
        }))
        const enemyMove = availablePositions[random(availablePositions.length)];
        
        sleep(300);
        
        if(!isGameOver){
            setTile(enemySymbol, enemyMove[0], enemyMove[1]);
        }
    }
    // const checkEndCondition = () => {
    //     // const lastAddedSymbol = game.lastPlayerSymbol;
    //     const lastChangedTile = lastTile;
    //     const initialSymbol = board[lastChangedTile[0]][lastChangedTile[1]];

    //     let currentX = lastChangedTile[1];
    //     let currentY = lastChangedTile[0];

    //     function resetX() {
    //         currentX = lastChangedTile[1];
    //     }
    //     function resetY() {
    //         currentY = lastChangedTile[0];
    //     }


    //     function isConditionMet(consecutiveSymbols, neededConsecutiveSymbols) {
    //         if(currentX !== lastChangedTile[1]){
    //             resetX();
    //         }
    //         if(currentY !== lastChangedTile[0]){
    //             resetY();
    //         }
    //         if(consecutiveSymbols >= neededConsecutiveSymbols  - 1) {
    //             setGameOver(true);
    //             console.log("GAME OVER", isGameOver);
    //             setWinner(initialSymbol);
    //             return true;
    //         }
    //         else {
    //             return false;
    //         }
    //     }

    //     function checkWestEastAxis(){
    //         let consecutiveSymbols = 0;

    //         while(currentX !== 0){
    //             if(board[currentY][--currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
        
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         console.log(consecutiveSymbols);
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
            
    //         //CHECK EAST
    //         while(currentX !== 2){
    //             if(board[currentY][++currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //     }

    //     function checkNorthSouthAxis(){
    //         let consecutiveSymbols = 0;
    //         while(currentY !== 0){
    //             if(board[--currentY][currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //         //CHECK SOUTH
    //         while(currentY !== 2){
    //             if(board[++currentY][currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //     }

    //     function checkNorthEastAxis(){
    //         let consecutiveSymbols = 0;
    //         while(currentY !== 2 && currentX !== 2){
    //             if(board[++currentY][++currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //         //CHECK SOUTHWEST
    //         while(currentY !== 0 && currentX !== 0){
    //             if(board[--currentY][--currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //     }
    //     function checkNorthWestAxis(){
    //         let consecutiveSymbols = 0;
    //         while(currentY !== 0 && currentX !== 2){
    //             if(board[--currentY][++currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //         //CHECK NORTHWEST
    //         while(currentY !== 2 && currentX !== 0){
    //             if(board[++currentY][--currentX] === initialSymbol){
    //                 consecutiveSymbols++;
    //             }
                
    //             else {
    //                 consecutiveSymbols = 0;
    //             }
    //         }
    //         if(isConditionMet(consecutiveSymbols, 3)){
    //             return true;
    //         }
    //     }

    //     console.log('a');
    //     if(checkNorthSouthAxis()){
    //         return true
    //     }
    //     if(checkNorthEastAxis()){
    //         return true
    //     }
    //     if(checkNorthWestAxis()){
    //         return true
    //     }
    //     if(checkWestEastAxis()){
    //         return true
    //     }
    //     else {
    //         return false;
    //     }
    //     // if(!isGameOver && !player.isYourTurn){
    //     //     callback();
    //     // }
        
    // }

    useEffect(()=>{
        if(!isGameOver){
            if(!player.isYourTurn){
                enemyMovement();
            }
        }

  
        
        // else if(!isGameOver){

        //     if(initialRender.current && !player.isYourTurn){
        //         enemyMovement();
        //     }
        //     else if(!initialRender.current && !player.isYourTurn){
        //         enemyMovement();
        //     }

        // }
        
        initialRender.current = false;
        

    },[player.isYourTurn])
}
export default useEnemy;