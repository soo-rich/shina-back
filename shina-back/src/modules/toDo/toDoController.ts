import { Request, Response } from "express";
import { ToDoService } from "./toDoService";
import { asyncHandler } from "../middleware/error.middleware";
import { NotFoundError } from "@/common/errors";

export class ToDoController {
    private toDoService: ToDoService;

    constructor() {
        this.toDoService = new ToDoService();
    }

    // Récupérer toutes les tâches paginées (avec filtre status optionnel)
    findAllPaginated = asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        //const filters = req.query.filters as string;

        const result = await this.toDoService.findAllPaginated(page, limit);
        return res.json(result);
    });

    // Récupérer une tâche par ID
    findById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const todo = await this.toDoService.findById(id);

        if (!todo) {
            throw new NotFoundError("ToDo", id);
        }

        return res.status(200).json(todo);
    });

    // Créer une tâche
    create = asyncHandler(async (req: Request, res: Response) => {
        const created = await this.toDoService.create(req.body);
        return res.status(201).json(created);
    });

    // MAJ une tâche
    update = asyncHandler(async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const payload = req.body;
            const updated = await this.toDoService.update(id, payload);
            return res.json(updated);
        } catch (error: any) {
            const status = /non trouvée/i.test(error.message) ? 404 : 400;
            return res.status(status).json({ message: error.message || 'Erreur lors de la mise à jour' });
        }
    });

    // Supprimer une tâche
    delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await this.toDoService.delete(id);
        return res.json(result);
    });

    complete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const completedTodo = await this.toDoService.completeTodo(id);

    if (!completedTodo) {
        return res.status(404).json({ 
            success: false, 
            message: "Tâche introuvable" 
        });
    }
    return res.status(200).json({
        success: true,
        message: "Tâche marquée comme terminée avec succès",
        data: completedTodo
    });
        
});

}