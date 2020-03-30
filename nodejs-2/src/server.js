'use strict'

const restify = require('restify')
const Promise = require('bluebird');
const SQL = require('sql-template-strings');
const sqlite = require('sqlite');
const path = require('path');

//const dbPromise = sqlite.open(`${process.cwd()}/database.sqlite`, { Promise });
const dbPromise = sqlite.open(path.resolve(__dirname, '../database.sqlite'), { Promise });

const server = restify.createServer({
    name: 'monty-python-generator',
    version: '1.0.0',
});

server.use(restify.plugins.queryParser())

server.get('/v1/quote', async (req, res, next) => {
    try{
        const db = await dbPromise;
        const quote = await Promise.all([
            db.get('SELECT ALL detail FROM scripts ORDER BY RANDOM() LIMIT 1')
        ]);

        res.send(quote[0].detail);

    } catch (err) {
        console.log(err)
        next(err)
    }
});

server.get('/v1/quote/:actor', async (req, res, next) => {
    try {
        const actorName = req.params.actor

        const db = await dbPromise;
                
        const actor = {
            actor: await Promise.all([
                db.get(SQL`SELECT actor FROM scripts WHERE actor=${actorName}`),    
            ]),
            quote: await Promise.all([
                db.get(SQL`SELECT detail FROM scripts WHERE actor=${actorName}`)    
            ])
        }
        
        const newActor = {
            actor: actor.actor[0].actor,
            quote: actor.quote[0].detail
        }

        res.send(newActor)
    } catch (err) {
        console.log(err);
        next(err)
    }
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

//start()

module.exports = {
    start,
    stop
}
