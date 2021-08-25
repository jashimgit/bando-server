const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  shortDesc: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default categorySchema;
