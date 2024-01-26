import express from "express";
import controller from "./controller";
const router = express.Router();

router.get("/", controller.getBookByQuery);
router.get("/subject", controller.getBookBySubject);

export default router;
