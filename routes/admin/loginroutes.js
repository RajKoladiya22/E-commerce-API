const express = require('express');

const routes = express.Router();

const LoginController = require('../../controller/admin/logincontroller');
const multer = require('multer');
const passport = require('passport');


const uploadFile = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb)=>{
            cb(null, 'uploads/userimage')
        },
        filename : (req, file, cb)=>{
            let img = Date.now() + file.originalname;
            cb(null, img);
        }
    })
}).single('profile')

//LOGIN-LOGOUT/REGISTER
routes.post('/registeradmin', uploadFile, LoginController.RegisterUser);
routes.post('/loginadmin', passport.authenticate('local',{failureRedirect : '/categorydata'}),LoginController.LoginAdminPenal);
routes.get('/logout', LoginController.LogoutAdmin);
routes.post('/UpdateRegister', LoginController.UpdateRegister);

//FORGOT PASSWORD
routes.post('/sendotp',LoginController.SendOtp);
routes.post('/postotp',LoginController.postOtp);
routes.put('/newpassword',LoginController.newpassword);

module.exports = routes;