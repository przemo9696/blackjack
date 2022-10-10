
import React, { useState, useEffect } from 'react';
import './../Game/game.scss';
import { fetchDeck, shuffleDeck } from './../Game/Fetch.js';
import { HANDS, MESSAGES, FADE, BUTTON, CARD } from './../Game/Constants.js';
import Card from './../Card/Card.js';
import { drawCard } from './../../helpers/DrawCard.js';
import { compare } from '../../helpers/Compare';
import { wait } from '../../helpers/Wait';
import Button from './../Button/Button.js';

const TheGame = () => {

    const [deck, setDeck] = useState(null);
    const [playerCounter, setPlayerCounter] = useState(0);
    const [secondPlayerCounter, setSecondPlayerCounter] = useState(0);
    const [croupierCounter, setCroupierCounter] = useState(0);
    const [temporaryCount, setTemporaryCount] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [secondPlayerHand, setSecondPlayerHand] = useState([]);
    const [currentPlayerHand, setCurrentPlayerHand] = useState(HANDS.FIRST);
    const [isSplittable, setIsSplittable] = useState(false);
    const [isSplitted, setIsSplitted] = useState(false);
    const [splittedResultOne, setSplittedResultOne] = useState('');
    const [splittedResultTwo, setSplittedResultTwo] = useState('');
    const [croupierHand, setCroupierHand] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [firstHidden, setFirstHidden] = useState(true);
    const [toggleFade, setToggleFade] = useState(false);
    const fade = toggleFade ? FADE.OUT : FADE.IN;

    useEffect(() => {
        fetchDeck(setDeck);
        startGame();
    }, []);

    useEffect(() => {
        const dealCards = async () => {
            await wait();
            await drawCard(setPlayerHand, setPlayerCounter, deck);
            await wait();
            await drawCard(setPlayerHand, setPlayerCounter, deck);
            await wait();
            await drawCard(setCroupierHand, setTemporaryCount, deck);
            await wait();
            await drawCard(setCroupierHand, setCroupierCounter, deck);
        }

        if (isStarted) {
            dealCards();
        }
    }, [isStarted]);

    useEffect(() => {
        if (playerHand[1] && !isSplitted && !playerHand[2]) {
            if (playerHand[0][0].code[0] === playerHand[1][0].code[0]) {
                setToggleFade(false);
                setIsSplittable(true);
                setIsDisabled(true);
                setMessage(MESSAGES.SPLIT);
                setTimeout(() => {
                    setShowResult(true);
                }, 500);
            }
        }
    }, [playerHand])

    useEffect(() => {
        if (croupierHand[1] && !isSplittable) {
            setIsDisabled(false);
        }
    }, [croupierHand[1]])

    useEffect(() => {
        if (playerCounter > 21) {
            if (isSplitted) {
                setCurrentPlayerHand(HANDS.SECOND);
                return
            }
            setToggleFade(false);
            setShowResult(true);
            setIsDisabled(true);
            setMessage(MESSAGES.LOSE);
            setIsStarted(false);
        }
    }, [playerCounter, isSplitted]);

    useEffect(() => {
        if (secondPlayerCounter > 21) {
            setCroupierCounter(temporaryCount + croupierCounter);
            setFirstHidden(false);
            setToggleFade(false);
            setIsDisabled(true);
            setIsStarted(false);
            compare(croupierCounter, playerCounter, secondPlayerCounter, setSplittedResultOne, setSplittedResultTwo);
            setTimeout(() => {
                setShowResult(true);
            }, 500)
        }
    }, [secondPlayerCounter])

    useEffect(() => {
        if (isSplitted) {
            if (playerCounter >= croupierCounter || secondPlayerCounter >= croupierCounter) {
                if (croupierCounter < 17 && (playerCounter <= 21 || secondPlayerCounter <= 21) && croupierCounter !== 0) {
                    setTimeout(() => {
                        drawCard(setCroupierHand, setCroupierCounter, deck);
                    }, 500);
                }
                else {
                    if (croupierHand[1]) {
                        compare(croupierCounter, playerCounter, secondPlayerCounter, setSplittedResultOne, setSplittedResultTwo);
                        setTimeout(() => {
                            setShowResult(true);
                        }, 500);
                    }
                }
            }
            else {
                compare(croupierCounter, playerCounter, secondPlayerCounter, setSplittedResultOne, setSplittedResultTwo);
                setTimeout(() => {
                    setShowResult(true);
                }, 500);
            }
        }
        if (!isSplitted) {
            if (isStarted === true && firstHidden === false) {
                if (croupierCounter <= 21 && croupierCounter > playerCounter) {
                    setShowResult(true);
                    setIsDisabled(true);
                    setMessage(MESSAGES.LOSE);
                    setIsStarted(false);
                }
                else {
                    if (croupierCounter < 17) {
                        setTimeout(() => {
                            drawCard(setCroupierHand, setCroupierCounter, deck);
                        }, 500);
                    }
                    else if (playerCounter > croupierCounter && croupierCounter < 21) {
                        setShowResult(true);
                        setIsDisabled(true);
                        setMessage(MESSAGES.WIN);
                        setIsStarted(false);
                    }
                    else if (croupierCounter > 21) {
                        setShowResult(true);
                        setIsDisabled(true);
                        setMessage(MESSAGES.WIN);
                        setIsStarted(false);
                    }
                    else if (croupierCounter === playerCounter) {
                        setShowResult(true);
                        setIsDisabled(true);
                        setMessage(MESSAGES.DRAW);
                        setIsStarted(false);
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [croupierCounter]);

    const startGame = () => {
        setIsDisabled(true);
        setMessage(MESSAGES.BLACKJACK);
        setShowResult(true);
    }

    const onHitHandler = () => {
        if (currentPlayerHand === HANDS.FIRST) {
            drawCard(setPlayerHand, setPlayerCounter, deck)
        }
        else {
            drawCard(setSecondPlayerHand, setSecondPlayerCounter, deck)
        }
    };

    const onStandHandler = () => {
        if (isSplitted && currentPlayerHand === HANDS.FIRST) {
            setCurrentPlayerHand(HANDS.SECOND);
        }
        else {
            setIsDisabled(true);
            setToggleFade(false);
            setFirstHidden(false);
            if (croupierHand[0].code === CARD.ACE && croupierHand[1].code === CARD.ACE) {
                setCroupierCounter(croupierCounter + 1);
            }
            else {
                setCroupierCounter(temporaryCount + croupierCounter);
            }
            if (!isSplitted) {
                if (croupierCounter > playerCounter) {
                    setMessage(MESSAGES.LOSE);
                    setIsStarted(false);
                    setShowResult(true);
                }
                else if (playerCounter > croupierCounter && croupierCounter > 17) {
                    setMessage(MESSAGES.WIN);
                    setIsStarted(false);
                    setShowResult(true);
                }
                else if (playerCounter === croupierCounter && croupierCounter > 17) {
                    setMessage(MESSAGES.DRAW);
                    setIsStarted(false);
                    setShowResult(true);
                }
            }
            else {
                setIsStarted(false);
                if (croupierCounter > 17) {
                    setTimeout(() => {
                        setShowResult(true);
                    }, 500)
                }
            }
        }
    };

    const playAgainHandler = () => {
        setFirstHidden(true);
        shuffleDeck(setDeck, deck)
        setPlayerHand([]);
        setSecondPlayerHand([]);
        setCurrentPlayerHand(HANDS.FIRST);
        setCroupierHand([]);
        setToggleFade(true);
        setIsSplittable(false);
        setPlayerCounter(0);
        setSecondPlayerCounter(0);
        setCroupierCounter(0);
        setTemporaryCount(0);
        setTimeout(() => {
            setShowResult(false);
            setIsSplitted(false);
            setSplittedResultTwo('');
            setSplittedResultOne('');
            setIsStarted(true);
        }, 500);
    }

    const splitHandler = () => {
        const tempHand = playerHand;
        const popped = Array.prototype.pop.call(tempHand);
        if (tempHand[0][0].value === CARD.ACE) {
            setPlayerCounter(11);
        }
        else if (tempHand[0][0].value === CARD.JACK || tempHand[0][0].value === CARD.QUEEN || tempHand[0][0].value === CARD.KING) {
            setPlayerCounter(10);
        }
        else {
            setPlayerCounter(Number(tempHand[0][0].value));
        }

        if (popped[0].value === CARD.ACE) {
            setSecondPlayerCounter(prevCount => prevCount + 11);
        }
        else if (popped[0].value === CARD.JACK || popped[0].value === CARD.QUEEN || popped[0].value === CARD.KING) {
            setSecondPlayerCounter(prevCount => prevCount + 10);
        }
        else {
            setSecondPlayerCounter(prevCount => prevCount + Number(popped[0].value));
        }
        setSecondPlayerHand([popped]);
        setPlayerHand(tempHand);
        setIsDisabled(false);
        setToggleFade(true);
        setIsSplitted(true);
        setTimeout(() => {
            setShowResult(false);
            setIsSplittable(false);
        }, 500);
    }

    const closeWindowHandler = () => {
        setIsDisabled(false);
        setToggleFade(true);
        setTimeout(() => {
            setShowResult(false);
            setIsSplittable(false);
        }, 500);
    }

    return (
        <div className="main">
            <div className="croupier-score-bg"></div>
            <div className="croupier-score">
                <div className="counter">{croupierCounter}</div>
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
                    {isSplitted ?
                        isSplittable ?
                            <div>
                                <div className="result-box-message">{message}</div>
                                <div className="two-buttons">
                                    <Button text={BUTTON.YES} onClick={splitHandler} />
                                    <Button text={BUTTON.NO} onClick={closeWindowHandler} />
                                </div>
                            </div> :
                            <div>
                                <div className="result-box-message-2">{splittedResultOne}</div>
                                <div className="result-box-message-2">{splittedResultTwo}</div>
                                <Button text={BUTTON.PLAY} onClick={playAgainHandler} />
                            </div> :
                        <div>
                            <div className="result-box-message">{message}</div>
                            {isSplittable ?
                                <div className="two-buttons">
                                    <Button text={BUTTON.YES} onClick={splitHandler} />
                                    <Button text={BUTTON.NO} onClick={closeWindowHandler} />
                                </div>
                                : <Button text={BUTTON.PLAY} onClick={playAgainHandler} />}
                        </div>}
                </div>
            ) : null}
            {isSplitted ?
                <div className='player-hands'>
                    <div className={`player-hand-one ${currentPlayerHand}`}>
                        {playerHand.map((card) => {
                            return (
                                <Card source={card[0].image} key={card[0].code} />
                            )
                        })}
                    </div>
                    <div className={`player-hand-two ${currentPlayerHand}`}>
                        {secondPlayerHand?.map((card) => {
                            return (
                                <Card source={card[0].image} key={card[0].code} />
                            )
                        })}
                    </div>
                </div>
                : <div className="player-hand">
                    {playerHand.map((card) => {
                        return (
                            <Card source={card[0].image} key={card[0].code} />
                        )
                    })}
                </div>
            }
            <div className="user-interface-bg"></div>
            <div className="user-interface">
                <Button text={BUTTON.HIT} onClick={onHitHandler} disabled={isDisabled} />
                <div className="counter">{currentPlayerHand === HANDS.FIRST ? playerCounter : secondPlayerCounter}</div>
                <Button text={BUTTON.STAND} onClick={onStandHandler} disabled={isDisabled} />
                <Button text="TEST" onClick={splitHandler} />
            </div>
        </div>
    );
};

export default TheGame;
