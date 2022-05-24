import {useGameStore} from '../store/index';
import React from 'react';

const useCheckEndCondition = () => {
    const game = useGameStore((state) => state);
    const lastAddedSymbol = game.lastPlayerSymbol;
    const lastChangedTile = game.lastTile;
    // console.log('X', lastChangedTile[1] , 'Y', lastChangedTile[0])
    const initialSymbol = game.board[lastChangedTile[0]][lastChangedTile[1]];
    let currentX = lastChangedTile[1];
    let currentY = lastChangedTile[0];

    function resetX() {
        currentX = lastChangedTile[1];
    }
    function resetY() {
        currentY = lastChangedTile[0];
    }


    function isConditionMet(consecutiveSymbols, neededConsecutiveSymbols) {
        if(currentX !== lastChangedTile[1]){
            resetX();
        }
        if(currentY !== lastChangedTile[0]){
            resetY();
        }
        if(consecutiveSymbols >= neededConsecutiveSymbols  - 1) {
            game.setGameOver(true);
            game.setWinner(initialSymbol);
            return true;
        }
        else {
            return false;
        }
    }

    function checkWestEastAxis(){
        let consecutiveSymbols = 0;
        while(currentX !== 0){
            if(game.board[currentY][--currentX] === initialSymbol){
                consecutiveSymbols++;
            }
    
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
        
        //CHECK EAST
        while(currentX !== 2){
            if(game.board[currentY][++currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
    }

    function checkNorthSouthAxis(){
        let consecutiveSymbols = 0;
        while(currentY !== 0){
            if(game.board[--currentY][currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
        //CHECK SOUTH
        while(currentY !== 2){
            if(game.board[++currentY][currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
    }

    function checkNorthEastAxis(){
        let consecutiveSymbols = 0;
        while(currentY !== 2 && currentX !== 2){
            if(game.board[++currentY][++currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
        //CHECK SOUTHWEST
        while(currentY !== 0 && currentX !== 0){
            if(game.board[--currentY][--currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
    }
    function checkNorthWestAxis(){
        let consecutiveSymbols = 0;
        while(currentY !== 0 && currentX !== 2){
            if(game.board[--currentY][++currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
        //CHECK NORTHWEST
        while(currentY !== 2 && currentX !== 0){
            if(game.board[++currentY][--currentX] === initialSymbol){
                consecutiveSymbols++;
            }
            
            else {
                consecutiveSymbols = 0;
            }
        }
        if(isConditionMet(consecutiveSymbols, 3)){
            return true;
        }
    }

    //game.board[lastChangedTile[0]][lastChangedTile[1]];
    // console.log(initialSymbol);

    if(checkNorthSouthAxis()){return};
    if(checkNorthEastAxis()){return};
    if(checkNorthWestAxis()){return};
    if(checkWestEastAxis()){return};

}
export default useCheckEndCondition;