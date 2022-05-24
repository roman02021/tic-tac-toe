import React from 'react';
import Switch from '../components/Switch';
import theme from '../styles/theme';
import styled from 'styled-components';

import constants from '../constants';

const StyledMenuBackground = styled.div`
        border-radius: 15px;
        background-color: ${theme.colors.backgroundColor};
        padding: 1.5rem;
        width: 100%;
        box-sizing: border-box;
        margin: 2.5rem 0;
        border-bottom: 0.5rem solid ${theme.colors.menuBorderColor};
`

export default function ChooseMark({children}) {
    return (
        <StyledMenuBackground>
            {children}
        </StyledMenuBackground>
    );
}
