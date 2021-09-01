import React from 'react';
import './../Card/card.scss';

const Card = (props) => {
    return (
            <div className="card">
                <img src={props.source} alt="" />
            </div>
    )
}

export default Card;