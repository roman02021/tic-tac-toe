import {React,  useState , useContext} from 'react';

import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import '../styles/styles.scss';
import theme from '../styles/theme';
import PlayerContext from '../contexts/PlayerContext';

export default function Switch() {
    const {player, setPlayer} = useContext(PlayerContext);
    const [isCross, setIsCross] = useState(true);
    
    return (
        <div className={`switch ${player.symbol === 'cross' ? 'switch--cross-active' : ''}`}>
            <button
                className={`switch__cross-container`}
                onClick={() => setPlayer({...player, symbol: 'cross'})}
            >
                <Cross
                    width={32}
                    height={32}
                    color={
                        player.symbol === 'cross'
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
            <button
                className={`switch__circle-container`}
                onClick={() => setPlayer({...player, symbol: 'circle'})}
            >
                <Circle
                    width={32}
                    height={32}
                    color={
                        player.symbol === 'circle'
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
        </div>
    );
}
