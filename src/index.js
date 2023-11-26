const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const { MongoClient } = require('mongodb'); // Import MongoClient from the MongoDB package

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Create a MongoDB client and connect to the database
const mongoUrl = 'mongodb://localhost:27017/myproject';
const dbName = 'myproject';
let db; // Define the database connection

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName); // Set the database connection object
});

// create user account
app.post('/account/create', function(req, res) {
  const { name, email, password } = req.body;
  
  // Check if the email is already in use
  dal.findOne(email).then((user) => {
    if (user) {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      dal.create(name, email, password)
        .then((newUser) => {
          console.log('New user:', newUser);
          res.status(201).json(newUser);
        });
    }
  });
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.findOne(req.params.email).then(user => {
            console.log("inside app.get", JSON.stringify(user));
            console.log(JSON.stringify(user).length)
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

// find all accounts
app.get('/account/allData', function (req, res) {
    dal.all().then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

// balance
app.get('/api/usercontext/:email', async (req, res) => {
    try {
      const collection = db.collection('users');
      const userEmail = req.params.email;
  
      const user = await collection.findOne({ email: userEmail });
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ balance: user.balance });
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ error: 'An error occurred while fetching balance' });
    }
  });

  //update balance
  app.post('/api/usercontext/updateBalance', async (req, res) => {
    const { email, newBalance } = req.body;
  
    try {
      const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
      const db = client.db(dbName);
  
      const collection = db.collection('users');
      const user = await collection.findOne({ email });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        user.balance = newBalance;
        await collection.updateOne({ _id: ObjectID(user._id) }, { $set: user });
        res.json({ message: 'Balance updated successfully' });
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      res.status(500).json({ error: 'An error occurred while updating balance' });
    }
  });
  

var port = 3030;
app.listen(process.env.PORT || port);
console.log('Running on port:' + port);
