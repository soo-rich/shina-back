import { optional, z } from 'zod';

// Schéma de création
const createSchema = z.object({
    titre: z.string().min(1, "Le titre est obligatoire"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    completedAt: z.coerce.date().optional(),
})
// Schéma de lecture avec pagination et filtre optionnel
const getToDoSchema = z.object({
    limit: z.string().optional(),
    page: z.string().optional(),
    completed: z.boolean(),    //status: z.enum(['completed', 'incompleted']).optional(),
    titre: z.string().optional(),
    completedAtdate: z.coerce.date().optional(),//z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).optional(),
    
    //
});

// Schéma de mise à jour
const updateSchema = z.object({
    titre: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
   // completedAt: z.coerce.date().optional(),
});

// Schéma de l'ID
export const toDoIdSchema = z.object({
    id: z.string().uuid("Format d'ID de tâche invalide"),
});

// Types inférés
export type createToDoInput = z.infer<typeof createSchema>;
export type GetToDoInput = z.infer<typeof getToDoSchema>;
export type updateToDoInput = z.infer<typeof updateSchema>;
export type toDoIDparams = z.infer<typeof toDoIdSchema>;

export {
    createSchema,
    updateSchema,
    getToDoSchema
};