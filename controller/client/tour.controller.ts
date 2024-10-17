import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import sequelize from "../../config/database";
import { QueryTypes, where } from "sequelize";
import moment from "moment";

// [GET] /tour
export const index = async (req: Request, res: Response) => {
	// SELECT * FROM tours WHERE deleted = false AND status = "active";
	// const tours = await Tour.findAll({
	// 	where: {
	// 		deleted: false,
	// 		status: "active"
	// 	},
	// 	raw: true
	// });
	// console.log(tours)
	if (req.params.slugCategory) {
		const slug = req.params.slugCategory
		const tours = await  sequelize.query(`
		SELECT tour.*, ROUND(price * (1 - discount/100)) AS price_special
		FROM tour
		JOIN tour_category ON tour.id = tour_category.tour_id
		JOIN category ON tour_category.category_id = category.id
		WHERE
			category.slug = '${slug}'
			AND category.deleted = false
			AND category.status = 'active'
			AND tour.deleted = false
			AND tour.status = 'active';	
		`, {

			type: QueryTypes.SELECT
		})
		tours.forEach(tour => {
			tour['price_special']  = parseInt(tour['price_special'])
			tour['image'] = JSON.parse(tour['images'])
		});
		res.render("client/pages/tour/index", {
			tours: tours
		});
	}
};

export const detail = async (req: Request, res: Response) => {
	if(req.params.slugTour){

		const slug = req.params.slugTour
		const tour = await Tour.findOne({
			where: {
				slug: slug,
				status: 'active',
				deleted: false
			},
			raw: true
		})
		tour['timeStartFormat'] = moment(tour['timeStart']).format('DD/MM/YYYY, hh:mm a');
		tour['priceNew'] = tour['price'] - (tour['price'] * tour['discount'] / 100)
		res.render("client/pages/tour/detail", {
			tour: tour
		});
	}
}