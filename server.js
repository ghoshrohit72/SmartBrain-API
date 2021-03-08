const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const app = express();

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


app.use(bodyParser.json());
app.use(cors());

const DB = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});


app.get('/', (req, res)=>{
    res.send(database.users);
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, DB, bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req, res, DB, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, DB)} )
app.put('/image', (req, res) => {image.handleImagePut(req, res, DB)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
});

/*

/ --->  res = this is working
/signin ---> POST = success/fail
/register ---> POST = user
/profile/:userID ---> GET = user
/image --> PUT( updated ) = updated user object

*/