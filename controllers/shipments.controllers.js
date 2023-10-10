// import db config
const sequelize = require('../config/db_config');

// import model
const Shipment = require('../model/shipments.model');

// get shipments by waybill number
exports.getShipmentsByWaybillNumber = (req, res) => {
    // get waybill number from request params
    const { waybill_number } = req.params;

    // find shipment by waybill number
    Shipment.findOne({
        where: {
            waybill_number: waybill_number,
        },
    }).then((shipment) => {
        if (!shipment) {
            res.status(404).json({
                message: `Shipment with waybill number ${waybill_number} not found`,
            });
        } else {
            res.status(200).send({
                message: `Shipment with waybill number ${waybill_number} found`,
                data: shipment,
            });
        }
    }).catch((error) => {
        res.status(500).json({
            message: `Error retrieving shipment with waybill number ${waybill_number}`,
            error: error,
        });
    });
};