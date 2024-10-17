"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
database_1.default;
const tourSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    images: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    information: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    schedule: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    timeStart: {
        type: sequelize_1.DataTypes.DATE,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
};
const Tour = database_1.default.define('Tour', tourSchema, {
    tableName: 'tour',
    timestamps: true
});
exports.default = Tour;
