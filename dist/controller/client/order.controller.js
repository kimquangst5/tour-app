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
exports.index = void 0;
const tour_model_1 = __importDefault(require("../../model/tour.model"));
const orders_model_1 = __importDefault(require("../../model/orders.model"));
const generate_helper_1 = require("./../../helper/generate.helper");
const orders_items_model_1 = __importDefault(require("../../model/orders-items.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = req.body.info.fullName;
    const phone = req.body.info.phone;
    const address = req.body.info.address;
    const note = req.body.info.note;
    const listCart = req.body.cart;
    const data = {
        code: '',
        fullName: fullName,
        phone: phone,
        address: address,
        note: note
    };
    const order = yield orders_model_1.default.create(data);
    const id = order.dataValues.id;
    yield orders_model_1.default.update({
        code: (0, generate_helper_1.generateOrderCode)(id)
    }, {
        where: {
            id: id
        },
    });
    let array = [];
    for (const cart of listCart) {
        const dataItem = {
            order_id: id,
            tour_id: cart.tourId,
            quantity: cart.quantity,
        };
        const tourId = cart.tourId;
        const tour = yield tour_model_1.default.findOne({
            where: {
                id: tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        });
        dataItem['price'] = tour['price'];
        dataItem['discount'] = tour['discount'];
        dataItem['timeStart'] = tour['timeStart'];
        console.log(dataItem);
        array.push(dataItem);
    }
    for (const it of array) {
        yield orders_items_model_1.default.create(it);
    }
    res.json({
        code: 200
    });
});
exports.index = index;
