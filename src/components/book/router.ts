import express from "express";
import controller from "./controller";
const router = express.Router();

router.get("/best", controller.bestSellers);
router.get("/search", controller.searchBook);
router.get("/search/subject", controller.searchBooksBySubject);

export default router;
