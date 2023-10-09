const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path"); // Add this line
const ejs = require("ejs"); // Add this line
dotenv.config();


const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
});

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;
    mysqlConnection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            // Handle email already in use
            return ejs.renderFile(path.join(__dirname, "../../FE-Palembang-17/register.html"), {
                message: 'That email is already in use'
            }, (err, data) => {
                if (err) {
                    console.error("Error rendering HTML:", err);
                    return res.status(500).send('Internal Server Error');
                }
                res.send(data);
            });
        }
        // Continue with registration logic that involves await
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        mysqlConnection.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Internal Server Error');
            } else {
                return ejs.renderFile(path.join(__dirname, "../../FE-Palembang-17/register.html"), {
                    message: 'Registered user, please log in.'
                }, (err, data) => {
                    if (err) {
                        console.error("Error rendering HTML:", err);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.send(data);
                });
            }
        });
    });
}

exports.login = (req, res) => {
    const { name, password } = req.body;

    mysqlConnection.query('SELECT * FROM users WHERE name = ?', [name], async (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            return res.status(500).send('Internal Server Error');
        }
        
        if (results.length === 0) {
            // User not found
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Invalid password
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Define user-related variables
        const userLoggedIn = true;
        const username = user.name;
        const userEmail = user.email;

        // Store user data in the session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        // Create and return a JWT token for authenticated user
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Adjust token expiration as needed
        });

        ejs.renderFile(path.join(__dirname, "../../FE-Palembang-17/home.html"), { userLoggedIn, username, userEmail }, (err, data) => {
            if (err) {
                console.error("Error rendering HTML:", err);
                return res.status(500).send('Internal Server Error');
            }
            res.send(data);
        });        
    });
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/'); // Redirect to login page
    });
}
