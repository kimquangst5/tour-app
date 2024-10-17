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
exports.cartPost = exports.index = void 0;
const tour_model_1 = __importDefault(require("../../model/tour.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/cart/index.pug');
});
exports.index = index;
const cartPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTour = req.body;
    let sumPrice = 0;
    for (const tour of listTour) {
        const findTour = yield tour_model_1.default.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        });
        tour['title'] = findTour['title'];
        tour['image'] = JSON.parse(findTour['images'])[0];
        tour['priceNew'] = findTour['price'] - (findTour['price'] * findTour['discount'] / 100);
        tour['totalPrice'] = parseInt(tour['quantity']) * parseInt(tour['priceNew']);
        sumPrice += parseInt(tour['totalPrice']);
    }
    res.json({
        code: 200,
        listTour: listTour,
        sumPrice: sumPrice
    });
});
exports.cartPost = cartPost;
