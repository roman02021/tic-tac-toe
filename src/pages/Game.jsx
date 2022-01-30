import React, {useEffect} from 'react';
import TopControls from '../layouts/TopControls';
import Board from '../layouts/Board';
import BottomStats from '../layouts/BottomStats.jsx';
import '../styles/styles.css';
import {usePlayerStore, useGameStore} from '../store';
import constants from '../constants';
import useEnemy from '../hooks/enemy';

export default function Game(props) {

    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    // console.log('POSITION: ', game.board);
    



    useEnemy();

    // useEffect(() => {
    //     if(player.symbol === constants.CROSS && player.isYourTurn === false){
    //         player.setIsYourTurn(true);
    //     }
    // }, [])

    return (
        <section className="game">
            <TopControls></TopControls>
            <Board columns={constants.COLUMNS} rows={constants.ROWS}></Board>
            <BottomStats></BottomStats>
        </section>
    );
}
