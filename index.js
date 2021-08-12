const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// initialize port number
const port = process.env.PORT || 8000;

// middleware handler

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// mongo db url 

const url = '';

// connect with mongoDB via mongoose
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});





// root route handler

app.get('/', (req, res) => {
    res.send('Welcome to Bando server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
