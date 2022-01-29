import React from 'react';
import '../styles/styles.css';
import ChooseMark from '../layouts/ChooseMark';
import Button from '../components/Button';
import Logo from '../components/icons/Logo';
import styled from 'styled-components';


const StyledMenu = styled.section`
    width: 28.75rem;
    height: 29.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Menu(props) {
    return (
        <StyledMenu >
            <div className="logo">
                <Logo className="logo__logo" />
            </div>
            <ChooseMark />
            <Button fullWidth cross={true} route="/game" color="yellow">
                New game (vs CPU)
            </Button>
            <Button fullWidth cross={false} route="/multiplayer" color="blue">
                New game (vs Player)
            </Button>
        </StyledMenu>
    );
}
