import React, {Component} from 'react'
import CardTable from './CardTable'

// needs on the table:
// a player (and maybe the computer or 'dealer')
// placeholders for cards...
// a playing space (will be given background color)
// button for 'hit me'
// button for 'stay'
// button for 'new game'

// // define a helper function to get a random number!
// function getRandomInt(min, max) {
//   min = Math.ceil(min)
//   max = Math.floor(max)
//   return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive}
// }

export default class GameRoom extends Component {
  constructor() {
    super()
    // this.getRandomCards = this.getRandomCards.bind(this)
  }

  // // ------ Left over from planning while considering best way to handle game, cards, etc. ---- (prob. good to delete) // //
  // getRandomCards() {
  //   // STORE one deck =[104 cards]
  //   // if player has deck[7]...dealer cannot have deck[7]

  //   const randomCards = []
  //   if (this.props.cards) {
  //     const randomOne = this.props.cards[
  //       getRandomInt(0, this.props.cards.length - 1)
  //     ]
  //     const randomTwo = this.props.cards[
  //       getRandomInt(0, this.props.cards.length - 1)
  //     ]
  //     const randomThree = this.props.cards[
  //       getRandomInt(0, this.props.cards.length - 1)
  //     ]
  //     const randomFour = this.props.cards[
  //       getRandomInt(0, this.props.cards.length - 1)
  //     ]
  //     randomCards.push(randomOne, randomTwo, randomThree, randomFour)

  //     return randomCards
  //   } else {
  //     return false
  //   }
  // }

  render() {
    return (
      <div className="gamePlay">
        <div className="gamePhotoContainer">
          <img
            src="https://i.pinimg.com/originals/0e/5d/2f/0e5d2ff260608a2bca1c0278871cc903.jpg"
            className="gamePhoto"
          />
          <div className="dealerPlayerContainer">
            <CardTable />
          </div>
        </div>
      </div>
    )
  }
}
