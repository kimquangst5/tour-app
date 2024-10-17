import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import sequelize from "../../config/database";
import { QueryTypes, where } from "sequelize";
import Order from "../../model/orders.model";
import { generateOrderCode } from "./../../helper/generate.helper";
import Order_Item from "../../model/orders-items.model";

// [GET] /order
export const index = async (req: Request, res: Response) => {
	const fullName = req.body.info.fullName
	const phone = req.body.info.phone
	const address = req.body.info.address
	const note = req.body.info.note
	const listCart = req.body.cart
	const data = {
		code: '',
		fullName: fullName,
		phone: phone,
		address: address,
		note: note
	}

	const order = await Order.create(data)

	const id = order.dataValues.id 			//orderId
	await Order.update({
		code: generateOrderCode(id)
	}, {
		where: {
			id: id
		},
	})

	let array = []
	for (const cart of listCart) {
		const dataItem = {
			order_id: id,
			tour_id: cart.tourId,
			quantity: cart.quantity,
		}
		const tourId = cart.tourId
		const tour =  await Tour.findOne({
			where: {
				id: tourId,
				deleted: false,
				status: 'active'
			},
			raw: true
		})
		dataItem['price'] = tour['price']
		dataItem['discount'] = tour['discount']
		dataItem['timeStart'] = tour['timeStart']
		console.log(dataItem)
		array.push(dataItem)
		// await Order_Item.create(dataItem)
	}
	
	for (const it of array) {
		await Order_Item.create(it)
	}
	
	res.json({
		code: 200
	})
};