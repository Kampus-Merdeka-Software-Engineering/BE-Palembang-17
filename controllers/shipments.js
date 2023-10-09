const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

function trackShipment(req, res) {
    const waybill = req.query.waybill;

    const query = `SELECT status, recipient FROM shipments WHERE waybill_number = ?`;

    mysqlConnection.query(query, [waybill], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (rows.length > 0) {
            const status = rows[0].status;
            res.json({ status });
        } else {
            res.json({ status: 'Not Found' });
        }
    });
}

module.exports = { trackShipment };
