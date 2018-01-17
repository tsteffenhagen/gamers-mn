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
            client.query(`SELECT "games"."name", "events"."title", "events"."color", "events"."starts_at", "events"."ends_at", "users_events"."id", "events"."id" AS "eventId", "users_events"."creator", "users_events"."accepted", "users_events"."denied", "users_events"."public", "users_events"."invited"
            FROM "events" JOIN "users_events"
            ON "events"."id" = "users_events"."event_id"
            JOIN "games" ON "events"."game_id" = "games"."id" 
            WHERE "users_events"."user_id" = ${userId}
            AND "users_events"."accepted" = 'true'
            ORDER BY starts_at ASC;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/public', function (req, res) {

    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT "events"."title", "events"."color", "events"."starts_at", "events"."ends_at", "users_events"."id", "events"."id" AS "eventId", "users_events"."creator", "users_events"."accepted", "users_events"."denied", "users_events"."public", "users_events"."invited"
            FROM "events" JOIN "users_events"
            ON "events"."id" = "users_events"."event_id"
            WHERE "users_events"."public" = 'true';`, function (errorMakingDatabaseQuery, result) {
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

router.get('/invites', function (req, res) {

    userId = req.user.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT "games"."name", "events"."title", "events"."color", "events"."starts_at", "events"."ends_at", "users_events"."id", "events"."id" AS "eventId", "users_events"."creator", "users_events"."accepted", "users_events"."denied", "users_events"."public", "users_events"."invited"
            FROM "events" JOIN "users_events"
            ON "events"."id" = "users_events"."event_id"
            JOIN "games" ON "events"."game_id" = "games"."id" 
            WHERE "users_events"."user_id" = ${userId}
            AND "users_events"."invited" = 'true';`, function (errorMakingDatabaseQuery, result) {
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

router.put('/invites/accept', function (req, res) {
    
    console.log('REQ BODY INFO', req.body);
    console.log('REQ USER INFO', req.user.id);
    
    

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE users_events SET accepted='true', invited='false'
            WHERE  user_id=$1
            AND event_id=$2;`, [req.user.id, req.body.eventId],
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

router.put('/invites/decline', function (req, res) {    

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE users_events SET denied='true', invited='false'
            WHERE  user_id=$1
            AND event_id=$2;`, [req.user.id, req.body.eventId],
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

router.post('/', function (req, res) {
    var newEvent = req.body;
    userId = req.user.id
    console.log(req.body);
    if (req.isAuthenticated()) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH new_event AS (INSERT INTO events ("title", "color", "starts_at", "ends_at", "game_id")
            VALUES ($1, $2, $3, $4, $5) RETURNING id)            
            INSERT INTO users_events ("user_id", "event_id", "creator", "accepted", "denied", "public", "invited" )
            VALUES ($6, (Select id FROM new_event), 'true', 'true', 'false', $7, 'false');`, [newEvent.title, newEvent.color, newEvent.startDateTime, newEvent.endDateTime, newEvent.game.gameId, userId, newEvent.public],
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
}
else {
    res.sendStatus(403);
}
});

router.post('/invite', function (req, res) {
    var inviteInfo = req.body;
    console.log('IN INVITE', req.body);

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            for (let i = 0; i < req.body.invites.length; i++) {
                client.query(`INSERT INTO users_events ("user_id", "event_id", "creator", "accepted", "denied", "public", "invited")
                VALUES ($1, $2, 'false', 'false', 'false', 'false', 'true');`, [req.body.invites[i], req.body.editId],
                function(errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500)
                    }
                });
            }
        }
    })
})

router.put('/', function (req, res) {
    var editEvent = req.body;
    console.log(editEvent);


    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE events SET title=$1, color=$2, starts_at=$3 WHERE id=$4;`, [editEvent.title, editEvent.color.primary, editEvent.startsAt, editEvent.editId],
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

