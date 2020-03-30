'use strict'

const restify = require('restify')
const Promise = require('bluebird');
const sqlite = require('sqlite');
const path = require('path');

//const dbPromise = sqlite.open(`${process.cwd()}/database.sqlite`, { Promise });

const server = restify.createServer({
    name: 'monty-python-generator',
    version: '1.0.0',
});

server.use(restify.plugins.queryParser())

server.get('/v1/quote', async (req, res, next) => {
    
    try{
        const openDB = (filename) => {

            const pathDB = path.resolve(__dirname, filename)
            return new Promise((resolve, reject) => {
                sqlite.open(pathDB, sqlite3.OPEN_READONLY, (err, response) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(response)
                });
            });
        }

        const seila = async () => {
            const db = await openDB('./database.sqlite');
            await db.get('SELECT ALL detail FROM scripts', [ quote ], (err, rows) => {
                if(err || rows == undefined) {
                    console.log(err)
                } else {
                    console.log(rows)
                    return res.send({rows})
                }
            })
        }

        seila()
        //res.render('/v1/quote', { quote })
    } catch (err) {
        console.log(err)
        next(err)
    }
});

server.get('/v1/quote/:actor', async (req, res, next) => {
    res.send(501)
});

const start = async (port = 8080) => {
    server.listen(port, function () {
        console.info('%s listening at %s', server.name, server.url);
    });
}

const stop = () => {
    server.close(() => {
        console.info('Server Stopped')
    })
}

start()

module.exports = {
    start,
    stop
}
