const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  shortDesc: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory"
    }
  ],
});

export default categorySchema;
