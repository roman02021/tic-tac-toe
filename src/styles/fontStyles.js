import { createGlobalStyle } from 'styled-components';

import OutfitBoldWoff from '../fonts/Outfit-Bold.woff';
import OutfitBoldWoff2 from '../fonts/Outfit-Bold.woff2';

import OutfitMediumWoff from '../fonts/Outfit-Medium.woff';
import OutfitMediumWoff2 from '../fonts/Outfit-Medium.woff2';

const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'Outfit';
        src: local('Outfit'), local('Outfit'),
        url(${OutfitMediumWoff2}) format('woff2'),
        url(${OutfitMediumWoff}) format('woff');
        font-weight: medium;
        font-style: normal;
    }
    @font-face {
        font-family: 'Outfit';
        src: local('Outfit'), local('Outfit'),
        url(${OutfitBoldWoff2}) format('woff2'),
        url(${OutfitBoldWoff}) format('woff');
        font-weight: bold;
        font-style: normal;
    }
`;
export default FontStyles;
