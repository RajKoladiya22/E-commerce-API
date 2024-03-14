const CategoryModel = require("../../models/admin/cetegorymodel");
const SubcategoryModel = require("../../models/admin/subcategorymodel");
const ProductModel = require("../../models/admin/productmodel");
const fs = require("fs");
const axios = require('axios');

const FirstPage = async (req, res) => {
  res.status(200).json({
    message: "Welcome to my API World Please Login",
  });
};

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

    const ThumbnailImage =
      req.files["ThumbnailImage"] && req.files["ThumbnailImage"].length > 0
        ? req.files["ThumbnailImage"][0].path
        : null;
    const Images = req.files["Images"].map((file) => file.path);

    const ProductData = await ProductModel.create({
      categoryId,
      subcategoryId,
      PoductName,
      ProductType,
      Brand,
      Unit,
      Tags,
      Description,
      ThumbnailImage: `github.com/RajKoladiya22/E-commerce-API/blob/main/${ThumbnailImage}`,
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
const UpdateProduct = async (req, res) => {
  try {
    let id = req.query.id;

    if (req.file || req.files) {
      let DelImg = await ProductModel.findById(id);

      // Check if ThumbnailImage exists and delete it
      if (DelImg && DelImg.ThumbnailImage) {
        await fs.unlink(DelImg.ThumbnailImage);
      }

      // Check if Images exist and delete them
      if (DelImg && DelImg.Images && Array.isArray(DelImg.Images)) {
        await Promise.all(DelImg.Images.map(async (image) => {
          await fs.unlink(image);
        }));
      }
    }
    

    // Extract product data from the request body
    const {
      CurrentPrice,
      Tax,
    } = req.body;

    const taxprice = CurrentPrice * (Tax / 100);
    const fprice = Number(CurrentPrice) + Number(taxprice);

    // Check if files were uploaded before accessing them
    const ThumbnailImage = req.files && req.files["ThumbnailImage"] ? req.files["ThumbnailImage"][0].path : null;
    const Images = req.files && req.files["Images"] ? req.files["Images"].map((file) => file.path) : [];

    // Update product data in the database
    let Update = await ProductModel.findByIdAndUpdate(id, {
      categoryId :req.body.categoryId,
      subcategoryId :req.body.subcategoryId,
      PoductName :req.body.PoductName,
      ProductType :req.body.ProductType,
      Brand :req.body.Brand,
      Unit :req.body.Unit,
      Tags :req.body.Tags,
      Description :req.body.Description,
      ThumbnailImage: ThumbnailImage,
      Images: Images,
      VideoProvider :req.body.VideoProvider,
      VideoLink :req.body.VideoLink,
      OriginalPrice :req.body.OriginalPrice,
      CurrentPrice :req.body.CurrentPrice,
      Tax :req.body.Tax,
      FinalPrice: fprice,
      Costperitem :req.body.Costperitem,
      ShippingPrice :req.body.ShippingPrice,
    });

    return res.status(200).send({
      success: true,
      message: "Product Updated",
      Update,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};


const IndexPage = async(req, res)=>{
  try{
    let rec = await axios.get('https://raj-api.vercel.app/productdata');
    let pro = rec.data.Product;
    console.log(pro);
    return res.render('index',{pro});
  }catch(err){
    console.log(err);
    return false;
  }
}

module.exports = {
  FirstPage,
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
  UpdateProduct,

  IndexPage,
};
