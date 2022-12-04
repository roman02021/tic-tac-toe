import React, { useEffect, useState } from 'react';
import TopControls from '../layouts/TopControls';
import Board from '../layouts/Board';
import BottomStats from '../layouts/BottomStats.jsx';
import { usePlayerStore, useGameStore, useMultiplayerStore } from '../store';
import constants from '../constants';
import useEnemy from '../hooks/enemy';

export default function Game(props) {
  const player = usePlayerStore((state) => state);
  const game = useGameStore((state) => state);
  const multiplayer = useMultiplayerStore((state) => state);

  useEnemy();

  useEffect(() => {
    if (!game.isMultiplayer) {
      if (game.isGameOver && game.isTie) {
        player.increaseTies();
      } else if (game.isGameOver && game.winner === player.symbol) {
        player.increaseWins();
      } else if (game.isGameOver && game.winner === player.enemySymbol) {
        player.increaseLooses();
      }
    } else if (game.isMultiplayer) {
      if (game.isGameOver && game.isTie) {
        multiplayer.incrementTies();
      } else if (game.isGameOver && multiplayer.isPlayerOneTurn) {
        multiplayer.incrementPlayerTwoScore();
      } else if (game.isGameOver && !multiplayer.isPlayerOneTurn) {
        multiplayer.incrementPlayerOneScore();
      }
    }
  }, [game.isGameOver]);

  return (
    <section className="game">
      <TopControls></TopControls>
      <Board columns={constants.COLUMNS} rows={constants.ROWS}></Board>
      <BottomStats></BottomStats>
    </section>
  );
}
