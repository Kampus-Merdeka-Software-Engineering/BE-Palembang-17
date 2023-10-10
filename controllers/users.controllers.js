// import bcrypt
const bcrypt = require('bcryptjs');

// import db config
const sequelize = require('../config/db_config');

// import model
const User = require('../model/users.model');

// register user with confirmation password
exports.registerUser = (req, res) => {
    // get user data from request body
    const { name, email, password, confirm_password } = req.body;

    // check if password and confirm password match
    if (password !== confirm_password) {
        res.status(400).json({
            message: 'Password and confirm password does not match',
        });
    } else {
        // find user by email
        User.findOne({
            where: {
                email: email,
            },
        }).then((user) => {
            // if user exists
            if (user) {
                res.status(400).json({
                    message: 'User already exists',
                });
            } else {
                // hash password
                let hashedPassword = bcrypt.hashSync(password, 8);

                // create new user
                User.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                }).then((user) => {
                    res.status(201).json({
                        message: 'User created successfully',
                        data: user,
                    });
                }).catch((error) => {
                    res.status(500).json({
                        message: 'Something went wrong',
                        error: error,
                    });
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: 'Something went wrong',
                error: error,
            });
        });
    }
};

// login user with email and password and save session
exports.loginUser = (req, res) => {
    // get user data from request body
    const { email, password } = req.body;

    // find user by email
    User.findOne({
        where: {
            email: email,
        },
    }).then((user) => {
        // if user exists
        if (user) {
            // compare password
            let isPasswordMatch = bcrypt.compareSync(password, user.password);

            // if password match
            if (isPasswordMatch) {
                // save user data in session
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };

                req.session.save();

                res.status(200).json({
                    message: 'Login success',
                    data: req.session.user,
                });
            } else {
                res.status(400).json({
                    message: 'Wrong password',
                });
            }
        } else {
            res.status(400).json({
                message: 'User not found',
            });
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error,
        });
    });
};

// logout user and destroy session
exports.logoutUser = (req, res) => {
    // destroy session
    req.session.destroy();

    res.status(200).json({
        message: 'Logout success',
    });
};