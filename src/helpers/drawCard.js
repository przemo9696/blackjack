import { CARD } from '../components/Game/Constants.js';
import { fetchCard } from '../components/Game/Fetch.js';

export const drawCard = async (handSetter, count, countSetter, deck, temporaryCount = 0) => {
    const card = await fetchCard(deck, 1);
    handSetter((oldHand) => [...oldHand, card])

    if (card[0].value === CARD.ACE) {
        countSetter(prevCount => {
            if (prevCount + 11 <= 21) {
                return prevCount + 11;
            }
            else {
                return prevCount + 1;
            }    
        })
    }
    else if (card[0].value === CARD.JACK || card[0].value === CARD.QUEEN || card[0].value === CARD.KING) {
        countSetter(prevCount => prevCount + 10);
    }
    else {
        countSetter(prevCount => prevCount + Number(card[0].value));
    };
}