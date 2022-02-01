import React, {useEffect} from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Cross from '../components/icons/Cross';

import theme from '../styles/theme';

import {useGameStore} from '../store';

const StyledModal = styled.div`
    background-color: ${theme.colors.backgroundColor};
    position: absolute;
    top: 50%;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    justify-content: center;
    align-items: center;
    padding: 2.8125rem;
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
    margin-bottom: 1.5rem;
`
const MainMessage = styled.div`
    margin-left: 1.5rem;
`
const ButtonContainer = styled.div`
    font-weight: bold;
    &:not(:last-child){
        margin-right: 1rem;
    }
`




const Modal = () => {
    const game = useGameStore((state) => state);
    
    useEffect(()=>{
        
    }, [game.isGameOver])
    return (
        game.isGameOver && 
        <StyledModal>
            <StyledLead>YOU WON</StyledLead>
            <StyledMessage>
                <Cross height={64} width={64} color={theme.colors.primaryCross}/>
                <MainMessage>TAKES THE ROUND</MainMessage>
                
            </StyledMessage>
            <ButtonContainer>
                <Button color="silver" route="/">QUIT</Button>
                <Button color="yellow" route="/game">NEXT ROUND</Button>
            </ButtonContainer>
        </StyledModal>
    
    
    );
};

export default Modal;
