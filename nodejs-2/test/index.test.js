const chakram = require('chakram');
const db = require('sqlite');

expect = chakram.expect

const PORT = process.env.PORT || 8080
const BASE_URL = 'http://localhost:' + PORT

let server

describe('Monty Python ', () => {
    before(async () => {
        await db.open('./database.sqlite')
        server = require('../src/server')
        await server.start(PORT)
    })

    after(() => {
        server.stop()
    })

    it('/v1/quote', async () => {
        const randomQuote = await chakram.get(BASE_URL + '/v1/quote')
        expect(randomQuote).to.have.status(200);
    });


    it('/v1/quote/:actor', async () => {
        const actorName = 'Michael Palin'
        const randomQuote = await chakram.get(BASE_URL + '/v1/quote/' + actorName)
        expect(randomQuote).to.have.status(200);
    });
})
