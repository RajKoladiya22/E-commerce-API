const mongoose = require("mongoose");

const CategoryModel = mongoose.Schema({
  category : {
    type: String,
    require: true,
  },
  category_icon : {
    type: String,
    require: true,
  }
});

const category = mongoose.model('category', CategoryModel);

module.exports = category;
