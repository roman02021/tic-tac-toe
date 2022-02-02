import { useState, useEffect, useRef } from "react";
import {useGameStore, usePlayerStore} from '../store';
import constants from "../constants";

const enemyMovement = async () => {
    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);

    const enemySymbol = player.symbol === constants.CROSS ? constants.CIRCLE : constants.CROSS;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function random(max) {
        return Math.floor(Math.random() * max);
    }


    let availablePositions = [];

    game.board.map((row, rowIndex) => row.map((symbolOnTile, columnIndex) => {
        if(symbolOnTile === constants.EMPTY){
            availablePositions.push([rowIndex, columnIndex]);
        }
        return null;
    }))
    const enemyMove = availablePositions[random(availablePositions.length)];
    
    await sleep(300);
    
    if(!game.isGameOver){
        console.log("ENEMY MOVEMENT", game.isGameOver);
        game.setTile(enemySymbol, enemyMove[0], enemyMove[1]);
        console.log("ENEMY MOVEMENT", game.isGameOver);
    }
}

export default enemyMovement;