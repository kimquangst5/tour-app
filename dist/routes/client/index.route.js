"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const tour_route_1 = __importDefault(require("./tour.route"));
const category_route_1 = __importDefault(require("./category.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const order_route_1 = __importDefault(require("./order.route"));
const index = (app) => {
    app.use("/tour", tour_route_1.default);
    app.use("/category", category_route_1.default);
    app.use("/cart", cart_route_1.default);
    app.use("/order", order_route_1.default);
};
exports.index = index;
