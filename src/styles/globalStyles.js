import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    #root {
        background-color: ${theme.colors.borderColor};
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    html {
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        box-sizing: border-box;
        font-size: 16px;
        
    }
    body {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-x: hidden;
        background-color: ${theme.colors.borderColor};
    }
    body, input, textarea {
        font-family: 'Outfit', sans-serif;
        font-weight: medium;
    }
    button {
        font-family: 'Outfit', sans-serif;
        font-weight: bold;
    }
`;

export default GlobalStyle;
