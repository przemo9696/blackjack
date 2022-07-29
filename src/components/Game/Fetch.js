/* eslint-disable no-unused-vars */

export const fetchDeck = async (props) => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const responseJSON = await response.json();
    return props(responseJSON);
}

export const shuffleDeck = async (props, deck) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck?.deck_id}/shuffle/?deck_count=1`);
    const responseJSON = await response.json();
    console.log(responseJSON)
    return props(responseJSON);
}

export const fetchCard = async (deck, count) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=${count}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    const responseJSON = await response.json();
    return responseJSON.cards;
};


