var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');


// used to serve static files
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function(req, res) {
        // check if account exists
        dal.find(req.params.email).
        then((users) => {
            console.log('users:', JSON.stringify(users));

            // if user exists, return error message
            if(users.length > 0){
                console.log('You already have an account. Please use Login.');
                res.send({message: "You already have an account. Please use Login."});    
            }
            else{
             // else create user
            dal.create(req.params.name,req.params.email,req.params.password)
                .then((user) => {
                    console.log(user);
                    res.send(user);            
                });            
            }
        });     
});


// login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.findOne(req.params.email).then(user => {
            console.log("inside app.get", JSON.stringify(user));
            console.log(JSON.stringify(user).length)
            // if user exists, check password
            if(JSON.stringify(user).length > 4){
                if (user.password === req.params.password){
                    res.send(JSON.stringify(user));
                }
                else{
                    res.send("Incorrect password.");
                }
            }
            else{
                res.send("Username not found.  Please try again or create a new account.");
            }
    });
});

// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});

// find all accounts
app.get('/account/all', function (req, res) {
    dal.all().then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount/:message', function (req, res) {
    let amount = Number(req.params.amount);
    console.log("inside index...amount: ", amount)

    dal.transfer(req.params.email, amount, req.params.message)
        .then((response) => {
            console.log(response);
            res.send(response);
    });    
}); 

// get balance
app.get('/account/balance/:name/:email/:amount', function(req, res) {
    
    dal.deposit(req.params.name, req.params.email, req.params.amount)
        .then((user) => {
        console.log(user);
        res.send(user);
        });
});

// update balance
app.get('/account/balance/update/:email', function(req, res) {
    dal.update(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});


var port = 3030;
app.listen(process.env.PORT || port);
console.log('Running on port:' + port);