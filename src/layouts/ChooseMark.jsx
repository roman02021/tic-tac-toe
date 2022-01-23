import React from 'react';
import Switch from '../components/Switch';

import '../styles/styles.scss';

export default function ChooseMark() {
    return (
        <div className="choose-mark">
            <div className="heading-xs choose-mark__title">
                PICK PLAYER 1’S MARK
            </div>
            <Switch />
            <div className="choose-mark__subtitle">REMEMBER : X GOES FIRST</div>
        </div>
    );
}
