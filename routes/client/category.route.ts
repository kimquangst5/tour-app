import express from "express";
const router = express.Router();
import * as controller from "../../controller/client/category.controller";


router.get("/", controller.index);


export default router;