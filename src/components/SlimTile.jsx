import React from 'react';

const SlimTile = (props) => {
    return (
        <div className="slim-tile">
            {props.icon}
            <span className="slim-tile__text heading-xs">{props.children}</span>
        </div>
    );
};

export default SlimTile;
