import React, {useEffect, useState} from 'react';
import TopControls from '../layouts/TopControls';
import ChooseMark from '../layouts/ChooseMark';
import BottomStats from '../layouts/BottomStats.jsx';
import {StyledMenu} from '../pages/Menu';
import '../styles/styles.css';
import {usePlayerStore, useGameStore} from '../store';
import constants from '../constants';
import useEnemy from '../hooks/enemy';
import * as signalR from "@microsoft/signalr";

export default function Multiplayer(props) {

    const [connection, setConnection] = useState(null);
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

    useEffect(()=>{
        if(game.isMultiplayer){
            const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:7100/enemyHub")
            .build();

            setConnection(newConnection);
        }
        return async () => await connection.stop();
    }, []);

    useEffect(()=>{
        if(connection){
            connection.start();
            console.log("CONNECTION STARTED");
            connection.on("BroadcastPosition", (data) => {
                console.log(JSON.parse(data));
            })

        }
    }, [connection])

    
    return (
        <StyledMenu>
            <ChooseMark className="game">
                
            </ChooseMark>
        </StyledMenu>
    );
}
