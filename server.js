const express = require('express');
const db = require('./config/db');
const path = require('path');
const passport= require('passport');
const passportstretegy = require('./config/passportstretegy');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const port = process.env.port || 2105;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());


app.use(session({
    name : 'Abc',
    secret : 'Abc@123',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use((req, res, next) => {
    res.set({'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0'});
    next();
});



app.use('/upload', express.static(path.join(__dirname,'uploads')));
app.use('/',require('./routes/admin/indexroutes'));
app.use('/',require('./routes/admin/loginroutes'));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is start on : ${port}`);
})