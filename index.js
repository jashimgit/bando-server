
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();
// var {ObjectId } = require('mongodb');
const app = express();

// initialize port number
const port = process.env.PORT || 8000;


// middleware handler

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

const uri = `mongodb+srv://nodemongo:${process.env.DB_PASS}@cluster0.vewnd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('Connected to DB'))
.catch((e) => console.log(e))


// user login/ registration routes
app.use('/auth', userRoutes);
// category route
app.use('/category', categoryRoutes)

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
