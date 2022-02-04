import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import CircleOutline from '../components/icons/CircleOutline';
import CrossOutline from '../components/icons/CrossOutline';
import constants from '../constants';
import {useGameStore, usePlayerStore} from '../store';

const StyledTile = styled.div`
    height: 8.75rem;
    width: 8.75rem;
    box-sizing: border-box;
    background-color: ${theme.colors.backgroundColor};
    border-radius: ${theme.borders.borderRadius};
    border-bottom: 0.5rem solid #10212a;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.isChecked || !props.isYourTurn ?  'default' : 'pointer' };
    
`


export default function Tile(props) {
    // console.log(props.symbol);
    const [isChecked, setIsChecked] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEnemy, setIsEnemy] = useState(false);
    
    const game = useGameStore((state) => state);
    const player = usePlayerStore((state) => state);

    const handleMouseEnter = (e) => {
        if(props.player.isYourTurn){
            setIsHovering(true);
        }
    }
    const handleMouseLeave = () => {
        if(props.player.isYourTurn){
            setIsHovering(false);
        }
    }
    const handleClick = () => {
        if(!isChecked && props.player.isYourTurn) {
            game.setTile(props.player.symbol, props.row, props.column);
            setIsChecked(true);
            player.setIsYourTurn(false);
            player.setIsEnemyTurn(true);
            
        }
    }
    useEffect(()=>{
        console.log('BOARD CHANGED');
        console.log(game.board, player.isEnemyTurn,game.board[props.row][props.column], player.enemySymbol, player.isEnemyTurn && game.board[props.row][props.column] === player.enemySymbol);
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
            console.log('aa');
            setIsEnemy(true);
            setIsChecked(true);
            player.setIsYourTurn(true);
            player.setIsEnemyTurn(false);
        }

    }, [game.board[props.row][props.column]]);

    useEffect(()=>{
        console.log([[0,0]].includes([0,0]))
        
        game.winningTileCoordinates.map(coordinate =>{
            if(JSON.stringify(coordinate) === JSON.stringify([props.row, props.column])){
                console.log('yep this one', coordinate, [props.row, props.column])
                setIsHighlighted(true);
                return true;
              
            }
        })

        if(game.winningTileCoordinates.includes([props.row, props.column])){
            console.log('INCLUDES');
        }

    }, [game.winningTileCoordinates])
    return <StyledTile {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} isChecked={isChecked} isYourTurn={props.player.isYourTurn} $isHighlighted={isHighlighted} $playerSymbol={player.symbol} >


        {isHovering && props.player.symbol === constants.CROSS && !isChecked ?  <CrossOutline height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        {isHovering && props.player.symbol === constants.CIRCLE && !isChecked ?  <CircleOutline height={64} width={64} color={theme.colors.primaryCircle}/> : ''}

        
        {isChecked && props.player.symbol === constants.CROSS   ? !isEnemy ? <Cross height={64} width={64} color={theme.colors.primaryCross}/> : <Circle height={64} width={64} color={theme.colors.primaryCircle}/> : ''}
        {isChecked && props.player.symbol === constants.CIRCLE ? !isEnemy ? <Circle height={64} width={64} color={theme.colors.primaryCircle}/> : <Cross height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        
        
        </StyledTile>;
}
