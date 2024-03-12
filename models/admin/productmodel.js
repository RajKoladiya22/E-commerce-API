const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
  PoductName: {
    type: String,
    require: true,
  },
  ProductType: {
    type: String,
  },
  Brand: {
    type: String,
  },
  Unit: {
    type: String,
    require: true,
  },
  Tags: {
    type: String,
  },
  Exchangeable: {
    type: Number,
    default: 1,
  },
  Refundable: {
    type: Number,
    default: 1,
  },
  Description: {
    type: String,
    require: true,
  },
  ThumbnailImage: {
    type: String,
    require: true,
  },
  Images: {
    type: Array,
    require: true,
  },
  VideoProvider: {
    type: String,
    require: true,
  },
  VideoLink: {
    type: String,
    require: true,
  },
  OriginalPrice: {
    type: Number,
    require: true,
  },
  CurrentPrice: {
    type: Number,
    require: true,
  },
  Tax: {
    type: Number,
    require: true,
  },
  FinalPrice: {
    type: Number,
    require: true,
  },
  Costperitem: {
    type: Number,
    require: true,
  },
  ShippingPrice: {
    type: Number,
    require: true,
  },
  StockStatus: {
    type: Number,
    default: 1,
  },
  Status: {
    type: Number,
    default: 1,
  },
});

const product = mongoose.model("product", ProductModel);

module.exports = product;
