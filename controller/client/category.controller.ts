import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import Category from "../../model/category.model";

// [GET] /tour
export const index = async (req: Request, res: Response) => {
	// SELECT * FROM tours WHERE deleted = false AND status = "active";
	const categories= await Category.findAll({
		where: {
			deleted: false,
			status: "active"
		},
		raw: true
	});
	res.render("client/pages/category/index", {
		categories: categories
	});
};