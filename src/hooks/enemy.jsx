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

    const enemyMovement = async () => {
        game.setTile(enemySymbol, 2, 2);
        await sleep(700);
        player.setIsYourTurn(true);
    }

    useEffect(()=>{
        if(!initialRender.current && !player.isYourTurn){
            console.log('isTurn?:', player.isYourTurn);
           enemyMovement();
            
        }
        initialRender.current = false;


    },[player.isYourTurn])
}
export default useEnemy;