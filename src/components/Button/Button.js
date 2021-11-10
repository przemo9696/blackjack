import React from 'react';
import './../Button/button.scss';

const Button = (props) => {

    const isDisabled = (props.text === 'PLAY') ? false : props.disabled;

    return (
        <button className="user-button" onClick={props.onClick} disabled={isDisabled} type="button">{props.text}</button>
    );
};

export default Button;
