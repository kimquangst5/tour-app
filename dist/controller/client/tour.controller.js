"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../model/tour.model"));
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.slugCategory) {
        const slug = req.params.slugCategory;
        const tours = yield database_1.default.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
        tours.forEach(tour => {
            tour['price_special'] = parseInt(tour['price_special']);
            tour['image'] = JSON.parse(tour['images']);
        });
        res.render("client/pages/tour/index", {
            tours: tours
        });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.slugTour) {
        const slug = req.params.slugTour;
        const tour = yield tour_model_1.default.findOne({
            where: {
                slug: slug,
                status: 'active',
                deleted: false
            },
            raw: true
        });
        tour['timeStartFormat'] = (0, moment_1.default)(tour['timeStart']).format('DD/MM/YYYY, hh:mm a');
        tour['priceNew'] = tour['price'] - (tour['price'] * tour['discount'] / 100);
        res.render("client/pages/tour/detail", {
            tour: tour
        });
    }
});
exports.detail = detail;
