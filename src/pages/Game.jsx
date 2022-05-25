import React, {useEffect, useState} from 'react';
import TopControls from '../layouts/TopControls';
import Board from '../layouts/Board';
import BottomStats from '../layouts/BottomStats.jsx';
import '../styles/styles.css';
import {usePlayerStore, useGameStore, useMultiplayerStore} from '../store';
import constants from '../constants';
import useEnemy from '../hooks/enemy';

export default function Game(props) {

    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);

    useEnemy();
    
    useEffect(()=>{
        if(!game.isMultiplayer){
            if(game.isGameOver && game.isTie){
                player.increaseTies();
            }
            
            else if(game.isGameOver && game.winner === player.symbol){
                player.increaseWins();
            }
            else if(game.isGameOver && game.winner === player.enemySymbol){
                player.increaseLooses();
            }
        }
        else if(game.isMultiplayer){
            if(game.isGameOver && game.isTie){
                multiplayer.increaseTies();
            }
            
            else if(game.isGameOver && game.winner === constants.CROSS){
                multiplayer.incrementPlayerOneScore();
            }
            else if(game.isGameOver && game.winner === constants.CIRCLE){
                multiplayer.incrementPlayerTwoScore();
            }
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
