
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    shortDesc: String,
})

export default categorySchema;