import { z } from 'zod';

//Schema de creation
const createSchema = z.object({
    titre: z.string(),
    prix: z.number(),
    quantite: z.number(),
});

const getArticleSchema = z.object({
    limit: z.string('Format de la limite invalide'),
    page: z.string('Format de la valeur de la page invalide'),
});

//Schema de MAJ
const updateSchema = z.object({
    titre: z.string(),
    prix: z.number(),
    quantite: z.number(),
});

// Schema de l'ID
export const articleIdSchema = z.object({
    id: z.uuid("Format d'article invalide"),
});


//Types inferes
export type createInput = z.infer<typeof createSchema>;
export type GetArticleInput = z.infer<typeof getArticleSchema>;
export type updateArticleInput = z.infer<typeof updateSchema>;
export type articleIDparams = z.infer<typeof articleIdSchema>


export {
    createSchema,
    updateSchema,
    getArticleSchema,

} ;
