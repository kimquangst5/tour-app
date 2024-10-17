import express from "express";
const router = express.Router();
import * as controller from "../../controller/client/order.controller";


router.post("/", controller.index);



export default router;