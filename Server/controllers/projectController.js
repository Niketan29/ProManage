import Project from "../models/project.js";


export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.user.id,
        });


        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id });
        res.json(projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project)
        return res.status(404).json({ message: "Project not found" });

    if (project.createdBy.toString() !== req.user.id)
        return res.status(403).json({ message: "Not allowed" });

    await project.deleteOne();
    return res.json({ message: "Project deleted" });
};
