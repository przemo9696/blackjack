import React from 'react';
import './../Card/card.scss';

const Card = (props) => {
    return (
            <div className="card" key={props.key}>
                <img src={props.source} alt="" />
            </div>
    )
}

export default Card;