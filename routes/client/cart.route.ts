import express from "express";
const router = express.Router();
import * as controller from "../../controller/client/cart.controller";


router.get("/", controller.index);

router.post("/", controller.cartPost);


export default router;