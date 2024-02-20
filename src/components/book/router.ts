import express from "express";
import controller from "./controller";
const router = express.Router();

router.get("/subject", controller.getBookBySubject);
router.get("/:id", controller.getBookById);
router.get("/", controller.getBookByQuery);

export default router;
