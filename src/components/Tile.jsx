import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import CircleOutline from '../components/icons/CircleOutline';
import CrossOutline from '../components/icons/CrossOutline';
import constants from '../constants';
import {useGameStore, usePlayerStore, useMultiplayerStore} from '../store';

const StyledTile = styled.div`
    height: 8.75rem;
    width: 8.75rem;
    box-sizing: border-box;
    /* background-color: ${theme.colors.backgroundColor}; */
    ${(props) =>{
        if(!props.$isMultiplayer && props.$isHighlighted && props.$playerSymbol === constants.CROSS){
            return `background-color: ${props.$isEnemy ? theme.colors.primaryCircle  : theme.colors.primaryCross};`
        }
        else if(!props.$isMultiplayer && props.$isHighlighted && props.$playerSymbol === constants.CIRCLE){
            return `background-color: ${props.$isEnemy ? theme.colors.primaryCross : theme.colors.primaryCircle};`
        }
        else if(props.$isMultiplayer && props.$isHighlighted && props.$isCross){
            return `background-color: ${props.$isEnemy ? theme.colors.primaryCircle  : theme.colors.primaryCross};`
        }
        else if(props.$isMultiplayer && props.$isHighlighted && !props.$isCross){
            return `background-color: ${props.$isEnemy ? theme.colors.primaryCircle  : theme.colors.primaryCircle};`
        }
        else {
            return `background-color: ${theme.colors.backgroundColor};`
        }
    }}
    border-radius: ${theme.borders.borderRadius};
    border-bottom: 0.5rem solid #10212a;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.$isMultiplayer ? 'pointer' : props.isChecked || !props.isYourTurn ?  'default' : 'pointer' }; 
`


export default function Tile(props) {
    const [isChecked, setIsChecked] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEnemy, setIsEnemy] = useState(false);

    const [isCross, setIsCross] = useState(true);
    
    
    const game = useGameStore((state) => state);
    const player = usePlayerStore((state) => state);
    const multiplayer = useMultiplayerStore((state) => state);
    const handleMouseEnter = (e) => {
        
        if(props.player.isYourTurn || game.isMultiplayer){
            setIsHovering(true);
        }
    }
    const handleMouseLeave = () => {
        if(props.player.isYourTurn || game.isMultiplayer){
            setIsHovering(false);
        }
    }
    const handleClick = () => {
        if(!isChecked && props.player.isYourTurn && !game.isMultiplayer) {
            game.setTile(props.player.symbol, props.row, props.column);
            setIsChecked(true);
            player.setIsYourTurn(false);
            player.setIsEnemyTurn(true);
            
        }
        else if(!isChecked && game.isMultiplayer){
            
            setIsChecked(true);
            if(multiplayer.isPlayerOneTurn){
                game.setTile(constants.CROSS, props.row, props.column);
                setIsCross(true);
                multiplayer.setIsPlayerOneTurn(false);
            }
            else {
                game.setTile(constants.CIRCLE, props.row, props.column);
                setIsCross(false);
                multiplayer.setIsPlayerOneTurn(true);
            }
        }

        
    }
    useEffect(()=>{
        if(!game.isMultiplayer){
            if(game.board[props.row][props.column] === constants.EMPTY){
                setIsChecked(false);
                setIsEnemy(false);
                setIsHovering(false);
            }
            else if(player.isYourTurn && game.board[props.row][props.column] === player.symbol){
                setIsChecked(true);
                player.setIsEnemyTurn(true);
                player.setIsYourTurn(false);
            }
            else if(player.isEnemyTurn && game.board[props.row][props.column] === player.enemySymbol){
                setIsEnemy(true);
                setIsChecked(true);
                player.setIsYourTurn(true);
                player.setIsEnemyTurn(false);
            }
        }
        else {
            if(game.board[props.row][props.column] === constants.EMPTY){
                setIsChecked(false);
                setIsEnemy(false);
                setIsHovering(false);
            }
            else {
            }
        }


    }, [game.board[props.row][props.column]]);

    useEffect(()=>{
        // console.log('IT SHOULD RESET NOW', game.winningLineCoordinates);
        
        //Check if this tile is on the winning line
    
        // game.winningLineCoordinates.map((coordinate) =>{
        //     if(JSON.stringify(coordinate) === JSON.stringify([props.row, props.column])){
        //         // console.log('yep this one', coordinate, [props.row, props.column])
        //         setIsHighlighted(true);
        //     }
        // })
        for(let i = 0; i < game.winningLineCoordinates.length; i++){ 
            if(JSON.stringify(game.winningLineCoordinates[i]) === JSON.stringify([props.row, props.column])){
                setIsHighlighted(true);
                break;
            }
            else if(i === game.winningLineCoordinates.length - 1){
                setIsHighlighted(false);
            }
        }

    }, [game.winningLineCoordinates])
    return <StyledTile {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} isChecked={isChecked} isYourTurn={props.player.isYourTurn} $isHighlighted={isHighlighted} $isMultiplayer={game.isMultiplayer} $isCross={isCross} $playerSymbol={player.symbol} $enemySymbol={player.enemySymbol} $isEnemy={isEnemy}>
        {
        !game.isMultiplayer ?
        <>
            {isHovering && props.player.symbol === constants.CROSS && !isChecked ?  <CrossOutline height={64} width={64} color={theme.colors.primaryCross}/> : ''}

            {isHovering && props.player.symbol === constants.CIRCLE && !isChecked ?  <CircleOutline height={64} width={64} color={theme.colors.primaryCircle}/> : ''}

            
            {isChecked && props.player.symbol === constants.CROSS ? !isEnemy ? <Cross height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCross}/> : <Circle height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCircle}/> : ''}

            {isChecked && props.player.symbol === constants.CIRCLE ? !isEnemy ? <Circle height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCircle}/> : <Cross height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCross}/> : ''}
        </>
        :
        <>
            {isHovering && multiplayer.isPlayerOneTurn && !isChecked ? <CrossOutline height={64} width={64} color={theme.colors.primaryCross}/> : ''}

            {isHovering && !multiplayer.isPlayerOneTurn && !isChecked ? <CircleOutline height={64} width={64} color={theme.colors.primaryCircle}/> : ''}

            {isChecked && isCross ? 
            <Cross height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCross}/> : '' }

            {isChecked && !isCross ? 
            <Circle height={64} width={64} color={isHighlighted ? theme.colors.backgroundColor : theme.colors.primaryCircle}/> 
            : '' }
        </>
        }
        
        
        </StyledTile>;
}
