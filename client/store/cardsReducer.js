// ------------- WE CONSIDERED INCORPORATING REDUX TO STORE VALUES / CREATE ACTIONS, BUT WENT IN DIFFERENT DIRECTION -------------------
// // action types:
// const DEAL_CARDS = 'DEAL_CARDS' // for new game
// const DEALER_HIT_CARD = 'DEALER_HIT_CARD'
// const PLAYER_HIT_CARD = 'PLAYER_HIT_CARD'
// const STAY = 'STAY'

// // action creators
// const dealCards = (cards) => {
//   return {
//     type: DEAL_CARDS,
//     cards,
//   }
// }

// const dealerHit = () => {
//   return {}
// }

// const playerHit = () => {
//   return {}
// }

// const stay = () => {
//   return {}
// }

// // initial state
// const initialState = {
//   cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//   dealerTotal: 0,
//   playerTotal: 0,
//   currCard: {},
// }

// // reducer
// export default function cardsReducer(state = initialState, action) {
//   switch (action.type) {
//     case DEAL_CARDS:
//       return
//     default:
//       return state
//   }
// }

// --------------------------------------------------------------------------------------------------------------------
// === BELOW IS FROM OUR ORIGINAL IDEA OF CARD MODEL (BROUGHT IN FROM DB AS REFERENCE NOW THAT MODEL HAS SINCE BEEN DELETED) ===
// --------------------------------------------------------------------------------------------------------------------
// const Card = db.define('card', {
//   suit: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['spades', 'hearts', 'clubs', 'diamonds']]
//     }
//   },
//   value: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']]
//     }
//   }
// })

// module.exports = Card
