import { useState, useEffect, useRef } from "react";
import {useGameStore, usePlayerStore} from '../store';
import constants from "../constants";

const useEnemy = () => {
    const initialRender = useRef(true);
    const player = usePlayerStore((state) => state);

    const setIsYourTurn = usePlayerStore((state) => state.setIsYourTurn);

    const setTile = useGameStore((state) => state.setTile);
    const isEnemyTurn = usePlayerStore((state) => state.isEnemyTurn);
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
        
        // sleep(300);
        
        console.log('BEFORE ENEMY MOVE', player.isYourTurn);
        setTile(enemySymbol, enemyMove[0], enemyMove[1]);
        setIsYourTurn(true);
        
    }

    useEffect(()=>{
        console.count("STARTED");
        if(!isGameOver){
            console.log("before chedk")
            if(isEnemyTurn){
                console.log("HER EEE")
                enemyMovement();
            }
        }
        
        initialRender.current = false;
    },[isEnemyTurn, isGameOver])
}
export default useEnemy;