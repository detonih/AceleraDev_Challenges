const fs = require('fs')
const { promisify } = require('util')
const { expect } = require('chai')
const githubStars = require('../src')

const readFile = promisify(fs.readFile);

describe('Git Stars', function() {
    it('run', async () => {
        try {
            await githubStars('node');
            result = JSON.parse(await readFile('./stars.json'))
        } catch (error) {
            // propositally fail
            expect.fail(error.message)
        }
        expect(result).to.be.an('array')
    });
})
