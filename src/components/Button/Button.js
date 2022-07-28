import React from 'react';
import { BUTTON } from '../Game/Constants';
import './../Button/button.scss';

const Button = (props) => {

    const isDisabled = (props.text === BUTTON.PLAY) ? false : props.disabled;

    return (
        <button className="user-button" onClick={props.onClick} disabled={isDisabled} type="button">{props.text}</button>
    );
};

export default Button;
