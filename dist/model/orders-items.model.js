"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
database_1.default;
const orderItemSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tour_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    timeStart: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
};
const Order_Item = database_1.default.define('Order_Item', orderItemSchema, {
    tableName: 'orders_item',
    timestamps: false
});
exports.default = Order_Item;
