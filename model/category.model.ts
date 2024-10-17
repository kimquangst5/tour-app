import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Import file database
sequelize; // Khởi tạo database

// const Tour = mongoose.model('Tour', {}, '')
const categorySchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	title: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	image : {
		type: DataTypes.STRING(500),
	},
	description : {
		type: DataTypes.TEXT('long'),
	},
	status: {
		type: DataTypes.STRING(20),
		defaultValue: 'active', // Đặt giá trị mặc định là active
	},
	position: {
		type: DataTypes.INTEGER,
	},
	slug: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true
	},
	deleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false, // Đặt giá trị mặc định là false
	},
	deletedAt: {
		type: DataTypes.DATE,
	},
	createdAt : {
		type: DataTypes.DATE,
	},
	updatedAt : {
		type: DataTypes.DATE,
	},
}
const Category = sequelize.define('Category', categorySchema, {
	tableName: 'category',
	timestamps: true
});

export default Category;