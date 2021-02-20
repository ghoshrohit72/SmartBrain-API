const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');


const app = express();

app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'Adrija',
            email: 'adrija@asas.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'Rohit',
            email: 'rohit@asas.com',
            password: 'icecream',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'987',
            hash: '',
            email: 'adrija@asas.com'
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
});

app.post('/signin', (req, res)=>{
    if(req.body.email== database.users[0].email &&
       req.body.password== database.users[0].password ){
        res.json(database.users[0])
       }
       else{
           res.status(400).json('error signing in')
       }

})

app.post('/register', (req, res )=>{

    const { name, email, password } = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });

    database.users.push(
        {
            id: '124',
            name: name,
            email: email,
            
            entries: 0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', ( req, res )=>{
    const { id } = req.params;
    let found = false
    database.users.forEach(user=>{
        if(user.id === id)
        {   found = true;
            return  res.json(user)
        }
       
    })
    if(!found)
    {
        res.status(404).json('No such User')
    }
})

app.put('/image', (req, res )=>{
    const { id } = req.body;
    let found = false
    database.users.forEach(user=>{
        if(user.id === id)
        {   found = true;
            user.entries++
            return  res.json(user.entries)
        }
       
    }) 
    if(!found)
    {
        res.status(404).json('No such User')
    }
})

app.listen(3000, ()=>{
    console.log('Server running at port 3000');
});

/*

/ --->  res = this is working
/signin ---> POST = success/fail
/register ---> POST = user
/profile/:userID ---> GET = user
/image --> PUT( updated ) = updated user object

*/