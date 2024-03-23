import express from "express";
import controller from "./controller";
import { middlewares } from "../../middlewares/isAuth";
import encrypt from "../../middlewares/encrypt";

const router = express.Router();
// #swagger.tags = ['User']
router.get("/me", middlewares.isAuthenticated, controller.me);
router.get(
    "/recommended",
    middlewares.isAuthenticated,
    controller.getRecommendations
);
router.get("/library", middlewares.isAuthenticated, controller.getLibraryData);
router.post("/", encrypt, controller.create);
router.get("/:id", controller.getById);
router.get("/", controller.get);
router.put("/", middlewares.isAuthenticated, controller.update);
router.delete("/:id", middlewares.isAuthenticated, controller.deleteOne);

// router.patch(
//     "/timeline",
//     middlewares.isAuthenticated,
//     controller.addTimelineItem
// );
// router.post("/library", middlewares.isAuthenticated, controller.addToLibrary);
// router.delete(
//     "/library",
//     middlewares.isAuthenticated,
//     controller.removeFromLibrary
// );

export default router;
