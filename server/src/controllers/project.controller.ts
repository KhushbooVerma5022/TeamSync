import Project from "../models/project.model";
import { Request, Response } from 'express';

class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const { id } = req.user

            const projectCreated = new Project({
                name,
                description,
                owner: id,
                members: [
                    {
                        user: id,
                        role: 'owner'
                    }
                ]
            })

            const saved = await projectCreated.save()

            res.status(201).json({message: 'Project created successfully', project: saved})

        } catch (error) {
            res.status(500).json({ message: 'Project creation failed' })
        }
    }

    static getProjects = async (req: Request, res: Response) => {
        try {
            
            const { id } = req.user;

            const projects = await Project.find({
                $or: [
                    { owner: id },
                    { 'members.user': id }
                ]
            })

            res.status(200).json({message: "Projects fetched successfully", projects });
            
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve projects' })
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            res.status(200).json({ message: "Project fetched successfully", project });

        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve project' });
        }
    }

} 

export default ProjectController