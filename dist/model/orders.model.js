"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
database_1.default;
const orderSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    note: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    status: {
        type: sequelize_1.DataTypes.STRING(10),
        defaultValue: 'active',
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
};
const Order = database_1.default.define('Order', orderSchema, {
    tableName: 'orders',
    timestamps: true
});
exports.default = Order;
