// const bcrypt = require('bcrypt');
const RegisterModel = require("../../models/admin/Registermodel");
const nodemailer = require("nodemailer");

//LOGIN-LOGOUT/REGISTER
const RegisterUser = async (req, res) => {
  try {
    const adminCode = "admin123";
    const managerCode = "manager123";
    const userCode = Math.floor(Math.random() * 100);
    const { firstname, lastname, email, phone, password, cpassword, rolecode } =
      req.body;

    if (password !== cpassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }

    let roleName;
    if (rolecode === adminCode) {
      roleName = "Admin";
    } else if (rolecode === managerCode) {
      roleName = "Manager";
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid role code",
      });
    }

    const username = `${firstname}@${userCode}`;

    // Hash the password before storing it
    // const hashedPassword = await bcrypt.hash(password, 10);

    const register = await RegisterModel.create({
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      email,
      phone,
      password,
      username,
      role: roleName,
    });

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      register,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginAdminPenal = async (req, res) => {
  try {
    return res.status(200).send({
      success: true,
      message: "User Login!! Controller",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const LogoutAdmin = async (req, res) =>{
    try{
        req.logout((err) => {
            if (err) {
              console.log(err);
              return false;
            }
            console.log(`User Logout`);
            return res.status(200).send({
                success : true,
                message : `User Logout`
            })
          });
    } catch (err) {
        return res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
};

const UpdateRegister = async(req, res) => {
  try{
    let data = res.locals.users;
    let ID = data.id
    const { firstname, lastname } = req.body;
    let modified = await RegisterModel.findByIdAndUpdate(ID,{
      firstname : firstname, 
      lastname : lastname, 
      name : `${firstname} ${lastname}`,
      email : req.body.email, 
      phone : req.body.phone, 
    }, { new: true });

    return res.status(200).send({
      success : true,
      message : 'Register Update Successfully!'
    })
  }catch(err){
    return res.status(500).send({
      success : false,
      message : err
    })
  }
};

//FORGOT PASSWORD
const SendOtp = async(req, res)=>{
  try{
    let CheckEmail = await RegisterModel.findOne({email : req.body.useremail});
    console.log(CheckEmail);
    if(CheckEmail){
      let otp = Math.floor(Math.random()*10000);
      let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
          user : 'decora.evnt@gmail.com',
          pass : 'qtib rcyz jxkv neeb'
        }
      });

      let mailOptions = {
        from : 'decora.evnt@gmail.com',
        to : req.body.useremail,
        subject: `${CheckEmail.name} Your OTP`,
        html : `<html>
        <head>
            <style>
                /* Define your CSS styles here */
                .container {
                    text-align: center;
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .otp-image {
                    width: 200px;
                    height: auto;
                    border-radius: 10px;
                }
                .otp-text {
                    font-size: 24px;
                    color: #4e4e4e;
                    margin-top: 20px;
                    font-family: 'Arial', sans-serif;
                    font-weight: bold;
                }
                .otp-text span {
                    color: #ff007f;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7967.jpg?w=826&t=st=1709882232~exp=1709882832~hmac=491898f5088fc1993f735880e4287fcfb145799455ed5a31b93408d9379e048a" class="otp-image" alt="OTP Image">
                <p class="otp-text">Dear <span>${CheckEmail.name}</span>, Your OTP is: <span>${otp}</span></p>
            </div>
        </body>
    </html>
    `
      };

      transporter.sendMail(mailOptions, async (err)=>{
        if(err){
          console.log(err);
          return res.status(500).send({
            success : false,
            message : `Failed to send OTP email`
          });
        }
        res.cookie('otp',{
          otp : otp,
          email : req.body.useremail
        },{maxAge: 900000, httpOnly: true});
        console.log('OTP cookie set successfully');
        return res.status(200).send({
          success : true,
          message : `OTP Send on ${req.body.useremail}`,
          otp
        })
      })

    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const postOtp = async(req, res)=>{
  try{
    let userOtp = req.body.otp;
    if(req.cookies.otp.otp == userOtp){
      return res.status(200).send({
        success : true,
        message : `OTP is match Successfully`
      })
    }else{
      return res.status(500).send({
        success: false,
        message: `OTP is not match`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const newpassword = async(req, res)=>{
  try{
      const password = req.body.password;
      const cpassword = req.body.cpassword;

      if(password == cpassword){
        let Up = await RegisterModel.findOneAndUpdate({ email: req.cookies.otp.email }, {
          password: password
        });

        if(Up){
          return res.status(200).send({
            success : true,
            message : `Password Changed`
          })
        }
      }else{
        req.status(500).send({
          success: false,
          message: "Password is not changed",
        });
      }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports = {
  //LOGIN-LOGOUT/REGISTER
  RegisterUser,
  LoginAdminPenal,
  LogoutAdmin,
  UpdateRegister,

  //FORGOT PASSWORD
  SendOtp,
  postOtp,
  newpassword,
};
