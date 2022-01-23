import React from 'react';
import '../styles/styles.css';

export default function Button(props) {
    return (
        <button
            className={`button 
            ${props.fullWidth ? 'button--full-width' : ''} 
            ${props.cross ? 'button--cross' : 'button--circle'}`}
        >
            <span className="heading-s">{props.text}</span>
        </button>
    );
}
