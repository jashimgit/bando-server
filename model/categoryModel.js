const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,
    shortDesc: String
})

module.exports = mongoose.model('category', CategorySchema);