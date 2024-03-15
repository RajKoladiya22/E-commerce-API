const express = require('express');

const routes = express.Router();

const ApiController = require('../../controller/admin/apicontroller');
const multer = require('multer');
const passport = require('passport');
const { verifyToken } = require('../../middleware/Auth')

//CATEGORY
const uploadFile = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb)=>{
            cb(null, 'uploads/catecoryimage')
        },
        filename : (req, file, cb)=>{
            let img = Date.now() + file.originalname;
            cb(null, img);
        }
    })
}).single('category_icon')

//PRODUCT
const productfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/productimage');
        },
        filename: (req, file, cb) => {
            let img = Date.now() + "-" + file.originalname;
            cb(null, img);
        },
    }),
}).fields([
    { name: 'ThumbnailImage', maxCount: 1 },
    { name: 'Images', maxCount: 5 }
]);


//CATEGORY
routes.get('/',uploadFile, ApiController.FirstPage);
routes.post('/creatcategory',uploadFile, ApiController.CreatCategory);
routes.get('/categorydata',ApiController.ViewCategory);
routes.get('/editcategory', ApiController.EditCategory);
routes.put('/updatecategory',uploadFile, ApiController.UpdateCategory);
routes.delete('/deletecategory', ApiController.DeleteCategory);

//SUBCATEGORY
routes.post('/creatsubcategory', ApiController.CreatSubcategory);
routes.get('/subcategorydata', ApiController.ViewSubcategory);
routes.get('/editsubcategory', ApiController.EditSubategory);
routes.put('/updatesubcategory', ApiController.UpdateSubcategory);
routes.delete('/deletesubcategory', ApiController.DeleteSubcategory);

//PRODUCT
routes.post('/addproduct',productfile, ApiController.AddProduct);
routes.get('/productdata', ApiController.ViewProduct);
routes.get('/editproduct', ApiController.EditProduct);
routes.put('/updateproduct',productfile, ApiController.UpdateProduct);


routes.get('/index',ApiController.IndexPage);
routes.post('/add',ApiController.ADD);


module.exports = routes;