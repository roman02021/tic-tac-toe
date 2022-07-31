import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import { Transition } from 'react-transition-group';
import CheckSound from '../sounds/CheckSound';

const transitionDuration = 500;

const StyledIcon = styled.div`
    transform: scale(1.2);
    display: flex;
    z-index: 10;
    transition: all .3s linear;
    ${({isOnBoard}) => 
        isOnBoard &&
        css`opacity: 0;
        animation: check .4s;`
    }
    ${({hovering}) => 
        hovering && 
        css`transform: scale(1);
        opacity: 1;
        `}
    ${({checked}) => 
        checked && 
        css`transform: scale(1);
        opacity: 1;
    `}
    transition: all .2s ease-in;
    
    @keyframes check {
        10% {
            transform: scale(1.5);
        }
        60% {
            transform: scale(.5);
        }
        100% {
            transforM: scale(1);
        }
    }
`


export default function Icon({icon, isOnBoard = false, isHovering = false, checked = false}) {

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
    };
    console.log(isOnBoard);
    

    return (
    <>  
        <StyledIcon hovering={isHovering} checked={checked} duration isOnBoard={isOnBoard} className='icon' >
            {icon}
        </StyledIcon> 
        {checked && <CheckSound/>}
    </>
    );
}

Icon.defaultProps = {

}