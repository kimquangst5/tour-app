import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
	'tour_management', // Tên database
	'root', // usename
	'', // Password
	{
		host: 'localhost', // localhost or 127.0.0.1
		dialect: 'mysql'
	}
);

sequelize.authenticate()
.then(() => {
	console.log(`Kết nối databse thành công!`)
})
.catch((error) => {
	console.log(`Kết nối databse thất bại!`, error)
})

export default sequelize;