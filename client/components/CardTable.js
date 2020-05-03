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

// let players = new Array() // necessary?
let players = []
let currentPlayer = 0 // perhaps go into state?

// create the card table
export default class CardTable extends Component {
  constructor() {
    super()
    // is local state missing here to streamline all this...or would it be better to split some with redux store? (componentDidMount, mapToState, mapToDispatch, etc.)
    this.state = {
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
    this.dealHands = this.dealHands.bind(this)
    this.getPoints = this.getPoints.bind(this)
    this.updatePoints = this.updatePoints.bind(this)
    this.hitMe = this.hitMe.bind(this)
    this.stay = this.stay.bind(this)
    this.check = this.check.bind(this)
    this.updateDeck = this.updateDeck.bind(this)
    this.end = this.end.bind(this)
    this.getCardUI = this.getCardUI.bind(this)
    this.renderCard = this.renderCard.bind(this)
    this.createPlayersUI = this.createPlayersUI.bind(this)
  }

  createDeck() {
    deck = new Array()
    for (let i = 0; i < values.length; i++) {
      for (let x = 0; x < suits.length; x++) {
        let weight = parseInt(values[i])
        if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K')
          weight = 10
        if (values[i] == 'A') weight = 11
        let card = {Value: values[i], Suit: suits[x], Weight: weight}
        deck.push(card)
      }
    }
  }

  createPlayers(num) {
    players = [] // an array to store created players
    for (var i = 1; i <= num; i++) {
      // for each iteration through the given num...
      // reset the state to the following
      this.setState({
        name: `Player ${i}`,
        id: i,
        points: 0,
        hand: []
      })
      // now push the updated state into the players array
      players.push(this.state)

      // ------------------------------------
      // REWORKED INTO ABOVE. CONSIDER DELETING!
      // var hand = new Array()
      // var player = {Name: 'Player ' + i, ID: i, Points: 0, Hand: hand}
      // players.push(player)
      // -------------------------------------
    }
  }

  shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * deck.length)
      let location2 = Math.floor(Math.random() * deck.length)
      let tmp = deck[location1]

      deck[location1] = deck[location2]
      deck[location2] = tmp
    }
  }

  startBlackJack() {
    // // should go into jsx...
    // document.getElementById('btnStart').value = 'Restart'
    // document.getElementById('status').style.display = 'none'

    // logig for startblackJack
    // deal 2 cards to every player object
    currentPlayer = 0
    this.createDeck()
    this.shuffle()
    this.createPlayers(2)
    // this.createPlayersUI()
    this.dealHands()
    // document.getElementById('player_' + currentPlayer).classList.add('active')
  }

  dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (let i = 0; i < 2; i++) {
      for (let x = 0; x < players.length; x++) {
        let card = deck.pop()
        players[x].this.state.hand.push(card)
        this.renderCard(card, x)
        this.updatePoints()
      }
    }
    this.updateDeck()
  }

  // returns the number of points that a player has in hand
  getPoints(player) {
    var points = 0
    for (var i = 0; i < players[player].Hand.length; i++) {
      points += players[player].Hand[i].Weight
    }
    players[player].Points = points
    return points
  }

  updatePoints() {
    for (var i = 0; i < players.length; i++) {
      this.getPoints(i)
      document.getElementById('points_' + i).innerHTML = players[i].Points
    }
  }

  hitMe() {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.pop()
    players[currentPlayer].Hand.push(card)
    this.renderCard(card, currentPlayer)
    this.updatePoints()
    this.pdateDeck()
    this.check()
  }

  stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
      document
        .getElementById('player_' + currentPlayer)
        .classList.remove('active')
      currentPlayer += 1
      document.getElementById('player_' + currentPlayer).classList.add('active')
    } else {
      this.end()
    }
  }

  // revisit this...should probably be reworked for jsx?
  createPlayersUI() {
    document.getElementById('players').innerHTML = ''
    for (var i = 0; i < players.length; i++) {
      var div_player = document.createElement('div')
      var div_playerid = document.createElement('div')
      var div_hand = document.createElement('div')
      var div_points = document.createElement('div')

      div_points.className = 'points'
      div_points.id = 'points_' + i
      div_player.id = 'player_' + i
      div_player.className = 'player'
      div_hand.id = 'hand_' + i

      div_playerid.innerHTML = 'Player ' + players[i].ID
      div_player.appendChild(div_playerid)
      div_player.appendChild(div_hand)
      div_player.appendChild(div_points)
      document.getElementById('players').appendChild(div_player)
    }
  }

  renderCard(card, player) {
    var hand = document.getElementById('hand_' + player)
    hand.appendChild(this.getCardUI(card))
  }

  getCardUI(card) {
    var el = document.createElement('div')
    var icon = ''
    if (card.Suit == 'Hearts') icon = '&hearts;'
    else if (card.Suit == 'Spades') icon = '&spades;'
    else if (card.Suit == 'Diamonds') icon = '&diams;'
    else icon = '&clubs;'

    el.className = 'card'
    el.innerHTML = card.Value + '<br/>' + icon
    return el
  }

  end() {
    var winner = -1
    var score = 0

    for (var i = 0; i < players.length; i++) {
      if (players[i].Points > score && players[i].Points < 22) {
        winner = i
      }

      score = players[i].Points
    }

    document.getElementById('status').innerHTML =
      'Winner: Player ' + players[winner].ID
    document.getElementById('status').style.display = 'inline-block'
  }

  check() {
    if (players[currentPlayer].Points > 21) {
      document.getElementById('status').innerHTML =
        'Player: ' + players[currentPlayer].ID + ' LOST'
      document.getElementById('status').style.display = 'inline-block'
      this.end()
    }
  }

  updateDeck() {
    document.getElementById('deckcount').innerHTML = deck.length
  }

  render() {
    console.log('this.props >>>>>', this.props)
    console.log('this.state >>>>>', this.state)
    const player = this.state

    return (
      <div>
        CARD TABLE WILL BE HERE!!!
        <div className="playerContainer" />
        {Array.isArray(players) &&
          players.map(playerObj => {
            return <div key={playerObj.id} className="playerContainer" />
          })}
        <button type="button" onClick={() => this.startBlackJack()}>
          Deal New Hand
        </button>
      </div>
    )
  }
}

// // revisit...maybe this is event listener in class component?
// window.addEventListener('load', function () {
//   createDeck() // needs 'this' if placed inside class component
//   shuffle() // needs 'this' if placed inside class component
//   createPlayers(1) // needs 'this' if placed inside class component
// })
