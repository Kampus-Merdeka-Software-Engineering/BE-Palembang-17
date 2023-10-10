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
const { CyclicSessionStore } = require("@cyclic.sh/session-store");

// session store
const options = {
    table: {
      name: process.env.CYCLIC_DB,
    },
    keepExpired: false, 
    touchInterval: 30000, // milliseconds (30 seconds)
    ttl: 86400000 // milliseconds (1 day)
};
  
app.use(session({
    secret: process.env.SECRETKEY,
    store: new CyclicSessionStore(options),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000, // milliseconds (1 day)
    },
}));

// Listen to port 3000 by default
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log('Server berjalan di port ${port})';
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