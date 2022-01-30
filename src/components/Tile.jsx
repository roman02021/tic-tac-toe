import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import CircleOutline from '../components/icons/CircleOutline';
import CrossOutline from '../components/icons/CrossOutline';

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
    cursor: ${(props) => props.isChecked ?  'default' : 'pointer' };
    
`


export default function Tile(props) {
    // console.log(props.symbol);
    const [isChecked, setIsChecked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = (e) => {
        setIsHovering(true);
    }
    const handleMouseLeave = () => {
        setIsHovering(false);
    }
    const handleClick = () => {
        if(!isChecked) {
            props.setPlayer({...props.player, yourTurn: !props.player.yourTurn})
        }
        setIsChecked(true);
    }
    return <StyledTile {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} isChecked={isChecked} >


        {isHovering && props.player.symbol === 'cross' && !isChecked ?  <CrossOutline height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        {isHovering && props.player.symbol === 'circle' && !isChecked ?  <CircleOutline height={64} width={64} color={theme.colors.primaryCircle}/> : ''}

        
        {isChecked && props.player.symbol === 'cross' ?  <Cross height={64} width={64} color={theme.colors.primaryCross}/> : ''}
        {isChecked && props.player.symbol === 'circle' ?  <Circle height={64} width={64} color={theme.colors.primaryCircle}/> : ''}
        
        
        </StyledTile>;
}
