import { Request ,Response } from "express";
import { AbonnementService } from "./abonnementService";
import { asyncHandler } from "../middleware/error.middleware";
import { NotFoundError } from "@/common/errors";

export class AbonnementController { 
    private abonnementService: AbonnementService

    constructor() {
        this.abonnementService = new AbonnementService();
    }

     // Recupere les abonnements pagines

     findAllPaginated = asyncHandler(async (req: Request, res: Response ) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await this.abonnementService.findAllPaginated(page, limit);
        return res.json(result);
     }); 

     // Recupere un abonnement par ID

     findById = asyncHandler(async (req: Request, res: Response) => {
        const { id} = req.params as { id: string};
        const abonnement = await this.abonnementService.findById(id);

        if (!abonnement) {
            throw new NotFoundError("Abonnement", id)
        }

        return res.status(200).json(abonnement);
     });


     // Creer un abonnement
     create = asyncHandler(async (req: Request, res: Response) => {
        const created =await this.abonnementService.create(req.body);
        return res.status(201).json(created);
     });


     // MAJ un abonnement
   update = asyncHandler(async(req: Request, res: Response) => {
    try{
        const { id } = req.params as { id: string };
        const payload = req.body;
        const updated = await this.abonnementService.update(id, payload);
        return res.json(updated);
    } catch (error: any) {
        const status = /non trouvé/i.test(error.message) ? 404 : 400;
    return res.status(status).json({message: error.message || 'Erreur lors de la mise a jour'})    }
   });


   //Supprimer abonnement
   delete = asyncHandler(async (req: Request, res: Response) => {
    const { id} = req.params as { id: string};
    const result = await this.abonnementService.delete(id);

    return res.json(result)
   });

};

