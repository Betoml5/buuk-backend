import { Router } from "express";
import controller from "./controller";
const router = Router();

router.post("/", controller.create);
router.get("/", controller.getById);

export default router;