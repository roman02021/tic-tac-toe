import React, {useEffect, useState} from 'react';
import TopControls from '../layouts/TopControls';
import Board from '../layouts/Board';
import BottomStats from '../layouts/BottomStats.jsx';
import '../styles/styles.css';
import {usePlayerStore, useGameStore} from '../store';
import constants from '../constants';
import useEnemy from '../hooks/enemy';
import * as signalR from "@microsoft/signalr";

export default function Game(props) {

    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);

    useEnemy();
    
    
    useEffect(()=>{
        if(game.isGameOver && game.isTie){
            player.increaseTies();
        }
        
        else if(game.isGameOver && game.winner === player.symbol){
            player.increaseWins();
        }
        else if(game.isGameOver && game.winner === player.enemySymbol){
            player.increaseLooses();
        }
    },[game.winner])


    
    return (
        <section className="game">
            <TopControls></TopControls>
            <Board columns={constants.COLUMNS} rows={constants.ROWS}></Board>
            <BottomStats></BottomStats>
        </section>
    );
}
