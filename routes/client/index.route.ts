import { Express } from "express";

import tour from "./tour.route";
import category from "./category.route";
import cart from "./cart.route";
import order from "./order.route";

export const index = (app: Express) => {
  app.use("/tour", tour);
  app.use("/category", category);
  app.use("/cart", cart);
  app.use("/order", order);
}