import React, {Component} from 'react'

// needs on the table:
// a player (and maybe the computer or 'dealer')
// placeholders for cards...
// a playing space (will be given background color)
// button for 'hit me'
// button for 'stay'
// button for 'new game'

// define a helper function to get a random number!
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive}
}

export default class PlayingTable extends Component {
  constructor() {
    super()
    this.getRandomCards = this.getRandomCards.bind(this)
  }

  getRandomCards() {
    // STORE one deck =[104 cards]
    // if player has deck[7]...dealer cannot have deck[7]

    const randomCards = []
    if (this.props.cards) {
      const randomOne = this.props.cards[
        getRandomInt(0, this.props.cards.length - 1)
      ]
      const randomTwo = this.props.cards[
        getRandomInt(0, this.props.cards.length - 1)
      ]
      const randomThree = this.props.cards[
        getRandomInt(0, this.props.cards.length - 1)
      ]
      const randomFour = this.props.cards[
        getRandomInt(0, this.props.cards.length - 1)
      ]
      randomCards.push(randomOne, randomTwo, randomThree, randomFour)

      return randomCards
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
        <div id="dealer">
          DEALER INFO
          {/* will display dealer's cards} */}
        </div>
        <div id="player">
          PLAYER INFO
          {/* will display player's cards} */}
        </div>
      </div>
    )
  }
}

// const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
// const values = [
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   'J',
//   'Q',
//   'K',
//   'A',
// ]
// const deck = new Array()
// const players = new Array()
// const currentPlayer = 0

// function createDeck() {
//   deck = new Array()
//   for (let i = 0; i < values.length; i++) {
//     for (let x = 0; x < suits.length; x++) {
//       let weight = parseInt(values[i])
//       if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K') weight = 10
//       if (values[i] == 'A') weight = 11
//       let card = {Value: values[i], Suit: suits[x], Weight: weight}
//       deck.push(card)
//     }
//   }
// }
