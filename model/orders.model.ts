import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Import file database
sequelize; // Khởi tạo database

// const Tour = mongoose.model('Tour', {}, '')
const orderSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	code: {
		type: DataTypes.STRING(10),
		allowNull: false,
	},
	fullName: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING(10),
	},
	note: {
		type: DataTypes.STRING(500),
	},
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active', // Đặt giá trị mặc định là active
	},
	deleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false, // Đặt giá trị mặc định là false
	},
	deletedAt: {
		type: DataTypes.DATE,
	},
	createdAt: {
		type: DataTypes.DATE,
	},
	updatedAt: {
		type: DataTypes.DATE,
	}
}
const Order = sequelize.define('Order', orderSchema, {
	tableName: 'orders',
	timestamps: true
});

export default Order;