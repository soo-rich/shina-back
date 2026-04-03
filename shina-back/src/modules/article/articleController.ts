
import { Request ,Response } from "express";
import { ArticleService } from "./articleService";
import { asyncHandler } from "../middleware/error.middleware";
import { NotFoundError } from "@/common/errors";

export class ArticleController { 
    private articleService: ArticleService

    constructor() {
        this.articleService = new ArticleService();
    }

     // Recupere les abonnements pagines

     findAllPaginated = asyncHandler(async (req: Request, res: Response ) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await this.articleService.findAllPaginated(page, limit);
        return res.json(result);
     }); 

     // Recupere un article par ID

     findById = asyncHandler(async (req: Request, res: Response) => {
        const { id} = req.params as { id: string};
        const article = await this.articleService.findById(id);

        if (!article) {
            throw new NotFoundError("Article", id)
        }

        return res.status(200).json(article);
     });

     // Creer un article
     create = asyncHandler(async (req: Request, res: Response) => {
        const created = await this.articleService.create(req.body);
        return res.status(201).json(created);    
     });

     // MAJ un article
   update = asyncHandler(async(req: Request, res: Response) => {
    try{
        const { id, } = req.params as { id: string };
       const data = req.body;
        const updated = await this.articleService.update(id, data);
        return res.json(updated);
    } catch (error: any) {
        const status = /non trouvé/i.test(error.message) ? 404 : 400;
    return res.status(status).json({message: error.message || 'Erreur lors de la mise a jour'})    }
   });


   //Supprimer abonnement
   delete = asyncHandler(async (req: Request, res: Response) => {
    const { id} = req.params as { id: string};
    const result = await this.articleService.delete(id);

    return res.json(result)
   });

};

