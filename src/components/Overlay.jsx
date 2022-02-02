import React, {useEffect} from 'react';
import styled from 'styled-components';


import theme from '../styles/theme';

import {useGameStore} from '../store';

const StyledOverlay = styled.div`
    background-color: rgba(0,0,0, 0.5);
    position: fixed;
    height: 100vh;
    width: 100vw;
`


const Overlay = () => {
    const game = useGameStore((state) => state);
    
    useEffect(()=>{
        
    }, [game.isGameOver])
    return (
        (game.isGameOver || game.showRestartModal) && 
        <StyledOverlay/>
    );
};

export default Overlay;
