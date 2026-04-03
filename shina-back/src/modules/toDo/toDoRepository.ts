import { BaseRepositoryImpl } from "@/common/base.repository";
import { ToDo, ToDoCreationAttributes } from "@/database/models/toDo";
import { Op, WhereOptions } from "sequelize";

export interface ToDoFilters {
    titre?: string; 
    date?: string;
}


export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export class ToDoRepository extends BaseRepositoryImpl<ToDo> {
    constructor() {
        super(ToDo);
    }

    async create(data: ToDoCreationAttributes): Promise<ToDo> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<ToDo | null> {
        return await this.model.findByPk(id);
    }

    async findAllPaginated(page: number, limit: number, filters?: ToDoFilters): Promise<PaginatedResult<ToDo>> {
        const offset = (page - 1) * limit;

        const whereClause: WhereOptions<ToDo> = {};

        if (filters?.titre) {
            whereClause.titre = { [Op.iLike]: `%${filters.titre}%` };
        }
        
        
        if (filters?.date) {
            const start = new Date(filters.date);
            start.setHours(0, 0, 0, 0);

            const end = new Date(filters.date);
            end.setHours(23, 59, 59, 999);

            whereClause.completedAt = {
                [Op.between]: [start, end], 
            };
        }

        const { count, rows } = await this.model.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        return {
            data: rows,
            meta: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    async update(id: string, data: Partial<ToDoCreationAttributes>): Promise<ToDo | null> {
        const todo = await this.findById(id);
        if (!todo) return null;

        return await todo.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const todo = await this.findById(id);
        if (!todo) return false;

        await todo.destroy();
        return true;
    }

    
    async completeTodo(id: string): Promise<ToDo | null> {
        return await this.update(id, {
            Completed: true,
            completedAt: new Date(),
        } as Partial<ToDoCreationAttributes>); 
    }
}

/*import { BaseRepositoryImpl } from "@/common/base.repository";
import { ToDo, ToDoCreationAttributes } from "@/database/models/toDo";

export interface ToDoFilters {
    titre?: String,
    date?: string,

}
        /*
        export interface paginatedResult<T> {
            data: T[],
            meta: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };

        }
        */

        /*
export class ToDoRepository extends BaseRepositoryImpl<ToDo> {
    constructor() {
        super(ToDo);
    }

    async create(data: ToDoCreationAttributes) {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<ToDo | null> {
        return await this.model.findByPk(id);
    }

    async findAllPaginated(page: number, limit: number, filters: ToDoFilters): Promise<{
        data: ToDo[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const offset = (page - 1) * limit;
        
        
        const whereClause = filters !== undefined ? { Completed: filters } : {};

            if (filters.titre) {
                where.titre= { [0p.iLike]: `%${filters.titre}%` }};

        const { count, rows } = await this.model.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        };
    }

    async update(id: string, data: Partial<ToDoCreationAttributes>): Promise<ToDo | null> {
        const todo = await this.findById(id);
        if (!todo) return null;

        return await todo.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const todo = await this.findById(id);
        if (!todo) return false;

        await todo.destroy();
        return true;
    }

    async completeTodo(id: string,data: ToDo){
        return await this.update(id,{
            ...data,
            Completed: true,
            completedAt: new Date(),

        });
    }
   //async gettoDoById(id: string): 
}

*/