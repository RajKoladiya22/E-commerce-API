const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header.authorization;
    console.log(token);
    // if (!token) {
    //   return res.status(500).send({
    //     success: false,
    //     message: `Unauthorize access`,
    //   });
    // }
    // let NewToken = token.split(" ")[1];
    // console.log(NewToken);
    // jwt.verify(NewToken, "Abc1", (err, decode) => {
    //   if (err) {
    //     return res.status(500).send({
    //       success: false,
    //       message: `Token is not valid`,
    //     });
    //   }
    //   req.user = decode;
    //   return next();
    // });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};


module.exports = {
    verifyToken,
}