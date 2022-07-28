export const compare = (countOne, countTwo, countThree, setResultOne, setResultTwo) => {
    console.log(countOne,countTwo,countThree)
    if((countOne > countTwo && countOne <= 21) || countTwo > 21) {
        setResultOne('Left hand - Lose!');
    }
    if((countOne < countTwo && countTwo <= 21) || (countOne > 21 && countTwo <= 21)) {
        setResultOne('Left hand - Win!');
    }
    if(countOne === countTwo) {
        setResultOne('Left hand - Draw!')
    }
    if((countOne > countThree && countOne <= 21) || countThree > 21) {
        setResultTwo('Right hand - Lose!');
    }
    if((countOne < countThree && countThree <= 21) || (countOne > 21 && countThree <= 21)) {
        setResultTwo('Right hand - Win!');
    }
    if(countOne === countThree) {
        setResultTwo('Right hand - Draw!')
    }
}

    
