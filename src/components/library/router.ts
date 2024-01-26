import { Router } from "express";
import controller from "./controller";
import { middlewares } from "../../middlewares/isAuth";
const router = Router();

router.get("/", middlewares.isAuthenticated, controller.getById);
router.post("/", middlewares.isAuthenticated, controller.create);

export default router;
