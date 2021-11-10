import React, {useState, useEffect, useRef} from 'react';
import './../Game/game.scss';
import {fetchDeck, shuffleDeck} from './../Game/Fetch.js';
import Card from './../Card/Card.js';
import {drawCard} from '../../helpers/drawCard.js';
import Button from './../Button/Button.js';

const TheGame = () => {
    
    const [deck, setDeck] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [croupierCount, setCroupierCount] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [croupierHand, setCroupierHand] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [firstHidden, setFirstHidden] = useState(true);
    const [buttonText, setButtonText] = useState('PLAY');
    const isMount = useRef(false);
    let fade = isStarted ? 'fade-out' : 'fade-in';
    
    useEffect(() => {
        fetchDeck(setDeck);
        startGame();
    }, []);
  
     useEffect(() => {
        if(isStarted) {
            drawCard(playerHand, playerCount, setPlayerCount, deck);
            setTimeout(() => {
                drawCard(playerHand, playerCount, setPlayerCount, deck);
            }, 700);
            setTimeout(() => {
                drawCard(croupierHand, croupierCount, setCroupierCount, deck);
                setTimeout(() => {
                    drawCard(croupierHand, croupierCount, setCroupierCount, deck);
                }, 500);
            }, 1500)
            setTimeout(() => {
                setIsDisabled(false);
                setButtonText('PLAY AGAIN');
            }, 2000)
        }
    }, [isStarted]);

    useEffect(() => {
        if(playerCount > 21) {
            setShowResult(true);
            setIsDisabled(true);
            setMessage('You lost!');
            setIsStarted(false);
        }
    }, [playerCount]);


    useEffect(() => {
        if(isStarted === true && firstHidden === false) {

            if(croupierCount <= 21 && croupierCount > playerCount) {
                setShowResult(true);
                setIsDisabled(true);
                setMessage('You lost!');
                setIsStarted(false);
            }

            else {
                
                if(croupierCount < 17) {
                    setTimeout(() => {
                        drawCard(croupierHand, croupierCount, setCroupierCount, deck);
                    }, 1000);
                }
                
                else if(playerCount > croupierCount && croupierCount < 21) {
                    setShowResult(true);
                    setIsDisabled(true);
                    setMessage('You won!');
                    setIsStarted(false);
                }
                else if(croupierCount > 21) {
                    setShowResult(true);
                    setIsDisabled(true);
                    setMessage('You won!');
                    setIsStarted(false);
                }
                
                else if(croupierCount === playerCount) {
                    setShowResult(true);
                    setIsDisabled(true);
                    setMessage('Draw!');
                    setIsStarted(false);
                }
            }
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [croupierCount]);

    const startGame = () => {
        setIsDisabled(true);
        setMessage('Blackjack');
        setShowResult(true);
    } 
    
    const onHitHandler = async () => {
       drawCard(playerHand, playerCount, setPlayerCount, deck)
    };

    const onStandHandler = async () => {
        setIsDisabled(true);
        setFirstHidden(false);
            if(croupierCount > playerCount) {
                setMessage('You lost!');
                setIsStarted(false);
                setShowResult(true);
            }
            else if(playerCount > croupierCount && croupierCount > 17) {
                setMessage('You won!');
                setIsStarted(false);
                setShowResult(true);
            }
            else if(playerCount === croupierCount && croupierCount > 17) {
                setMessage('Draw!');
                setIsStarted(false);
                setShowResult(true);
            }
            else {                    
                setTimeout(() => {
                    drawCard(croupierHand, croupierCount, setCroupierCount, deck)
                }, 500);
            } 
    };

    const playAgainHandler = () => {
        setTimeout(() => {
            setShowResult(false);            
        }, 1000);
        setIsStarted(true);
        setFirstHidden(true);
        shuffleDeck(setDeck, deck)
        setPlayerHand([]);
        setPlayerCount(0);   
        setCroupierHand([]);
        setCroupierCount(0);
        isMount.current = false;
    }


    return (
        <div className="main">
            <div className="croupier-score-bg"></div>
            <div className="croupier-score" >
                <div className="counter">{croupierCount}</div>
            </div>
            <div className="croupier-hand">
            {croupierHand.map((card) => {
                    return (
                        <Card key={card[0].code} source={card[0].image} firstHidden={firstHidden} />
                    ) 
                })}
            </div>
            {showResult ? (
                <div className={`result-box ${fade}`}>
                    <div className="result-box-message">{message}</div>
                    <Button text={buttonText} onClick={playAgainHandler} />
                </div>
            ) : null}   
            <div className="player-hand">
                {playerHand.map((card) => {
                    return (
                        <Card source={card[0].image} key={card[0].code} />
                    ) 
                })}
            </div>
            <div className="user-interface-bg"></div>
            <div className="user-interface">
                <Button text="HIT" onClick={onHitHandler} disabled={isDisabled} />
                <div className="counter">{playerCount}</div>
                <Button text="STAND" onClick={onStandHandler} disabled={isDisabled} />
            </div>
        </div>
    );
};

export default TheGame;
