import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import { getUsersforSideBar } from "../controllers/userControllers.js";

router.get("/", protectRoute, getUsersforSideBar);

export default router;
