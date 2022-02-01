import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';

import '../styles/styles.css';



export default function Button(props) {
    const navigate = useNavigate();

    const navigateOnClick = (route) => {
        navigate(route);
    };
    
    return (
        <StyledButton
            onClick={() => props.route && navigateOnClick(props.route)}
            {...props}
        >
            <span className="heading-s">{props.children}</span>
            {props.icon && <span className="button__icon">{props.icon}</span>}
        </StyledButton>
    );
}


const StyledButton = styled.button`
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: ${theme.borders.borderRadius};
    padding: 1rem;
    
    width: ${(props) => (props.fullWidth ? '100%' : undefined)};

    

    ${(props) => handleColorType(props.color)};
    
    ${(props) => props.square ? `
        width: 3.25rem;
        height: 3.25rem;
    ` : undefined};

    border-width: ${(props) => (props.borderWidth === 'small' ? theme.borders.bottomWidthSmall : theme.borders.bottomWidthMedium)};
    
    &:not(:last-child) {
        ${(props) => props.vertical ? 'margin-bottom: 1.25rem' : 'margin-right: 1rem'};
    }
`;

const handleColorType = (color) => {
    switch (color) {
        case 'blue':
            return `background-color: ${theme.colors.primaryCross};
                    border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.primaryCrossBorder} solid;
                    &:hover {
                        background-color: ${theme.colors.primaryCrossHover};
                    }`;
        case 'silver':
            return `background-color: ${theme.colors.secondary};
                    border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.secondaryBorder} solid;
                    &:hover {
                        background-color: ${theme.colors.secondaryHover};
                    }
                    `;
        default:
            return `background-color: ${theme.colors.primaryCircle};
                    border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.primaryCircleBorder} solid;
                    &:hover {
                        background-color: ${theme.colors.primaryCircleHover};
                    }
                    `;
    }
};