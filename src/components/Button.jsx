import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import theme from '../styles/theme';
import useMediaQuery from '../hooks/useMediaQuery';

import '../styles/styles.css';



export default function Button(props) {

    const isMobile = useMediaQuery(theme.breakpoints.mobile);
    return (
        props.route ? 
        <StyledLinkBtn $small={props.small} $isMobile={isMobile} to={props.route} $square={props.square}  $fullWidth={props.fullWidth} $cross $vertical={props.vertical} $color={props.color} $borderWidth={props.borderWidth} onClick={props.onClick}>
            <StyledBtnText >{props.children}</StyledBtnText>
            {props.icon && <span className="button__icon">{props.icon}</span>}
        </StyledLinkBtn> : 
        <StyledBtn $small={props.small} $isMobile={isMobile} to={props.route || ""} $square={props.square} $fullWidth={props.fullWidth} $cross $vertical={props.vertical} $color={props.color} $borderWidth={props.borderWidth} onClick={props.onClick}>
            <StyledBtnText >{props.children}</StyledBtnText>
            {props.icon && <span className="button__icon">{props.icon}</span>}
        </StyledBtn>
    );
}
const Btn = css`
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: ${theme.borders.borderRadius};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    min-width: fit-content;
    box-sizing: border-box;
    color: ${theme.colors.borderColor};
    text-decoration: none;
    width: ${(props) => props.$fullWidth ? '100%' : undefined};
    font-size: ${(props) => props.$fullWidth ? (props.$isMobile ? theme.fontSize.xs : theme.fontSize.s) : theme.fontSize.xs};
    

    ${(props) => handleColorType(props.$color)};
    
    ${props => props.square ? `
        width: 3.25rem;
        height: 3.25rem;
        

    ` : undefined};

    border-width: ${(props) => (props.$borderWidth === 'small' ? theme.borders.bottomWidthSmall : theme.borders.bottomWidthMedium)};
    
    &:not(:last-child) {
        ${(props) => props.$vertical ? 'margin-bottom: 1.25rem' : 'margin-right: 1rem'};
    }

`
const StyledBtnText = styled.span`
    letter-spacing: 1.25px;
    ${(props) => console.log(props, 'asfasfas')};
`
const StyledLinkBtn = styled(Link)`
    ${Btn}
    @media (max-width: ${theme.breakpoints.mobile}) {
        height: 52px;
        border-radius: ${theme.borders.borderRadiusSmall}
    }
`
const StyledBtn = styled.button`
   ${Btn}
   height: ${(props) => props.$square ? '3.25rem' : 'initial'};
   width: ${(props) => props.$square ? '3.25rem' : 'initial'};
   padding: ${(props) => props.$square ? '0' : '1rem'};
   @media (max-width: ${theme.breakpoints.mobile}) {
            height: ${(props) => props.$square ? '2.5rem' : '52px'};;
            width: ${(props) => props.$square ? '2.5rem' : 'initial'};;
            border-radius: ${(props) => props.$square ? theme.borders.borderRadiusSmall : theme.borders.borderRadiusSmall};
    }

`

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