import React from 'react';
import TopControls from '../layouts/TopControls';
import Board from '../layouts/Board';
import BottomStats from '../layouts/BottomStats.jsx';
import '../styles/styles.css';

export default function Game(props) {
    const { children } = props;
    console.log(children);
    return (
        <section className="game">
            <TopControls></TopControls>
            <Board columns={3} rows={3}></Board>
            <BottomStats></BottomStats>
        </section>
    );
}
