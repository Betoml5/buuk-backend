import { Router } from "express";
import controller from "./controller";

const router = Router();
router.post("/login", controller.login);
router.post("/refresh-token", controller.generateRefreshToken);
// router.post("/forgot-password", controller.forgotPassword);
// router.put("/change-password", controller.resetPassword);

export default router;
