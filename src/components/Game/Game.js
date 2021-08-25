import React, {useState, useEffect, useRef} from 'react';
import './../Game/game.scss';
import {fetchDeck, fetchCard, shuffleDeck} from './../Game/Fetch.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [croupierCount, setCroupierCount] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [croupierHand, setCroupierHand] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const isMount = useRef(false);
    let fade = isDisabled ? 'fade-in' : 'fade-out';

    useEffect(() => {
        fetchDeck(setDeck);
    }, []);

    useEffect(() => {

        if (croupierCount > playerCount) {
            setMessage('You lost!'); 
            setShowResult(true);
        }

        else if (isMount.current && croupierCount !== 0) {
            
            if (croupierCount < 17) {
                setTimeout(() => {
                    onStandHandler();
                }, 1000);
            }          
            else if(croupierCount < playerCount && croupierCount > 17) {
                setMessage('You won!');
                setShowResult(true);
            }
            else if(croupierCount > playerCount && croupierCount > 17) {
                setMessage('You lost!');
                showResult(true);
            }

            else if(croupierCount === playerCount && croupierCount > 17) {
                setMessage('Draw!');
                setShowResult(true);
            }
        }
        else  isMount.current = true;   

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [croupierCount]);

  
    
    const onHitHandler = async () => {
        let card = await fetchCard(deck, 1);
        playerHand.push(card);
       
        if (card[0].value === 'ACE') {
            setPlayerCount((prevCount) => prevCount + 11);
        }

        else if (card[0].value === 'JACK' || card[0].value === 'QUEEN' || card[0].value === 'KING') {
            setPlayerCount((prevCount) => prevCount + 10);
        }
        else {
            setPlayerCount((prevCount) => prevCount + Number(card[0].value));
        } 
    };

   
   
    const onStandHandler = async () => {

            setIsDisabled(true);
            let card = await fetchCard(deck, 1);
            croupierHand.push(card);
        
            if (card[0].value === 'ACE') {
                setCroupierCount(prevCount => prevCount + 11);
            }
        
            else if (card[0].value === 'JACK' || card[0].value === 'QUEEN' || card[0].value === 'KING') {
                setCroupierCount(prevCount => prevCount + 10);
            }
            else {
                setCroupierCount(prevCount => prevCount + Number(card[0].value));
            };    
    };

    const playAgainHandler = () => {
        setTimeout(() => {
            setShowResult(false);            
        }, 1000);
        setIsDisabled(false);
        shuffleDeck(setDeck, deck)
        setPlayerHand([]);
        setPlayerCount(0);   
        setCroupierHand([]);
        setCroupierCount(0);
        isMount.current = false;
    }

   useEffect(() => {
       if(playerCount > 21) {
           setShowResult(true);
           setIsDisabled(true);
           setMessage('You lost!');
       }
   }, [playerCount]);

    return (
        <div className="main">
            <div className="croupier-score-bg"></div>
            <div className="croupier-score" >
                <div className="counter">{croupierCount}</div>
            </div>
            <div className="croupier-hand">
            {croupierHand.map((card) => {
                    return (
                        <>
                            <div className="card" key={card[0].value}>
                                <img src={card[0].image} alt="" />
                            </div>
                        </>
                    ) 
                })}
            </div>
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
            <div className="user-interface-bg"></div>
            <div className="user-interface">
                <button className="user-button" onClick={onHitHandler} disabled={isDisabled}>HIT</button>
                <div className="counter">{playerCount}</div>
                <button className="user-button" onClick={onStandHandler} disabled={isDisabled}>STAND</button>
            </div>
        </div>
    );
};

export default TheGame;
