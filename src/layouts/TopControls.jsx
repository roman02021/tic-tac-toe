import React, {useContext, useState} from 'react';
import Logo from '../components/icons/Logo';
import Restart from '../components/icons/Restart';
import Cross from '../components/icons/Cross';
import Circle from '../components/icons/Circle';
import Button from '../components/Button';
import SlimTile from '../components/SlimTile';
import theme from '../styles/theme';
import styled from 'styled-components';
import GridItem from './GridItem';
import {usePlayerStore, useGameStore, useMultiplayerStore} from '../store';
import constants from '../constants';
import Game from '../pages/Game';




const StyledTopControls = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(${constants.ROWS}, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    
`

const TopControls = () => {

    const player = usePlayerStore((state) => state);
    const game = useGameStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);
    const setShowRestartModal = useGameStore((state) => state.setShowRestartModal);

    return (
        <StyledTopControls>
            <GridItem position='left'>
                <Logo className="logo" />
            </GridItem>
            <GridItem position='center'>
                <SlimTile
                    icon={
                        !game.isMultiplayer ?
                        (
                        (player.isYourTurn && player.symbol === constants.CROSS) || (!player.isYourTurn && player.symbol === constants.CIRCLE) ? 
                        (!game.isGameOver ?<Circle
                            width={20}
                            height={20}
                            color={theme.colors.primaryCircle}/> : <Cross
                            width={20}
                            height={20}
                            color={theme.colors.secondary}/>) 
                        : 
                        (!game.isGameOver ?
                            <Cross
                                width={20}
                                height={20}
                                color={theme.colors.primaryCross}/> : <Circle
                                width={20}
                                height={20}
                                color={theme.colors.secondary}/>) 
                        )
                        :
                        multiplayer.isPlayerOneTurn ? (!game.isGameOver ?<Cross
                        width={20}
                        height={20}
                        color={theme.colors.secondary}/> : <Circle
                        width={20}
                        height={20}
                        color={theme.colors.primaryCircle}/>)  
                        :
                        (!game.isGameOver ?
                        <Circle
                            width={20}
                            height={20}
                            color={theme.colors.secondary}/> : <Cross
                            width={20}
                            height={20}
                            color={theme.colors.primaryCross}/>)  
                    }
                >
                    Turn
                </SlimTile>
            </GridItem>
            <GridItem position='right'>
                <Button icon={<Restart />} color='silver' square borderWidth='small' onClick={()=> setShowRestartModal(true)} />
            </GridItem>
        </StyledTopControls>
    );
};

export default TopControls;

