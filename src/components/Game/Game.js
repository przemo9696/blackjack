import React, {useState, useEffect} from 'react';
import './../Game/game.scss';
import {fetchDeck, fetchCard} from './../Game/Fetch.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [count, setCount] = useState(0);
    let playerHand = []; 

    useEffect(() => {
        fetchDeck(setDeck);
    }, []);

    const onChangeHandler = () => {
        fetchCard(deck);
    }

    return (
        <div className="main">
            <div className="user-interface-bg">6</div>
            <div className="user-interface">
                <button className="user-button" onClick={onChangeHandler}>HIT</button>
                <div className="user-counter">{count}</div>
                <button className="user-button">PASS</button>
            </div>
        </div>
    );
};

export default TheGame;
