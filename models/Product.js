const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // unique id mongoose id adds
    required: true,
  },
  productName: String,
  productPrice: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", productSchema);
