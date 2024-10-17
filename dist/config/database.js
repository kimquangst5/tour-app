"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('tour_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate()
    .then(() => {
    console.log(`Kết nối databse thành công!`);
})
    .catch((error) => {
    console.log(`Kết nối databse thất bại!`, error);
});
exports.default = sequelize;
