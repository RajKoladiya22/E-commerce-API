const CategoryModel = require("../../models/admin/cetegorymodel");
const SubcategoryModel = require("../../models/admin/subcategorymodel");
const ProductModel = require("../../models/admin/productmodel");
const fs = require("fs");

//CATEGORY
const CreatCategory = async (req, res) => {
  try {
    const { category } = req.body;
    let CategoryData = await CategoryModel.create({
      category,
      category_icon: req.file.path,
    });

    return res.status(200).send({
      success: true,
      message: "Category Created",
      CategoryData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const ViewCategory = async (req, res) => {
  try {
    let Category = await CategoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "Category Data",
      Category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const EditCategory = async (req, res) => {
  try {
    let id = req.query.id;
    let SingleData = await CategoryModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Get Single Category By Id",
      SingleData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
      SingleData,
    });
  }
};
const UpdateCategory = async (req, res) => {
  try {
    let id = req.query.id;
    let Update = await CategoryModel.findByIdAndUpdate(id, {
      category: req.body.category,
      category_icon: req.file.path,
    });

    return res.status(200).send({
      success: true,
      message: "Category Updated",
      Update,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const DeleteCategory = async (req, res) => {
  try {
    let id = req.query.id;
    let CateImage = await CategoryModel.findById(id);
    fs.unlinkSync(CateImage.category_icon);
    let DeleteCategory = await CategoryModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Category Deleted",
      DeleteCategory,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

//SUBCATEGORY
const CreatSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategory } = req.body;
    let SubcategoryData = await SubcategoryModel.create({
      categoryId,
      subcategory,
    });

    return res.status(200).send({
      success: true,
      message: "Subcategory Added!!",
      SubcategoryData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const ViewSubcategory = async (req, res) => {
  try {
    let Category = await SubcategoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "Subategory Data",
      Category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const EditSubategory = async (req, res) => {
  try {
    let id = req.query.id;
    let SingleData = await SubcategoryModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Get Single Subcategory By Id",
      SingleData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
      SingleData,
    });
  }
};
const UpdateSubcategory = async (req, res) => {
  try {
    let id = req.query.id;
    let Update = await SubcategoryModel.findByIdAndUpdate(id, {
      categoryId: req.body.categoryId,
      subcategory: req.body.subcategory,
    });

    return res.status(200).send({
      success: true,
      message: "Category Updated",
      Update,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const DeleteSubcategory = async (req, res) => {
  try {
    let id = req.query.id;
    let DeleteSubcategory = await SubcategoryModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Subcategory Deleted",
      DeleteSubcategory,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

//PRODUCT
const AddProduct = async (req, res) => {
  try {
    const {
      categoryId,
      subcategoryId,
      PoductName,
      ProductType,
      Brand,
      Unit,
      Tags,
      Description,
      VideoProvider,
      VideoLink,
      OriginalPrice,
      CurrentPrice,
      Tax,
      Costperitem,
      ShippingPrice,
    } = req.body;

    const taxprice = CurrentPrice * (Tax / 100);
    const fprice = Number(CurrentPrice) + Number(taxprice);

    const ThumbnailImage = req.files["ThumbnailImage"][0].path;
    const Images = req.files["Images"].map((file) => file.path);

    console.log(taxprice);
    console.log(fprice);

    const ProductData = await ProductModel.create({
      categoryId,
      subcategoryId,
      PoductName,
      ProductType,
      Brand,
      Unit,
      Tags,
      Description,
      ThumbnailImage: ThumbnailImage,
      Images: Images,
      VideoProvider,
      VideoLink,
      OriginalPrice,
      CurrentPrice,
      Tax,
      FinalPrice: fprice,
      Costperitem,
      ShippingPrice,
    });

    return res.status(200).send({
      success: true,
      message: "Product Added!!",
      ProductData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
const ViewProduct = async (req, res) => {
  try {
    let Product = await ProductModel.find({});
    return res.status(200).send({
      success: true,
      message: "Product Data",
      Product,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};
const EditProduct = async (req, res) => {
    try {
      let id = req.query.id;
      let SingleData = await ProductModel.findById(id);
      return res.status(200).send({
        success: true,
        message: "Get Single Product By Id",
        SingleData,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err,
        SingleData,
      });
    }
  };

module.exports = {
  //CATEGORY
  CreatCategory,
  ViewCategory,
  EditCategory,
  UpdateCategory,
  DeleteCategory,
  //SUBCATEGORY
  CreatSubcategory,
  ViewSubcategory,
  EditSubategory,
  UpdateSubcategory,
  DeleteSubcategory,
  //PRODUCT
  AddProduct,
  ViewProduct,
  EditProduct,
};
