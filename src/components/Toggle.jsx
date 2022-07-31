import {React,  useState , useContext} from 'react';

import theme from '../styles/theme';
import {usePlayerStore} from '../store';
import Moon from './icons/Moon';
import Sun from './icons/Sun';
import Icon from './icons/Icon';
import constants from '../constants';
import styled, {css} from 'styled-components';



const StyledToggle = styled.div`
    background-color: ${theme.colors.backgroundColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:.5rem;
    cursor: pointer;
    width: 4rem;
    box-shadow: 0 4px 0 ${theme.colors.menuBorderColor};
    border-radius: ${theme.borders.borderRadius};
    position: relative;
    box-sizing: border-box;
    &:after {
        content: '';
        display: block;
        position: absolute;
        z-index: 5;
        left: .25rem;
        top: 50%;
        border-radius: 50%;
        background-color: ${theme.colors.borderColor};
        width: 24px;
        height: 24px;
        transform: translate(0, -50%);
        transition: all .3s linear;
        ${({isChecked}) => isChecked && css`transform: translate(calc(100% + .5rem), -50%);`}
    }
`

export default function Toggle({leftIcon, rightIcon}) {
    const player = usePlayerStore((state) => state);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <StyledToggle isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
            {leftIcon}
            {rightIcon}
        </StyledToggle>
    );
}
