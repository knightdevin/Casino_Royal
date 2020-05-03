'use strict'

const db = require('../server/db')
const {User, Card} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  // create the deck of cards (based on using card model)
  const cards = await Promise.all([
    Card.create({suit: 'spades', value: 'A'}),
    Card.create({suit: 'hearts', value: 'A'}),
    Card.create({suit: 'clubs', value: 'A'}),
    Card.create({suit: 'diamonds', value: 'A'}),

    Card.create({suit: 'spades', value: '2'}),
    Card.create({suit: 'hearts', value: '2'}),
    Card.create({suit: 'clubs', value: '2'}),
    Card.create({suit: 'diamonds', value: '2'}),

    Card.create({suit: 'spades', value: '3'}),
    Card.create({suit: 'hearts', value: '3'}),
    Card.create({suit: 'clubs', value: '3'}),
    Card.create({suit: 'diamonds', value: '3'}),

    Card.create({suit: 'spades', value: '4'}),
    Card.create({suit: 'hearts', value: '4'}),
    Card.create({suit: 'clubs', value: '4'}),
    Card.create({suit: 'diamonds', value: '4'}),

    Card.create({suit: 'spades', value: '5'}),
    Card.create({suit: 'hearts', value: '5'}),
    Card.create({suit: 'clubs', value: '5'}),
    Card.create({suit: 'diamonds', value: '5'}),

    Card.create({suit: 'spades', value: '6'}),
    Card.create({suit: 'hearts', value: '6'}),
    Card.create({suit: 'clubs', value: '6'}),
    Card.create({suit: 'diamonds', value: '6'}),

    Card.create({suit: 'spades', value: '7'}),
    Card.create({suit: 'hearts', value: '7'}),
    Card.create({suit: 'clubs', value: '7'}),
    Card.create({suit: 'diamonds', value: '7'}),

    Card.create({suit: 'spades', value: '8'}),
    Card.create({suit: 'hearts', value: '8'}),
    Card.create({suit: 'clubs', value: '8'}),
    Card.create({suit: 'diamonds', value: '8'}),

    Card.create({suit: 'spades', value: '9'}),
    Card.create({suit: 'hearts', value: '9'}),
    Card.create({suit: 'clubs', value: '9'}),
    Card.create({suit: 'diamonds', value: '9'}),

    Card.create({suit: 'spades', value: '10'}),
    Card.create({suit: 'hearts', value: '10'}),
    Card.create({suit: 'clubs', value: '10'}),
    Card.create({suit: 'diamonds', value: '10'}),

    Card.create({suit: 'spades', value: 'J'}),
    Card.create({suit: 'hearts', value: 'J'}),
    Card.create({suit: 'clubs', value: 'J'}),
    Card.create({suit: 'diamonds', value: 'J'}),

    Card.create({suit: 'spades', value: 'Q'}),
    Card.create({suit: 'hearts', value: 'Q'}),
    Card.create({suit: 'clubs', value: 'Q'}),
    Card.create({suit: 'diamonds', value: 'Q'}),

    Card.create({suit: 'spades', value: 'K'}),
    Card.create({suit: 'hearts', value: 'K'}),
    Card.create({suit: 'clubs', value: 'K'}),
    Card.create({suit: 'diamonds', value: 'K'})
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
