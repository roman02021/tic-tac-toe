import { useState, useEffect, useRef } from "react";
import {useGameStore, usePlayerStore} from '../store';
import constants from "../constants";

const useEnemy = () => {
    const initialRender = useRef(true);
    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    const enemySymbol = player.symbol === constants.CROSS ? constants.CIRCLE : constants.CROSS;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function random(max) {
        return Math.floor(Math.random() * max);
    }



    const enemyMovement = async () => {

        let availablePositions = [];

        game.board.map((row, rowIndex) => row.map((symbolOnTile, columnIndex) => {
            if(symbolOnTile === constants.EMPTY){
                availablePositions.push([rowIndex, columnIndex]);
            }
            return null;
        }))
        const enemyMove = availablePositions[random(availablePositions.length)];
        
        await sleep(1000);
        game.setTile(enemySymbol, enemyMove[0], enemyMove[1]);
    }
    const checkEndCondition = () => {
        const lastAddedSymbol = game.lastPlayerSymbol;
        const lastChangedTile = game.lastTile;
        console.log('X', lastChangedTile[1] , 'Y', lastChangedTile[0])
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
        console.log(initialSymbol);

        if(checkNorthSouthAxis()){return};
        if(checkNorthEastAxis()){return};
        if(checkNorthWestAxis()){return};
        if(checkWestEastAxis()){return};
 
    }

    useEffect(()=>{
        if(initialRender.current && !player.isYourTurn){
            enemyMovement();
        }
        if(!initialRender.current && !player.isYourTurn){
            enemyMovement();
        }
        if(!initialRender.current) {
            checkEndCondition();
        }
        initialRender.current = false;
        

    },[player.isYourTurn])
}
export default useEnemy;