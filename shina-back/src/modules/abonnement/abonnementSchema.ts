import { z } from 'zod';
import { PlanAbonnementEnum } from '@/database/enums/planAbonnementEnum';


//Schema de creation
const createSchema = z.object({
    planAbonnement: z.enum(PlanAbonnementEnum),
    nombreMaxProprietes: z.number(),
    nombreMaxUnitLocation: z.number(),
    label: z.string().optional(),
    prix: z.number().positive(),
    detail: z.string(),
    duree: z.number(),
    other: z.record(z.string(), z.any()).optional(),

});

const getAbonnementSchema = z.object({
    limit: z.string('Format de la limite invalide'),
    page: z.string('Format de la valeur de la page invalide'),
});

//Schema de MAJ
const updateSchema = z.object({
    planAbonnement: z.enum(PlanAbonnementEnum),
    nombreMaxProprietes: z.number(),
    nombreMaxUnitLocation: z.number(),
    label: z.string().optional(),
    prix: z.number().positive().optional(),
    detail: z.string().optional(),
    other:z.record(z.string(), z.any()).optional(),
});

// Schema de l'ID
export const abonnementIdSchema = z.object({
    id: z.uuid("Format d'abonnement invalide"),
});


//Types inferes
export type createInput = z.infer<typeof createSchema>;
export type GetAbonnementInput = z.infer<typeof getAbonnementSchema>;
export type updateAbonnementInput = z.infer<typeof updateSchema>;
export type abonnementIDparams = z.infer<typeof abonnementIdSchema>


export {
    createSchema,
    updateSchema,
    getAbonnementSchema,

} ;
