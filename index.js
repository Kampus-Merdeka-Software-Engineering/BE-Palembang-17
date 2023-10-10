// Import expressjs
const express = require('express');
const app = express();

// Import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import cors
const cors = require('cors');
app.use(cors({credentials: true, origin: true}));

// Import dotenv
const dotenv = require('dotenv');
dotenv.config();

// import session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// session store
const sessionStore = new MySQLStore({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    clearExpired: true,
    checkExpirationInterval: 900000, // Interval pengecekan kedaluwarsa sesi dalam milidetik
});

// use session
app.use(session({
    secret: process.env.SECRETKEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 900000, // Maksimal umur cookie dalam milidetik
    },
}));

// Listen to port 3000 by default
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server berjalan di port ${port}`);
});

// import routes
const shipmentsRoutes = require('./routes/shipments.routes');
const usersRoutes = require('./routes/users.routes');
const apiRoutes = require('./routes/api.routes');

// define routes
app.use('/shipments', shipmentsRoutes);
app.use('/users', usersRoutes);
app.use('/api', apiRoutes);

// handle non-existing routes
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});