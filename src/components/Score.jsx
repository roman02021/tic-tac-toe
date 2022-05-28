import React from 'react';
import theme from '../styles/theme';
import styled from 'styled-components';

const StyledScore = styled.div`
    height: 4.5rem;
    color: ${theme.colors.borderColor};
    border-radius: ${theme.borders.borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => handleColorType(props.color)};
`

const StyledCounter = styled.div`
    font-weight: bold;
    font-size: ${theme.fontSize.m};
    letter-spacing: ${theme.kerning.m};
`
const StyledText = styled.div`
    font-size: ${theme.fontSize.body};
    letter-spacing: ${theme.kerning.body};
    
`
const handleColorType = (color) => {
    switch (color) {
        case 'blue':
            return theme.colors.primaryCross;
        case 'silver':
            return theme.colors.secondary;
        default:
            return theme.colors.primaryCircle;
    }
};

const Score = (props) => {

    
    return <StyledScore {...props}>
        <StyledText>{props.text}</StyledText>
        <StyledCounter>{props.counter}</StyledCounter>
    </StyledScore>;
};
export default Score;