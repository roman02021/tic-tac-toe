import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Cross from '../components/icons/Cross';
import Circle from '../components/icons/Circle';
import theme from '../styles/theme';

import {useGameStore, usePlayerStore} from '../store';
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
    min-height: 16.625rem;
    width: 100vw;
    z-index: 5;
`
const StyledLead = styled.div`
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSize.xs};
    letter-spacing: ${theme.kerning.xs};
    text-transform: uppercase;
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

    useEffect(()=>{
        if(player.symbol === constants.CROSS){

            player.setIsYourTurn(true);
        }
        else {
            player.setIsYourTurn(false);
        }
    }, [game.isGameOver])
    return (
        game.isGameOver &&
        <StyledModal $isTie={game.isTie}>
            {!game.isTie && <StyledLead> {game.winner === player.symbol ? "YOU WON" : "YOU LOST"} </StyledLead>}
            
            <StyledMessage $isTie={game.isTie}>
            {!game.isTie && (game.winner === constants.CROSS ? <Cross height={64} width={64} color={theme.colors.primaryCross}/> : <Circle height={64} width={64} color={theme.colors.primaryCircle}/>)}
                
                <MainMessage $isTie={game.isTie}>{!game.isTie ? "TAKES THE ROUND" : "ROUND TIED"}</MainMessage>
                
            </StyledMessage>
            <ButtonContainer>
                <Button color="silver" route="/"  onClick={()=>{
                    game.setGameOver(false);
                    game.setIsTie(false);
                    game.resetWinningLineCoordinates();
                    game.resetBoard();
                    
                    }}>QUIT</Button>
                <Button color="yellow" onClick={()=>{
                    console.log(game.isGameOver);
                    game.setIsTie(false);
                    game.resetBoard();
                    game.resetWinningLineCoordinates();
                    game.setGameOver(false);
                    game.setWinner('');
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
    
    
    );
};

export default EndRoundModal;
