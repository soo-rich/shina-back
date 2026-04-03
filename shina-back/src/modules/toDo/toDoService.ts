import { createToDoInput, updateToDoInput } from "./toDoSchema";
import { ToDoRepository, ToDoFilters } from "./toDoRepository"; // Ajout de l'import ToDoFilters
import { ToDoResponse } from "./toDoType";

export class ToDoService {
    private toDoRepository: ToDoRepository;

    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async create(data: createToDoInput): Promise<ToDoResponse> {

        const toDo = await this.toDoRepository.create({
            titre: data.titre,
            description: data.description || '',
            completed: false, 
            completedAt: data.completedAt,

        });

        return toDo ; 
    }

    async findById(id: string) {
        const todo = await this.toDoRepository.findById(id);
        if (!todo) {
            return null;
        }
        return todo;
    }

    // Le Service délègue entièrement la gestion des filtres au Repository
    async findAllPaginated(page: number, limit: number, filters?: ToDoFilters) {
        return await this.toDoRepository.findAllPaginated(page, limit, filters);
    }

    async update(id: string, data: updateToDoInput) {
        const existingToDo = await this.toDoRepository.findById(id);
        if (!existingToDo) {
            throw new Error('Tâche non trouvée');
        }

        const updatedToDo = await this.toDoRepository.update(id, data as any);
        return updatedToDo;
    }

    async delete(id: string) {
        const deleted = await this.toDoRepository.delete(id);
        if (!deleted) {
            throw new Error('Tâche non trouvée');
        }
        return {
            success: true,
            message: 'Tâche supprimée avec succès'
        };
    }

    async completeTodo(id: string) {
        const todo = await this.toDoRepository.findById(id);
        if(!todo){
            return null;
        }
        
        return await this.toDoRepository.completeTodo(id);
    }
}