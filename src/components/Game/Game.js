import React, {useState, useEffect} from 'react';
import './../Game/game.scss';
import {fetchDeck, fetchCard, shuffleDeck} from './../Game/Fetch.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [count, setCount] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    let showResult = false;
    let fade = "fade-in";


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
        shuffleDeck(setDeck, deck)
        setPlayerHand([]);
        setCount(0);
        showResult = false;
        setIsDisabled(false);
    }

   useEffect(() => {
       if(count > 21) {
           setIsDisabled(true);
       }
   }, [count]);

    return (
        <div className="main">
            {isDisabled ? (
                <div className={`result-box ${fade}`}>
                    <div className="result-box-message">You lost!</div>
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
                <button className="user-button" onClick={onHitHandler}>HIT</button>
                <div className="user-counter">{count}</div>
                <button className="user-button" disabled={isDisabled} onClick={() => {console.log(deck)}}>PASS</button>
            </div>
        </div>
    );
};

export default TheGame;
