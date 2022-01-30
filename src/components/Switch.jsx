import {React,  useState , useContext} from 'react';

import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import '../styles/styles.scss';
import theme from '../styles/theme';
import {usePlayerStore} from '../store';
import constants from '../constants';

export default function Switch() {
    const player = usePlayerStore((state) => state);
    const [isCross, setIsCross] = useState(true);
    // console.log(player.symbol, constants.CROSS);
    return (
        <div className={`switch ${player.symbol === constants.CROSS ? 'switch--cross-active' : ''}`}>
            <button
                className={`switch__cross-container`}
                onClick={() => {
                    player.setSymbol(constants.CROSS);
                    player.setIsYourTurn(true);
                }}
            >
                <Cross
                    width={32}
                    height={32}
                    color={
                        player.symbol === constants.CROSS
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
            <button
                className={`switch__circle-container`}
                onClick={() => {
                    player.setSymbol(constants.CIRCLE)
                    player.setIsYourTurn(false);
                }}
            >
                <Circle
                    width={32}
                    height={32}
                    color={
                        player.symbol === constants.CIRCLE
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
        </div>
    );
}
