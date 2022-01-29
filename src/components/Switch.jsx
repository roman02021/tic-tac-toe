import { React, useState } from 'react';
import Circle from '../components/icons/Circle';
import Cross from '../components/icons/Cross';
import '../styles/styles.scss';
import theme from '../styles/theme';

export default function Switch() {
    const [isCross, setIsCross] = useState(true);

    return (
        <div className={`switch ${isCross ? 'switch--cross-active' : ''}`}>
            <button
                className={`switch__cross-container`}
                onClick={() => setIsCross(true)}
            >
                <Cross
                    width={32}
                    height={32}
                    color={
                        isCross
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
            <button
                className={`switch__circle-container`}
                onClick={() => setIsCross(false)}
            >
                <Circle
                    width={32}
                    height={32}
                    color={
                        !isCross
                            ? theme.colors.borderColor
                            : theme.colors.secondary
                    }
                />
            </button>
        </div>
    );
}
