const mongoose = require("mongoose");

const SubcategoryModel = mongoose.Schema({
  categoryId : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'category',
  },
  subcategory : {
    type: String,
    require: true,
  }
});

const subcategory = mongoose.model('subcategory', SubcategoryModel);

module.exports = subcategory;
