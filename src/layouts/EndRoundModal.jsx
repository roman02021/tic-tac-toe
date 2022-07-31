import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Cross from '../components/icons/Cross';
import Circle from '../components/icons/Circle';
import theme from '../styles/theme';
import useMediaQuery from '../hooks/useMediaQuery';
import VictorySound from '../components/sounds/VictorySound';
import DefeatSound from '../components/sounds/DefeatSound';


import {useGameStore, usePlayerStore, useMultiplayerStore} from '../store';
import constants from '../constants';

const StyledModal = styled.div`
    background-color: ${theme.colors.backgroundColor};
    position: absolute;
    top: 50%;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    justify-content: center;
    align-items: center;
    min-height: ${props => props.$isMobile ? '14rem' : '16.625rem'};
    width: 100vw;
    z-index: 20;

`
const StyledLead = styled.div`
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSize.xs};
    letter-spacing: ${theme.kerning.xs};
    text-transform: uppercase;
    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: ${theme.fontSize.body};
    }
`
const StyledMessage = styled.div`
    color: ${theme.colors.primaryCross};
    font-size: ${theme.fontSize.l};
    letter-spacing: ${theme.kerning.l};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: ${(props) => props.$isTie ? '2rem' : '1.5rem'};
`
const MainMessage = styled.div`
    margin-left: ${(props) => props.$isTie ? '' : '1.5rem'} ;
    font-weight: bold;
    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: ${theme.fontSize.m};
    }
`
const ButtonContainer = styled.div`
    font-weight: bold;
    display: flex;
    &:not(:last-child){
        margin-right: 1rem;
    }
`




const EndRoundModal = () => {
    const game = useGameStore((state) => state);
    const player = usePlayerStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);

    const isMobile = useMediaQuery(theme.breakpoints.mobile);


    useEffect(()=>{
        if(game.isGameOver){
            if(!game.isMultiplayer){
                if(player.symbol === constants.CROSS){
                    player.setIsYourTurn(true);
                }
                else {
                    player.setIsYourTurn(false);
                }  
            }
            else if(game.isMultiplayer) {
                
                if(!multiplayer.isPlayerOneTurn){
                    console.log('IS CROSS', player.symbol, multiplayer.isPlayerOneTurn, game.winner, multiplayer.winner);
                    multiplayer.setWinner(constants.CROSS);
                }
                else {
                    console.log('IS CIRCLE', player.symbol, multiplayer.isPlayerOneTurn, game.winner, multiplayer.winner);
                    multiplayer.setWinner(constants.CIRCLE);
                }  
            }
        }


    }, [game.isGameOver])
    return (
        <>
        {game.isGameOver &&
        <StyledModal $isTie={game.isTie} $isMobile={isMobile}>
            {!game.isTie && <StyledLead> 
                {game.isMultiplayer ? (game.winner === constants.CROSS && player.symbol === constants.CROSS ? 
                    'PLAYER 1 WINS!' : 
                    game.winner === constants.CROSS && player.symbol === constants.CIRCLE ?
                    'PLAYER 2 WINS!' : game.winner === constants.CIRCLE && player.symbol === constants.CIRCLE ?
                    'PLAYER 1 WINS!' : 'PLAYER 2 WINS!') : game.winner === player.symbol ? "YOU WON!" : "OH NO, YOU LOST…"} 
            </StyledLead>}
            
            <StyledMessage $isTie={game.isTie}>
            {!game.isTie && (game.winner === constants.CROSS ? <Cross height={isMobile ? 32 : 64} width={isMobile ? 32 : 64} color={theme.colors.primaryCross}/> : <Circle height={isMobile ? 32 : 64} width={isMobile ? 32 : 64} color={theme.colors.primaryCircle}/>)}
                
                <MainMessage $isTie={game.isTie}>{!game.isTie ? "TAKES THE ROUND" : "ROUND TIED"}</MainMessage>
                
            </StyledMessage>
            <ButtonContainer>
                <Button $fullWidth={false} color="silver" route="/"  onClick={()=>{
                    game.setGameOver(false);
                    game.setIsTie(false);
                    game.resetWinningLineCoordinates();
                    game.resetBoard();
                    game.setWinner('');
                    player.setIsEnemyTurn(false);
                    
                    }}>QUIT</Button>
                <Button $fullWidth={false} color="yellow" onClick={()=>{
                    game.setIsTie(false);
                    game.resetBoard();
                    game.resetWinningLineCoordinates();
                    game.setGameOver(false);
                    game.setWinner('');
                    multiplayer.setIsPlayerOneTurn(true);
                    multiplayer.setIsGameOver(false);
                    if(player.symbol === constants.CROSS){
                        player.setIsYourTurn(true);
                        player.setIsEnemyTurn(false);
                    }
                    else if(player.enemySymbol === constants.CROSS){
                        player.setIsYourTurn(false);
                        player.setIsEnemyTurn(true);
                    }
                }} >NEXT ROUND</Button>
            </ButtonContainer>
        </StyledModal>
}       {!game.isMultiplayer && ((player.symbol === constants.CROSS && game.winner === constants.CROSS) || (player.symbol === constants.CIRCLE && game.winner === constants.CIRCLE)) && <VictorySound/>}

        {!game.isMultiplayer && ((player.symbol === constants.CROSS && game.winner === constants.CIRCLE) || (player.symbol === constants.CROSS && game.winner === constants.CIRCLE)) && <DefeatSound/>}
        </>
    
    
    );
};

export default EndRoundModal;
