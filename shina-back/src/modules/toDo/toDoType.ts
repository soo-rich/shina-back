import { BaseTypes } from  "@/common/models/base.model";

export interface ToDoResponse extends BaseTypes {
    titre: string;
    description?: string;
    completed: boolean;
    completedAt: Date;
}

