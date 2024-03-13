    const mongoose = require('mongoose');

    // mongoose.connect("mongodb://localhost:27017/FastKartAPI");
    mongoose.connect(`mongodb+srv://Raj:uq5rMhO1FfkLkOU3@cluster0.fvudrsz.mongodb.net/API`);


    const db = mongoose.connection;

    db.on("connected",(err)=>{
        if(err){
            console.log(`db is not connected`);
            return false;
        }
        console.log(`db is connected`);
    })

    module.exports = db;