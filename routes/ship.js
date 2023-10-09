const express = require("express");
const router = express.Router();
const shipmentsController = require('../controllers/shipments');

router.get('/track', shipmentsController.trackShipment);


module.exports = router;
