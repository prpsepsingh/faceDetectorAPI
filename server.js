const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //local host
      user : 'postgres',
      password : '123',
      database : 'smart_brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send('success');
})

app.post('/signin', (request, response) => {signin.handleSignIn(request, response, db, bcrypt)});

app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt)});

app.get('/profile/:id', profile.handleProfile(db)); // could do either the top way or this way. Just personal preference. profile.js also changes to;
// const handleProfile = (db) => (request, response) => {} instead of;
// const handleProfile = (request, response, db) => {}

app.put('/image', image.handleImage(db));
app.post('/imageurl', (request, response) => {image.handleApiCall(request, response)});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

/*
PLAN
/ --> response = this is working
/signin --> POST = success/fail 
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
// POST means create new
// PUT means insert or replace if already exists.
