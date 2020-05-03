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

// const playerOne = {
//   name: 'Dev',
//   points: 18,
//   hand: ['Q', '8'],
// }

// const playerTwo = {
//   name: 'Zou',
//   points: 13,
//   hand: ['5', '8'],
// }

// let players = new Array() // necessary?
let players = []
let currentPlayer = 0 // perhaps go into state?

// create the card table
export default class CardTable extends Component {
  constructor() {
    super()
    // is local state missing here to streamline all this...or would it be better to split some with redux store? (componentDidMount, mapToState, mapToDispatch, etc.)
    this.state = {
      // isDealer: false, // game should default for player first
      name: '',
      id: 0,
      points: 0,
      hand: []
    }
    // bound methods here:
    this.createDeck = this.createDeck.bind(this)
    this.createPlayers = this.createPlayers.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.startBlackJack = this.startBlackJack.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.dealHands = this.dealHands.bind(this)
    this.getPoints = this.getPoints.bind(this)
    this.updatePoints = this.updatePoints.bind(this)
  }

  createDeck() {
    deck = []
    for (let i = 0; i < values.length; i++) {
      for (let x = 0; x < suits.length; x++) {
        let weight = parseInt(values[i])
        if (values[i] === 'J' || values[i] === 'Q' || values[i] === 'K')
          weight = 10
        if (values[i] === 'A') weight = 11
        // create each card with the suit, a string of value and integer version of the value (using var to navigate scoping issues)
        var card = {Value: values[i], Suit: suits[x], Weight: weight}
        deck.push(card)
      }
    }
  }

  createPlayers(num) {
    players = [] // an array to store created players
    for (let i = 1; i <= num; i++) {
      // for each iteration through the given num...
      // reset the state to the following
      const newPlayer = {
        name: `Player ${i}`,
        id: i,
        points: 0,
        hand: []
      }
      // now push the updated state into the players array
      players.push(newPlayer)
    }
  }

  shuffle() {
    // for 500 turns
    // switch the values of two random cards
    for (let i = 0; i < 500; i++) {
      let location1 = Math.floor(Math.random() * deck.length)
      let location2 = Math.floor(Math.random() * deck.length)
      let tmp = deck[location1]

      deck[location1] = deck[location2]
      deck[location2] = tmp
    }
  }

  startBlackJack() {
    // deal 2 cards to every player object
    currentPlayer = 0
    this.createDeck()
    this.shuffle()
    this.createPlayers(2)
    // this.createPlayersUI()
    this.dealHands()
    // document.getElementById('player_' + currentPlayer).classList.add('active')
    console.log('METHOD invoked for new blackJack')
    console.log('newDeck created USING METHOD: ', deck)
    console.log('newPlayers created USING METHOD: ', players)
  }

  handleClick(event) {
    if (event.target) {
      this.startBlackJack()
    }
  }

  dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (let i = 0; i < 2; i++) {
      for (let x = 0; x < players.length; x++) {
        let card = deck.pop()

        // this.setState({})
        players[x].hand.push(card)
        // this.renderCard(card, x)
        this.updatePoints()
      }
      return players
    }
  }

  // returns the number of points that a player has in hand
  getPoints(player) {
    let totalPoints = 0
    // iterate through the player's hand
    players[player].hand.forEach(singleCard => {
      // add the weight of each card to the points
      totalPoints += singleCard.Weight
    })

    // for (let i = 0; i < players[player].hand.length; i++) {
    //   points += players[player].hand[i].Weight
    // }

    // now reset the value of the player's points to the totalPoints
    players[player].Points = totalPoints
    return totalPoints
  }

  updatePoints() {
    for (let i = 0; i < players.length; i++) {
      this.getPoints(i)
      // document.getElementById('points_' + i).innerHTML = players[i].Points
    }
  }

  // hitMe() {
  //   // pop a card from the deck to the current player
  //   // check if current player new points are over 21
  //   let card = deck.pop()
  //   players[currentPlayer].hand.push(card)
  //   this.renderCard(card, currentPlayer)
  //   this.updatePoints()
  //   this.pdateDeck()
  //   this.check()
  // }

  // stay() {
  //   // move on to next player, if any
  //   if (currentPlayer != players.length - 1) {
  //     document
  //       .getElementById('player_' + currentPlayer)
  //       .classList.remove('active')
  //     currentPlayer += 1
  //     document.getElementById('player_' + currentPlayer).classList.add('active')
  //   } else {
  //     this.end()
  //   }
  // }

  // // // revisit this...should probably be reworked for jsx?
  // // createPlayersUI() {
  // //   document.getElementById('players').innerHTML = ''
  // //   for (let i = 0; i < players.length; i++) {
  // //     let div_player = document.createElement('div')
  // //     let div_playerid = document.createElement('div')
  // //     let div_hand = document.createElement('div')
  // //     let div_points = document.createElement('div')

  // //     div_points.className = 'points'
  // //     div_points.id = 'points_' + i
  // //     div_player.id = 'player_' + i
  // //     div_player.className = 'player'
  // //     div_hand.id = 'hand_' + i

  // //     div_playerid.innerHTML = 'Player ' + players[i].ID
  // //     div_player.appendChild(div_playerid)
  // //     div_player.appendChild(div_hand)
  // //     div_player.appendChild(div_points)
  // //     document.getElementById('players').appendChild(div_player)
  // //   }
  // // }

  // // renderCard(card, player) {
  // //   let hand = document.getElementById('hand_' + player)
  // //   hand.appendChild(this.getCardUI(card))
  // // }

  // // getCardUI(card) {
  // //   let el = document.createElement('div')
  // //   let icon = ''
  // //   if (card.Suit == 'Hearts') icon = '&hearts;'
  // //   else if (card.Suit == 'Spades') icon = '&spades;'
  // //   else if (card.Suit == 'Diamonds') icon = '&diams;'
  // //   else icon = '&clubs;'

  // //   el.className = 'card'
  // //   el.innerHTML = card.Value + '<br/>' + icon
  // //   return el
  // // }

  // end() {
  //   let winner = -1
  //   let score = 0

  //   for (let i = 0; i < players.length; i++) {
  //     if (players[i].Points > score && players[i].Points < 22) {
  //       winner = i
  //     }

  //     score = players[i].Points
  //   }

  //   document.getElementById('status').innerHTML =
  //     'Winner: Player ' + players[winner].ID
  //   document.getElementById('status').style.display = 'inline-block'
  // }

  // check() {
  //   if (players[currentPlayer].Points > 21) {
  //     document.getElementById('status').innerHTML =
  //       'Player: ' + players[currentPlayer].ID + ' LOST'
  //     document.getElementById('status').style.display = 'inline-block'
  //     this.end()
  //   }
  // }

  render() {
    this.startBlackJack()
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
            {Array.isArray(players) &&
              players.length &&
              players.map(playerObj => {
                return (
                  // <div key={playerObj.id} className="playerCards">
                  <div key={playerObj.id} className="player">
                    <div>{playerObj.name}</div>

                    <div
                      key={playerObj.hand}
                      className={`hand_${playerObj.id}`}
                    >
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
                    <div className="points">Points: {playerObj.points}</div>
                  </div>
                )
              })}
            <button type="button" onClick={this.handleClick}>
              Deal New Hand
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// createPlayersUI() {
//   document.getElementById('players').innerHTML = ''
//   for (let i = 0; i < players.length; i++) {
//     let div_player = document.createElement('div')
//     let div_playerid = document.createElement('div')
//     let div_hand = document.createElement('div')
//     let div_points = document.createElement('div')

//     div_points.className = 'points'
//     div_points.id = 'points_' + i
//     div_player.id = 'player_' + i
//     div_player.className = 'player'
//     div_hand.id = 'hand_' + i

//     div_playerid.innerHTML = 'Player ' + players[i].ID
//     div_player.appendChild(div_playerid)
//     div_player.appendChild(div_hand)
//     div_player.appendChild(div_points)
//     document.getElementById('players').appendChild(div_player)
//   }
// }

// ----------------------------
// // revisit...maybe this is event listener in class component?
// window.addEventListener('load', function () {
//   createDeck() // needs 'this' if placed inside class component
//   shuffle() // needs 'this' if placed inside class component
//   createPlayers(1) // needs 'this' if placed inside class component
// })
