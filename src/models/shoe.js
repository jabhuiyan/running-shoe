const { Number } = require("mongoose");
const mongoose = require("mongoose");

let shoeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  type: String,
  gender: String,
  size: String,
  color: String,
  material: String,
  price: Number,
  rating: Number,
});

shoeSchema.index({ "brand": "text", "model": "text" });

module.exports = mongoose.model("Shoe", shoeSchema);
