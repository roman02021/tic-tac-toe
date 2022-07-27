import React from "react";
const sound = require("../../assets/sounds/victory.mp3");

const VictorySound = () => <audio src={sound} autoPlay />;

export default VictorySound;