const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const app = express();
const pg = require('pg');
const jwt = require('jsonwebtoken');
db = 'studyhour';

const pgClient = new pg.Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'studyhour',
    password: '123',
    port: '5432'});

pgClient.connect().then();
{
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!`);
    });
}

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(express.urlencoded({ extended: true }));
app.get('/Home', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/About', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/Login', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
<<<<<<< HEAD

app.get('/Review', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

=======
app.get('/Signup', (req, res) => {
      res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

app.get('/Location', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});


// Get all the comments for a location
// Returned comment should have all comment data including user_id
app.post('/api/Location/Comments', function (req, res, next) {
    pgClient.query('SELECT * FROM comments t WHERE t.location_id= $1 ', [req.body.location], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

// Get all comments from a given user
// not that high priority
app.post('/api/User/Comments', function (req, res, next) {
    pgClient.query('SELECT * FROM comments t WHERE t.id= $1 ', [req.body.location], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

// Get all data about a user
app.post('/api/User', function (req, res, next) {
    pgClient.query('SELECT * FROM users t WHERE t.id= $1 ', [req.body.user_id], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });

});

// Verify login credentials, return True or False for authentication success
app.post('/api/Login', function (req, res, next) {
    pgClient.query('SELECT * FROM users u where u.user_name = $1 and u.password = $2',[req.body.user_name, req.body.password], function (err, result) {
        if (err) {
            return next(err)
        }
        if(result.rows.length === 0) {
            res.send({auth: false});
            return;
        }
        const config = {
            secret: "supersecret"
        };
        const token = jwt.sign({ id: result.rows[0].user_id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.send({auth: true, token: token})
    });
});

app.post('/api/Signup', function (req, res, next) {
    pgClient.query('SELECT * FROM users u where u.user_name = $1',[req.body.user_name], function (err, result) {
        if (err) {
            return next(err)
        }
        if(result.rows.length !== 0) {
            res.send({success: false});
            return;
        }
        pgClient.query('INSERT INTO users(user_name, password) VALUES ($1, $2)',[req.body.user_name, req.body.password],function(err, result) {
           if (err) {
               return next(err)
           }
        });
        res.send({success: true});
    });
});
