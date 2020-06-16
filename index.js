/**
 * Sample
 */
const { Client } = require('@elastic/elasticsearch')
const hirestime = require('hirestime')

const client = new Client({ node: 'http://localhost:9200' })

const INDEX_NAME = 'game-of-thrones'

async function index(character, quote) {
  await client.index({
    index: INDEX_NAME,
    body: {
      character,
      quote,
    },
  })
}

async function find(quote) {
  const { body } = await client.search({
    index: INDEX_NAME,
    body: {
      query: {
        match: {
          quote,
        },
      },
    },
  })

  return body.hits.hits
}

async function run() {
  const getElapsed = hirestime()

  await index('Daenerys Targaryen', 'I am the mother of dragons.')
  await index('Tyrion Lannister', 'A mind needs books like a sword needs a whetstone.')

  const quotes = await find('dragons')

  console.log(quotes)

  console.log('In secounds: ', getElapsed.s())
  console.log('In milliseconds: ', getElapsed.ms())
}

run().catch(console.log)
