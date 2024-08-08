import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAreas, createArea} from "../controllers/area.controller.js";

const router = express.Router();

router.get("/",  getAreas);
router.post("/", createArea);

export default router;
