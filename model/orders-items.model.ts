import { DataTypes, ForeignKeyConstraintError } from 'sequelize';
import sequelize from '../config/database'; // Import file database
import { timeStamp } from 'console';
sequelize; // Khởi tạo database

// const Tour = mongoose.model('Tour', {}, '')
const orderItemSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	order_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	tour_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
	price: {
		type: DataTypes.INTEGER,
	},
	discount: {
		type: DataTypes.INTEGER,
	},
	timeStart: {
		type: DataTypes.DATE,
		allowNull: false,
	},
}
const Order_Item = sequelize.define('Order_Item', orderItemSchema, {
	tableName: 'orders_item',
	timestamps: false // khác với các bảng khc // thật lưu ý
});

export default Order_Item;