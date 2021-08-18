import React, {useState, useEffect} from 'react';
import './../Game/game.scss';
import {fetchDeck, fetchCard} from './../Game/Fetch.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [count, setCount] = useState(0);
    const [playerHand] = useState([]);

    useEffect(() => {
        fetchDeck(setDeck);
    }, []);

    // rewrite using API's pile  // TU JEST BUG \/
    
    const onHitHandler = async () => {
        let card = await fetchCard(deck);
        playerHand.push(card);

        if (card[0].value === 'ACE') {
            setCount(count + 11);
        }

        else if (card[0].value === 'JACK' || card[0].value === 'QUEEN' || card[0].value === 'KING') {
            setCount(count + 10);
        }
        else {
            setCount(count + Number(card[0].value));
        } 
    };

    const showCards = () => {
        playerHand.map((card) => {
            console.log(card[0].code);
            return (
                <h1>{card[0].code}</h1>
            )
        })
    }

    return (
        <div className="main">
            <div>
                {playerHand.map((card) => {
                    return (
                        <h1 key={card[0].code}>{card[0].code}</h1>
                    )
                })}
            </div>
            <div className="user-interface-bg">6</div>
            <div className="user-interface">
                <button className="user-button" onClick={onHitHandler}>HIT</button>
                <div className="user-counter">{count}</div>
                <button className="user-button" onClick={showCards}>PASS</button>
            </div>
        </div>
    );
};

export default TheGame;
