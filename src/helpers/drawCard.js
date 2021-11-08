import {fetchCard} from '../components/Game/Fetch.js';

export const drawCard = async (hand, count, countSetter, deck) => {
    let card = await fetchCard(deck, 1);
    hand.push(card);

    if (card[0].value === 'ACE') {
        if(count + 11 <= 21) {
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