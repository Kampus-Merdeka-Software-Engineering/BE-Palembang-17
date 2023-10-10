// import sequelize
const { Sequelize, DataTypes } = require('sequelize');

// import db config
const sequelize = require('../config/db_config');

// create model
const Shipment = sequelize.define('shipments', {
    shipment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    waybill_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
});

// export model
module.exports = Shipment;