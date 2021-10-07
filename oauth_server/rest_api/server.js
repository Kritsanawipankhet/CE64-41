var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get('/', (req, res) => {
    return res.send({ 
        error: false, 
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL',
    })
})

// connection to mysql database
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api'
})
dbCon.connect();

// retrieve all books 
app.get('/users', (req, res) => {
    dbCon.query('SELECT * FROM users', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Users table is empty";
        } else {
            message = "Successfully retrieved all users";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

// add a new users
app.post('/user', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;

    // validation
    if (!username || !password || !name) {
        return res.status(400).send({ error: true, message: "Please provide Username , Password and Name."});
    } else {
        dbCon.query('INSERT INTO users (username, password, name) VALUES(?, ?, ?)', [username, password, name], (error, results, fields) => {
            if (error) throw error;
            return res.send({ error: false, data: results, message: "Users successfully added"})
        })
    }
});

// retrieve users by id 
app.get('/user/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide Users id"});
    } else {
        dbCon.query("SELECT * FROM users WHERE id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Users not found";
            } else {
                message = "Successfully retrieved users data";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
})

// update users with id 
app.put('/user', (req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;

    // validation
    if (!id || !username || !password || !name) {
        return res.status(400).send({ error: true, message: 'Please provide users id, username, password and name'});
    } else {
        dbCon.query('UPDATE users SET username = ?, password = ?, name = ? WHERE id = ?', [username, password, name, id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRows === 0) {
                message = "Users not found or data are same";
            } else {
                message = "Users successfully updated";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

// delete users by id
app.delete('/user', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide users id"});
    } else {
        dbCon.query('DELETE FROM users WHERE id = ?', [id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.affectedRows === 0) {
                message = "Users not found";
            } else {
                message = "Users successfully deleted";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

module.exports = app;