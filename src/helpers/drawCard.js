import {fetchCard} from '../components/Game/Fetch.js';

export const drawCard = async (handSetter, count, countSetter, deck, temporaryCount = 0) => {
    let card = await fetchCard(deck, 1);
    handSetter((oldHand) => [...oldHand, card])
    
    if (card[0].value === 'ACE') {
        if(count + temporaryCount + 11 <= 21) {
            countSetter(prevCount => prevCount + 11);
        }
        else {
            countSetter(prevCount => prevCount + 1);
        }
    }
    else if (card[0].value === 'JACK' || card[0].value === 'QUEEN' || card[0].value === 'KING') {
        countSetter(prevCount => prevCount + 10);
    }
    else {
        countSetter(prevCount => prevCount + Number(card[0].value));
    };
}