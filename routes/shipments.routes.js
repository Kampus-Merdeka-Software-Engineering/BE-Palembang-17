// import expressjs
const express = require('express');

// define router
const router = express.Router();

// import controller
const shipmentsController = require('../controllers/shipments.controllers');

// define routes
router.get('/:waybill_number', shipmentsController.getShipmentsByWaybillNumber);

// export router
module.exports = router;