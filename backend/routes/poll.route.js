import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createPoll, getPollById, getPolls, voteonPoll } from "../controllers/polls.controller.js";


const router = express.Router();

router.post("/create", protectRoute, createPoll);
router.get("/",protectRoute, getPolls);
router.get("/:id", protectRoute, getPollById);
router.post("/:id/:optionId", protectRoute, voteonPoll)

export default router;