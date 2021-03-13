const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  origPrice: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  shipping: {
    type: Boolean,
    required: true,
  },
  pickup: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
