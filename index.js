const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require('cors');
const session = require("express-session");
const { fileURLToPath } = require('url');
const path = require("path");
const pagesRouter = require('./routes/pages.js');
const apiRouter = require('./routes/api.js');
const authRouter = require('./routes/auth.js');
const shipRouter = require('./routes/ship');




const app = express();
dotenv.config({ path: './.env' });
// Set mesin template EJS
app.set('view engine', 'ejs');



// Middleware untuk memeriksa status login pengguna
function checkAuthentication(req, res, next) {
    if (req.session && req.session.user) {
        // Pengguna sudah masuk, lanjutkan permintaan
        return next();
    } else {
        // Pengguna belum masuk, arahkan ke halaman login
        res.redirect('/login.html');
    }
}

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
});

console.log(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Menggunakan middleware
app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'your-secret-key', // Change this to a strong, random value
    resave: false,
    saveUninitialized: true
}));

mysqlConnection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
});

app.use('/', pagesRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/ship', shipRouter);

app.listen(5000, () => {
    console.log('Server up and running...');
});
