import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ProjectController from "../controllers/project.controller";

const router = Router();

router.post('/',authMiddleware,ProjectController.createProject);
router.get('/',authMiddleware,ProjectController.getProjects);
router.get('/:id',authMiddleware,ProjectController.getProjectById);

export default router;