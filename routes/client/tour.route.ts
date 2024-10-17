import express from "express";
const router = express.Router();
import * as controller from "../../controller/client/tour.controller";


router.get("/:slugCategory", controller.index);

router.get("/detail/:slugTour", controller.detail);


export default router;