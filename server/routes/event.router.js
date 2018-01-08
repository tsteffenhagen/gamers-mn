var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');
var path = require('path');

router.get('/', function (req, res) {

    userId = req.user.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT "events"."title", "events"."color", "events"."month", "events"."day", "users_events"."id", "events"."id" AS "eventId"
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

router.put('/', function (req, res) {
    var editEvent = req.body;
    console.log(editEvent);
    

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE events SET title=$1, color=$2, real_date=$3 WHERE id=$4;`, [editEvent.title, editEvent.color.primary, editEvent.realDate, editEvent.editId],
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

router.delete('/', function (req, res) {  
    var eventToRemove = req.query;

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM users_events WHERE id=$1`, [eventToRemove.deleteId],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});

module.exports = router;

