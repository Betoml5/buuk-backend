import { Router } from "express";
import controller from "./controller";
import { middlewares } from "../../middlewares/isAuth";
const router = Router();

router.post("/", middlewares.isAuthenticated, controller.create);
router.get("/", middlewares.isAuthenticated, controller.getById);

export default router;
