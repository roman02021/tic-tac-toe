import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import { Transition } from 'react-transition-group';
import CheckSound from '../sounds/CheckSound';

const transitionDuration = 500;

const StyledIcon = styled.div`
    transform: scale(1.2);
    
    opacity: 0;
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
    animation: check .4s;
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


export default function Icon({icon, isOnBoard, isHovering, checked = false}) {

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
    };
    

    return (
    <>  
        <StyledIcon hovering={isHovering} checked={checked} duration isOnBoard className='icon' >
            {icon}
            
        </StyledIcon> 
        {checked && <CheckSound/>}
    </>
    );
}

Icon.defaultProps = {

}