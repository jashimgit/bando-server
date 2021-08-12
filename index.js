
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


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

// connect with mongoDB via mongoose
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});





// root route handler

app.get('/', (req, res) => {
    res.send('Welcome to Bando server');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
