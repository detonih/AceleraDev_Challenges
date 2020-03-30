const fs = require('fs')
const { promisify } = require('util')
const { expect } = require('chai');
const { run } = require('../src');

const readFile = promisify(fs.readFile)

describe('HTML Parser', () => {
    it('run', async () => {
        try {
            await run('./nodejs.html', './nodejs.json');
            result = JSON.parse(await readFile('./nodejs.json'))
            expect(result).to.be.an('object')
        } catch (error) {
            // propositally fail
            expect.fail(error.message)
        }
    })
})
