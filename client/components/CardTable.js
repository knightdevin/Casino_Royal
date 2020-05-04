import React from 'react'

class CardTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deck: [],
      dealer: null,
      player: null,
      markers: 0,
      wagerValue: '',
      currentWager: null,
      gameOver: false,
      gameMessage: null
    }
  }

  createDeck() {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    const suits = ['♦', '♣', '♥', '♠']
    const deck = []
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({number: cards[i], suit: suits[j]})
      }
    }
    return deck
  }

  // added shuffle method
  shuffle() {
    //  for 500 turns switch the values of two random cards
    for (let i = 0; i < 500; i++) {
      let location1 = Math.floor(Math.random() * this.deck.length)
      let location2 = Math.floor(Math.random() * this.deck.length)
      let tempDeck = this.deck[location1]

      this.deck[location1] = this.deck[location2]
      this.deck[location2] = tempDeck
    }
  }

  dealMoreCards(deck) {
    const playerCard1 = this.getRandomCard(deck)
    const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck)
    const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck)
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard]
    const dealerStartingHand = [dealerCard1.randomCard, {}]

    const player = {
      cards: playerStartingHand,
      count: this.getCount(playerStartingHand)
    }
    const dealer = {
      cards: dealerStartingHand,
      count: this.getCount(dealerStartingHand)
    }

    return {updatedDeck: playerCard2.updatedDeck, player, dealer}
  }

  dealNewGame(type) {
    // should our shuffle method go in here somewhere?
    if (type === 'continue') {
      if (this.state.markers > 0) {
        const deck =
          this.state.deck.length < 10 ? this.createDeck() : this.state.deck
        const {updatedDeck, player, dealer} = this.dealMoreCards(deck)

        this.setState({
          deck: updatedDeck,
          dealer,
          player,
          currentWager: null,
          gameOver: false,
          gameMessage: null
        })
      } else {
        this.setState({
          gameMessage:
            "We're sorry, but you are now broke! Please come back again."
        })
      }
    } else {
      const deck = this.createDeck()
      const {updatedDeck, player, dealer} = this.dealMoreCards(deck)

      this.setState({
        deck: updatedDeck,
        dealer,
        player,
        markers: 100,
        wagerValue: '',
        currentWager: null,
        gameOver: false,
        gameMessage: null
      })
    }
  }

  getRandomCard(deck) {
    const updatedDeck = deck
    const randomIndex = Math.floor(Math.random() * updatedDeck.length)
    const randomCard = updatedDeck[randomIndex]
    updatedDeck.splice(randomIndex, 1)
    return {randomCard, updatedDeck}
  }

  placeBet() {
    const currentWager = this.state.wagerValue

    if (currentWager > this.state.markers) {
      this.setState({gameMessage: 'Insufficient funds.'})
    } else if (currentWager % 1 !== 0) {
      this.setState({gameMessage: "Whole numbers only. We don't accept change"})
    } else {
      // Deduct current bet from markers
      const markers = this.state.markers - currentWager
      this.setState({markers, wagerValue: '', currentWager})
    }
  }

  hit() {
    if (!this.state.gameOver) {
      if (this.state.currentWager) {
        const {randomCard, updatedDeck} = this.getRandomCard(this.state.deck)
        const player = this.state.player
        player.cards.push(randomCard)
        player.count = this.getCount(player.cards)

        if (player.count > 21) {
          this.setState({
            player,
            gameOver: true,
            gameMessage: 'The House Wins!'
          })
        } else {
          this.setState({deck: updatedDeck, player})
        }
      } else {
        this.setState({gameMessage: 'Place your bets.'})
      }
    } else {
      this.setState({
        gameMessage: 'You Lose! Please visit the ATM and come back.'
      })
    }
  }

  dealerDraw(dealer, deck) {
    const {randomCard, updatedDeck} = this.getRandomCard(deck)
    dealer.cards.push(randomCard)
    dealer.count = this.getCount(dealer.cards)
    return {dealer, updatedDeck}
  }

  getCount(cards) {
    const rearranged = []
    cards.forEach(card => {
      if (card.number === 'A') {
        rearranged.push(card)
      } else if (card.number) {
        rearranged.unshift(card)
      }
    })

    return rearranged.reduce((total, card) => {
      if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
        return total + 10
      } else if (card.number === 'A') {
        return total + 11 <= 21 ? total + 11 : total + 1
      } else {
        return total + card.number
      }
    }, 0)
  }

  stand() {
    if (!this.state.gameOver) {
      // Show dealer's 2nd card
      const randomCard = this.getRandomCard(this.state.deck)
      let deck = randomCard.updatedDeck
      let dealer = this.state.dealer
      dealer.cards.pop()
      dealer.cards.push(randomCard.randomCard)
      dealer.count = this.getCount(dealer.cards)

      // Keep drawing cards until count is 17 or more
      while (dealer.count < 17) {
        const draw = this.dealerDraw(dealer, deck)
        dealer = draw.dealer
        deck = draw.updatedDeck
      }

      if (dealer.count > 21) {
        this.setState({
          deck,
          dealer,
          markers: this.state.markers + this.state.currentWager * 2,
          gameOver: true,
          gameMessage: 'House Lose! The chips are yours!'
        })
      } else {
        const winner = this.getWinner(dealer, this.state.player)
        let markers = this.state.markers
        let gameMessage

        if (winner === 'dealer') {
          gameMessage = 'Dealer sweeps the table...'
        } else if (winner === 'player') {
          markers += this.state.currentWager * 2
          gameMessage = 'You won!'
        } else {
          markers += this.state.currentWager
          gameMessage = 'Push.'
        }

        this.setState({
          deck,
          dealer,
          markers,
          gameOver: true,
          gameMessage
        })
      }
    } else {
      this.setState({gameMessage: 'Game over! Please start a new game.'})
    }
  }

  getWinner(dealer, player) {
    if (dealer.count > player.count) {
      return 'dealer'
    } else if (dealer.count < player.count) {
      return 'player'
    } else {
      return 'push'
    }
  }

  inputChange(event) {
    const wagerValue = event.target.value
    this.setState({wagerValue})
  }

  handleKeyDown(event) {
    const enter = 13
    if (event.keyCode === enter) {
      this.placeBet()
    }
  }

  componentWillMount() {
    this.dealNewGame()
    // Do we still need???
    const body = document.querySelector('body')
    body.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  render() {
    let dealerCount
    const card1 = this.state.dealer.cards[0].number
    const card2 = this.state.dealer.cards[1].number
    if (card2) {
      dealerCount = this.state.dealer.count
    } else if (card1 === 'J' || card1 === 'Q' || card1 === 'K') {
      dealerCount = 10
    } else if (card1 === 'A') {
      dealerCount = 11
    } else {
      dealerCount = card1
    }

    return (
      <div className="gameContainer">
        <div className="game-body">
          <div>
            <div className="game-options">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  this.dealNewGame()
                }}
              >
                Deal New Hand
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  this.hit()
                }}
              >
                Hit Me!
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  this.stand()
                }}
              >
                I'll Stay
              </button>
            </div>

            <p className="gameText">Jettons: ${this.state.markers}</p>
            {!this.state.currentWager ? (
              <div className="input-bet">
                <form>
                  <input
                    type="text"
                    name="bet"
                    placeholder=""
                    value={this.state.wagerValue}
                    onChange={this.inputChange.bind(this)}
                  />
                </form>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    this.placeBet()
                  }}
                >
                  Place Your Bets
                </button>
              </div>
            ) : null}
            {this.state.gameOver ? (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  this.dealNewGame('New Round')
                }}
              >
                New Round
              </button>
            ) : null}
            <p className="gameText">Your Hand ({this.state.player.count})</p>
            <table className="cards">
              <tr>
                {this.state.player.cards.map((card, i) => {
                  return <Card key={i} number={card.number} suit={card.suit} />
                })}
              </tr>
            </table>

            <p className="gameText">
              Dealer's Hand ({this.state.dealer.count})
            </p>
            <table className="cards">
              <tr>
                {this.state.dealer.cards.map((card, i) => {
                  return <Card key={i} number={card.number} suit={card.suit} />
                })}
              </tr>
            </table>

            <p>{this.state.gameMessage}</p>
          </div>
        </div>
      </div>
    )
  }
}

const Card = ({number, suit}) => {
  const combo = number ? `${number}${suit}` : null
  const color = suit === '♦' || suit === '♥' ? 'card-red' : 'card'

  return (
    <td>
      <div className={color}>{combo}</div>
    </td>
  )
}

export default CardTable
