var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');
var path = require('path');

router.get('/', function (req, res) {

    userId = req.user.id
    console.log('user data is as follow ', req.user.id);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT "events"."title", "events"."color", "events"."month", "events"."day"
            FROM "events" JOIN "users_events"
            ON "events"."id" = "users_events"."event_id"
            WHERE "users_events"."user_id" = ${userId};`, function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

router.post('/', function (req, res) {
    var newEvent = req.body;
    userId = req.user.id

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH new_event AS (INSERT INTO events ("title", "color", "month", "day")
            VALUES ($1, $2, $3, $4) RETURNING id)            
            INSERT INTO users_events ("user_id", "event_id")
            VALUES ($5, (Select id FROM new_event));;`, [newEvent.title, newEvent.color, newEvent.month, newEvent.day, userId],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
});

module.exports = router;

