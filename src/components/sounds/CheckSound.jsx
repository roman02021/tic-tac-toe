import React from 'react';
const sound = require('../../assets/sounds/check-sound.mp3');

const CheckSound = () => <audio src={sound} autoPlay />;

export default CheckSound;
