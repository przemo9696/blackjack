import React from 'react';
import './../Card/card.scss';

const Card = (props) => {
    return (
            <div className={`card ${props.firstHidden ? 'hidden' : null}`}>
                <img src={props.source} alt="" />
            </div>
    )
}

export default Card;