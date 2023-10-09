const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const router = express.Router();
const frontendDirectory = path.join(__dirname, '../../FE-Palembang-17'); // Adjust relative path as needed

router.use(express.static(frontendDirectory));

router.get("/", (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.sendFile(path.join(frontendDirectory, 'login.html'));
});

router.get("/register.html", (req, res) => {
    res.sendFile(path.join(frontendDirectory, 'register.html'));
});

router.get("/login.html", (req, res) => {
    // Kirim halaman login
    res.sendFile(path.join(frontendDirectory, 'login.html'));
});

router.get("/auth/login.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'shipping_rates.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});


router.get("/auth/shipping_rates.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'shipping_rates.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});

router.get("/auth/tracking.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'tracking.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});


router.get("/auth/find_drop_point.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'find_drop_point.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});

router.get("/auth/order.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'order.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});


router.get("/auth/services.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'services.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});


router.get("/auth/about_us.html", (req, res) => {
    res.sendFile(path.join(frontendDirectory, 'about_us.html'));
});

router.get("/auth/home.html", (req, res, next) => {
    if (!req.session.user) {
        // Jika pengguna belum login, arahkan kembali ke halaman login
        res.redirect("/login.html");
    } else {
        next(); // Lanjutkan ke pemrosesan selanjutnya jika pengguna sudah login
    }
}, (req, res) => {
    let userLoggedIn = true;
    let username = req.session.user.name;
    let userEmail = req.session.user.email;

    const homeFilePath = path.join(frontendDirectory, 'home.html');

    ejs.renderFile(homeFilePath, { userLoggedIn, username, userEmail }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});


router.get("/auth/information_faq.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'information_faq.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});

router.get("/auth/information_terms.html", (req, res) => {
    let userLoggedIn = false;
    let username = null;
    let userEmail = null;

    if (req.session.user) {
        userLoggedIn = true;
        username = req.session.user.name;
        userEmail = req.session.user.email;
    }

    const orderFilePath = path.join(frontendDirectory, 'information_terms.html');

    ejs.renderFile(orderFilePath, { userLoggedIn, username }, (err, data) => {
        if (err) {
            console.error("Error rendering HTML:", err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
});

router.get("/authpersonal_info.html", (req, res) => {
    res.sendFile(path.join(frontendDirectory, 'personal_info.html'));
    // Render the personal info page with user data
    // res.render('personal_info', { username: user.name, userEmail: user.email });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.redirect('/login.html');
    });
  });
  



module.exports = router;
