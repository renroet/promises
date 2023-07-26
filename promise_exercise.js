function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
    request.onload = function () {
        if (request.readyState !== 4) return;

        if (request.status >= 200 && request.status < 300) {
            resolve(request.response)
        }
        else {
            reject(request.staus)
        }
    }
    request.onerror = function handleError() {
        request = null;
        reject('NETWORK ERROR!')
    };
    request.open('GET', url);
    request.send()
})
}

//     get('http://numbersapi.com/1?json')
//     .then(res => {
//         console.log(JSON.parse(res).text)
//     })
//     .catch(err => console.log('ERROR', err))


//     get('http://numbersapi.com/1,2,5,3,7,8?json')
//     .then(res => {
//         const resp = JSON.parse(res)
//         for(let item in resp) {
//         console.log(resp[item])}
//     })
//     .catch(err => console.log('ERROR', err))


//     const fourFacts = []

//     for(let i = 0; i < 4; i ++ ) {
//         fourFacts.push(
//             get('http://numbersapi.com/73?json')
//             .then(res => {
//                 return JSON.parse(res).text
//             })
//             .catch(err => {
//                 return err
//             })
//         )
//     }

//     Promise.all(fourFacts)
//         .then(fourFacts => {
//             fourFacts.forEach(f => console.log(f))
//         })
        
// get(`${DECKBASE}new/draw/?count=1`)
//     .then(res => {
//         console.log(`${JSON.parse(res).cards[0].value} of ${JSON.parse(res).cards[0].suit}`)
//         return get(`${DECKBASE}${JSON.parse(res).deck_id}/draw/?count=1`)
//     })
//     .then(res2 => console.log(`${JSON.parse(res2).cards[0].value} of ${JSON.parse(res2).cards[0].suit}`))
//     .catch(err => console.log(err))




 // else if{
    //     continueDeck(URL)
    //     deckID = null
    //     cardNum = 0
    //     $('button').html('New Deck')
    // }

const DECKBASE = 'https://deckofcardsapi.com/api/deck/'

let URL = ''

let deckID = null
let cardNum = 0


function startDeck() {
    URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1'
    get(URL)
        .then(res => {
            const val = JSON.parse(res).cards[0].value
            const suit = JSON.parse(res).cards[0].suit
            deckID = JSON.parse(res).deck_id
            cardNum ++
            console.log(`${JSON.parse(res).cards[0].value} of ${JSON.parse(res).cards[0].suit}`)
            $('#card').html(`<p>${val} of ${suit}</p>`)
            // $('button').html('Get Card')
            console.log(cardNum)
            URL = (`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        })
    }

function continueDeck(URL) {
    get(URL)
        .then(res => {
            const val = JSON.parse(res).cards[0].value
            const suit = JSON.parse(res).cards[0].suit
            cardNum ++
            console.log(`${JSON.parse(res).cards[0].value} of ${JSON.parse(res).cards[0].suit}`)
            $('#card').html(`<p>${val} of ${suit}</p>`)
            console.log(cardNum)
            if (cardNum === 52) {
                deckID = null
                cardNum = 0
                $('button').html('Shuffle')
                $('button').toggleClass('reset')
                $('button').toggleClass('start')
            }
        })

    }

$('button.start').on('click', function() {
    if(!deckID || cardNum == 0) {
        startDeck()
    } 
    else if (deckID && cardNum <= 52) {
        continueDeck(URL)
    }
})

$(document).on('click', 'button.reset', function() {
    $('#card').empty()
    $('button').html('Get Card')
    $('button').toggleClass('reset', 'start')
})