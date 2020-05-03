import React, {Component} from 'react'

// create the cards
const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A'
]
// let deck = new Array() // necessary?
let deck = []

for (let i = 0; i < values.length; i++) {
  for (let x = 0; x < suits.length; x++) {
    let weight = parseInt(values[i])
    if (values[i] === 'J' || values[i] === 'Q' || values[i] === 'K') weight = 10
    if (values[i] === 'A') weight = 11
    // create each card with the suit, a string of value and integer version of the value (using var to navigate scoping issues)
    var card = {Value: values[i], Suit: suits[x], Weight: weight}
    deck.push(card)
  }
}
// console.log("this is the deckkkkkkkkkk,", deck)
// let players = new Array() // necessary?
// let players = []
// let currentPlayer = 0 // perhaps go into state?

// create the card table
export default class CardTable extends Component {
  constructor() {
    super()
    // is local state missing here to streamline all this...or would it be better to split some with redux store? (componentDidMount, mapToState, mapToDispatch, etc.)
    this.state = {
      hand: []
    }
    // bound methods here:
    // this.shuffle = this.shuffle.bind(this)
    this.startBlackJack = this.startBlackJack.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.dealHand = this.dealHand.bind(this)
  }

  // shuffle() {
  //   // for 500 turns
  //   // switch the values of two random cards
  //   for (let i = 0; i < 500; i++) {
  //     let location1 = Math.floor(Math.random() * deck.length)
  //     let location2 = Math.floor(Math.random() * deck.length)
  //     let tmp = deck[location1]

  //     deck[location1] = deck[location2]
  //     deck[location2] = tmp
  //   }
  // }

  startBlackJack() {
    // deal 2 cards to every player object
    // this.shuffle()
    // this.createPlayersUI()
    this.dealHand()
  }

  handleClick(event) {
    if (event.target) {
      this.startBlackJack()
    }
  }

  dealHand() {
    // alternate handing cards to each player
    // 2 cards each
    let newHand
    for (let i = 0; i < 2; i++) {
      let index = [Math.floor(Math.random() * deck.length)]
      let newCard = deck[index]
      // this.setState({})

      newHand = [...this.state.hand, newCard]
    }
    console.log('>>> hand >>> ', newHand)
    return this.state.hand
  }

  render() {
    this.startBlackJack()
    const [hand] = this.state.hand
    console.log('deconstructing hand >>>', hand)
    return (
      // <div className="gameBoard">
      <div className="gameContainer">
        <div className="game-body">
          <div className="game-options">
            <input type="button" className="btn" id="btnStart" />
            <input type="button" className="btn" />
            <input type="button" className="btn" />
          </div>
          <div className="deck">
            <div className="points" style={{textShadow: 'none'}}>
              {deck.length}
            </div>
          </div>
          <div className="players">
            {Array.isArray(hand) &&
              hand.length &&
              hand.map((card, i) => {
                return (
                  <div>
                    {Array.isArray(playerObj.hand) &&
                      playerObj.hand.length &&
                      playerObj.hand.map(singleCard => {
                        return (
                          <div key={playerObj.id} className="card">
                            <ul>{singleCard.Value}</ul>
                            <i>{singleCard.Suit}</i>
                          </div>
                        )
                      })}
                  </div>
                )
              })}
            <button type="button" onClick={event => this.handleClick(event)}>
              Deal New Hand
            </button>
          </div>
        </div>
      </div>
    )
  }
}
