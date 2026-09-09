import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ProjectController from "../controllers/project.controller";

const router = Router();

router.post('/',authMiddleware,ProjectController.createProject);
router.get('/',authMiddleware,ProjectController.getProjects);
router.get('/:id',authMiddleware,ProjectController.getProjectById);
router.patch('/:id',authMiddleware,ProjectController.updateProject);
router.delete('/:id',authMiddleware,ProjectController.deleteProject);

export default router;