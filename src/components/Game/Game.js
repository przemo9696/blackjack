import React, {useState, useEffect} from 'react';
import './../Game/game.scss';
import {fetchDeck, fetchCard, shuffleDeck} from './../Game/Fetch.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [count, setCount] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showResult, setShowResult] = useState(false);
    let fade = isDisabled ? 'fade-in' : 'fade-out';


    useEffect(() => {
        fetchDeck(setDeck);
    }, []);
    
    const onHitHandler = async () => {
        let card = await fetchCard(deck);
        playerHand.push(card);
       
        if (card[0].value === 'ACE') {
            setCount((prevCount) => prevCount + 11);
        }

        else if (card[0].value === 'JACK' || card[0].value === 'QUEEN' || card[0].value === 'KING') {
            setCount((prevCount) => prevCount + 10);
        }
        else {
            setCount((prevCount) => prevCount + Number(card[0].value));
        } 
    };

    const playAgainHandler = () => {
        setTimeout(() => {
            setShowResult(false);            
        }, 1000);
        setIsDisabled(false);
        shuffleDeck(setDeck, deck)
        setPlayerHand([]);
        setCount(0);   
    }

   useEffect(() => {
       if(count > 21) {
           setShowResult(true);
           setIsDisabled(true);
           setMessage('You lost!');
       }
   }, [count]);

    return (
        <div className="main">
            {showResult ? (
                <div className={`result-box ${fade}`}>
                    <div className="result-box-message">{message}</div>
                    <button className="user-button" onClick={playAgainHandler}>PLAY AGAIN</button>
                </div>
            ) : null}   
            <div className="player-hand">
                {playerHand.map((card) => {
                    return (
                        <>
                            <div className="card" key={card[0].value}>
                                <img src={card[0].image} alt="" />
                            </div>
                        </>
                    ) 
                })}
            </div>
            <div className="user-interface-bg">6</div>
            <div className="user-interface">
                <button className="user-button" onClick={onHitHandler} disabled={isDisabled}>HIT</button>
                <div className="user-counter">{count}</div>
                <button className="user-button" disabled={isDisabled}>PASS</button>
            </div>
        </div>
    );
};

export default TheGame;
