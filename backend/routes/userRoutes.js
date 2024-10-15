import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import { getUsersforSideBar, Getreceiver, getUserforMessageContainer } from "../controllers/userControllers.js";
router.get("/", protectRoute, getUsersforSideBar);
router.get("/loggedUser", protectRoute, getUserforMessageContainer);
router.get("/:id", protectRoute, Getreceiver);
export default router;
