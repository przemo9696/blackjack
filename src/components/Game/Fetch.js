/* eslint-disable no-unused-vars */

export const fetchDeck = async (setDeck) => {
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    response = await response.json();
    setDeck(response);
}

export const fetchCard = async (deck) => {
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=1`);
    response = await response.json();
};