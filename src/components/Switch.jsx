import { React, useState } from 'react';
import { ReactComponent as Cross } from '../assets/icon-x.svg';
import { ReactComponent as Circle } from '../assets/icon-o.svg';
import '../styles/styles.scss';

export default function Switch() {
    const [isCross, setIsCross] = useState(true);

    return (
        <div className={`switch ${isCross ? 'switch--cross-active' : ''}`}>
            <button
                className={`switch__cross-container`}
                onClick={() => setIsCross(true)}
            >
                <Cross className={`switch__cross`} />
            </button>
            <button
                className={`switch__circle-container`}
                onClick={() => setIsCross(false)}
            >
                <Circle className={`switch__circle`} />
            </button>
        </div>
    );
}
