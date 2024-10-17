import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import sequelize from "../../config/database";
import { QueryTypes, where } from "sequelize";

// [GET] /tour
export const index = async (req: Request, res: Response) => {
	res.render('client/pages/cart/index.pug')
};

export const cartPost = async (req: Request, res: Response) => {
	const listTour = req.body
	let sumPrice = 0
	for (const tour of listTour) {
		const findTour = await Tour.findOne({
			where: {
				id: tour.tourId,
				deleted: false,
				status: 'active'
			},
			raw: true
		})
		tour['title'] = findTour['title']
		tour['image'] = JSON.parse(findTour['images'])[0]
		tour['priceNew'] = findTour['price'] - (findTour['price'] * findTour['discount'] / 100)
		tour['totalPrice'] = parseInt(tour['quantity']) * parseInt(tour['priceNew'])
		sumPrice += parseInt(tour['totalPrice'])
	}
	res.json({
		code: 200,
		listTour: listTour,
		sumPrice: sumPrice
	})
}