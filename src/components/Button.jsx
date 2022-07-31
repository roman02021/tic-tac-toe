import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import theme from '../styles/theme';
import useMediaQuery from '../hooks/useMediaQuery';

import '../styles/styles.css';



export default function Button(props) {

    const [isPressing, setIsPressing] = useState(false);

    console.log('PRESS?', isPressing);

    const isMobile = useMediaQuery(theme.breakpoints.mobile);
    return (
        props.route ? 
        <StyledLinkBtn onMouseDown={() => setIsPressing(true)} onMouseUp={() => setIsPressing(false)} $isPressing={isPressing} $small={props.small} $isMobile={isMobile} to={props.route} $square={props.square}  $fullWidth={props.fullWidth} $cross $vertical={props.vertical} $color={props.color} $borderWidth={props.borderWidth} onClick={props.onClick}>
            <StyledBtnText >{props.children}</StyledBtnText>
            {props.icon && <span className="button__icon">{props.icon}</span>}
        </StyledLinkBtn> : 
        <StyledBtn onMouseDown={() => setIsPressing(true)} onMouseUp={() => setIsPressing(false)} $isPressing={isPressing} $small={props.small} $isMobile={isMobile} to={props.route || ""} $square={props.square} $fullWidth={props.fullWidth} $cross $vertical={props.vertical} $color={props.color} $borderWidth={props.borderWidth} onClick={props.onClick}>
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
    padding: 1.25rem 1rem;
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
    
    transition: all .2s ease-in;

    ${(props) => handleColorType(props.$color, props.$isPressing)};

    /* ${(props) => props.$isPressing ? css`box-shadow: inset 0 -2px 0 ${theme.colors.secondaryBorder};` : css`background-color: blue;`} */
    
    ${props => props.square ? `
        width: 3.25rem;
        height: 3.25rem;
        

    ` : undefined};

    border-width: ${(props) => (props.$borderWidth === 'small' ? theme.borders.bottomWidthSmall : theme.borders.bottomWidthMedium)};
    
    &:not(:last-child) {
        ${(props) => props.$vertical ? 'margin-bottom: 1.25rem' : 'margin-right: 1rem'};
    }

    
    /* border-bottom-width: .25rem; */
    



`
const StyledBtnText = styled.span`
    letter-spacing: 1.25px;
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
// border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.primaryCrossBorder} solid;
// border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.secondaryBorder} solid;
// border-bottom: ${theme.borders.bottomWidthMedium} ${theme.colors.primaryCircleBorder} solid;

const handleColorType = (color) => {
    switch (color) {
        case 'blue':
            return  css`background-color: ${theme.colors.primaryCross};
                        box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder};
                        @keyframes buttonHoverBlue {
                            0% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                            50% {box-shadow: inset 0 -4px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(4px);}
                            100% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                        }
                        @keyframes buttonPressBlue {
                            0% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                            100% {box-shadow: inset 0 -2px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(2px);}
                        }
                        &:hover {
                            background-color: ${theme.colors.primaryCrossHover};
                            animation: buttonHoverBlue 2s infinite;
                        }
                        &:active {
                            background-color: ${theme.colors.primaryCrossHover};
                            animation: buttonPressBlue .2s forwards;
                        }
                        `;
        case 'silver':
            return  css`background-color: ${theme.colors.secondary};
                        box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder};
                        @keyframes buttonHoverSilver {
                            0% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                            50% {box-shadow: inset 0 -6px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(2px);}
                            100% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                        }
                        @keyframes buttonPressSilver {
                            0% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(0px);}
                            100% {box-shadow: inset 0 -2px 0 ${theme.colors.primaryCrossBorder}; transform: translateY(2px);}
                        }
                        &:hover {
                            background-color: ${theme.colors.primaryCrossHover};
                            animation: buttonHoverSilver 2s infinite;
                        }
                        &:active {
                            background-color: ${theme.colors.primaryCrossHover};
                            animation: buttonPressSilver .2s forwards;
                        }
                    `;
        default:
            return  css`background-color: ${theme.colors.primaryCircle};
                        box-shadow: inset 0 -8px 0 ${theme.colors.primaryCircleBorder};
                        @keyframes buttonHoverYellow {
                            0% {
                                box-shadow: inset 0 -8px 0 ${theme.colors.primaryCircleBorder}; 
                                transform: translateY(0px);
                            }
                            50% {
                                box-shadow: inset 0 -4px 0 ${theme.colors.primaryCircleBorder}; 
                                transform: translateY(4px);
                            }
                            100% {
                                box-shadow: inset 0 -8px 0 ${theme.colors.primaryCircleBorder}; 
                                transform: translateY(0px);
                            }
                        }
                        @keyframes buttonPressYellow {
                            0% {box-shadow: inset 0 -8px 0 ${theme.colors.primaryCircleBorder}; transform: translateY(0px);}
                            100% {box-shadow: inset 0 -4px 0 ${theme.colors.primaryCircleBorder}; transform: translateY(2px);}
                        }
                        &:hover {
                            background-color: ${theme.colors.primaryCircleHover};
                            animation: buttonHoverYellow 2s infinite;
                        }
                        &:active {
                            background-color: ${theme.colors.primaryCircleHover};
                            animation: buttonPressYellow .2s forwards;
                        }
                    `;
    
    }
};