import { Outlet} from 'react-router-dom';
import React from 'react-dom';
import {useState} from 'react';
import GlobalStyle from './styles/globalStyles';
import FontStyle from './styles/fontStyles';
import PlayerContext from './contexts/PlayerContext';




function App() {
    const [player, setPlayer] = useState({
        symbol: 'cross',
        wins: 0,
        looses: 0,
        ties: 0,
        yourTurn: false,
    });
    console.log(player);
    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
            <FontStyle />
            <GlobalStyle />
            <Outlet />
        </PlayerContext.Provider>
    );
}

export default App;
