
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

require('dotenv').config();

// var {ObjectId } = require('mongodb');
const app = express();

// const mongoose = require('mongoose');


// initialize port number
const port = process.env.PORT || 8000;

// middleware handler

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// mongo db url 

const uri = `mongodb+srv://nodemongo:${process.env.DB_PASS}@cluster0.vewnd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



// mongo client initialization
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect( err => {
    if(err) throw err;
    const productCollection = client.db("bandoDB").collection("products");

    // /product POST

    app.post('/add-product', (req, res) => {
        const productData = req.body;
        productCollection.insertOne(productData)
        .then((result) => {
            res.send(result.insertedId);
        })
        .catch(err => res.status(500).json({error: err}))
    })

  
    // /product GET
    app.get('/products', (req, res) => {
        productCollection.find({})
        .toArray((err, doc) => {
            res.send(doc);
           
        })
    })

})


// error handler

function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error: err});
}



// root route handler

app.get('/', (req, res) => {
    res.send('Welcome to Bando server');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
