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
    const [isHovering, setIsHovering] = useState(false);
    const [isEnemy, setIsEnemy] = useState(false);

    const game = useGameStore((state) => state);
    const setIsYourTurn = usePlayerStore((state) => state.setIsYourTurn);

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
            props.player.setIsYourTurn(false);
        }
    }
    useEffect(()=>{
        // console.log(JSON.stringify(game.lastTile) === JSON.stringify([props.row, props.column]));
        const isThisTile = !props.player.isYourTurn && JSON.stringify(game.lastTile) === JSON.stringify([props.row, props.column]);

        if(isThisTile && game.lastPlayerSymbol !== props.player.symbol){
            setIsChecked(true);
            setIsEnemy(true);
            setIsYourTurn(true);
        }
    }, [game.board[props.row][props.column]])
    return <StyledTile {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} isChecked={isChecked} isYourTurn={props.player.isYourTurn} >


        {isHovering && props.player.symbol === constants.CROSS && !isChecked ?  <CrossOutline height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        {isHovering && props.player.symbol === constants.CIRCLE && !isChecked ?  <CircleOutline height={64} width={64} color={theme.colors.primaryCircle}/> : ''}

        
        {isChecked && props.player.symbol === constants.CROSS   ? !isEnemy ? <Cross height={64} width={64} color={theme.colors.primaryCross}/> : <Circle height={64} width={64} color={theme.colors.primaryCircle}/> : ''}
        {isChecked && props.player.symbol === constants.CIRCLE ? !isEnemy ? <Circle height={64} width={64} color={theme.colors.primaryCircle}/> : <Cross height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        
        
        </StyledTile>;
}
