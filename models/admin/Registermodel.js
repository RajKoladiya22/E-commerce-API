const mongoose = require('mongoose');

const RegisterModel = mongoose.Schema({
    profile : {
        type : String,
        // require : true
    },
    username : {
        type : String,
        require : true
    },
    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    address : {
        type : Number,
        // require : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        // require : true
    },
});

const register = mongoose.model('register', RegisterModel);

module.exports = register;