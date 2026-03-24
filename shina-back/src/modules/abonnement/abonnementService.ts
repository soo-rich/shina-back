import { createInput, updateAbonnementInput } from "./abonnementSchema";
import { PlanAbonnementEnum } from "@/database/enums/planAbonnementEnum";
import { AbonnementRepository } from "./abonnementRepository";


export class AbonnementService {

    private abonnementRepository: AbonnementRepository;

    constructor() {
        this.abonnementRepository = new AbonnementRepository();
    }

    
    async create(data: createInput) {
        // Vérifier si un abonnement avec ce label existe déjà
        if (data.label) {
            const existingAbonnement = await this.abonnementRepository.findById(data.label);
            if (existingAbonnement) {
                throw new Error('Un abonnement avec ce label existe déjà');
            }
        }

        // Créer l'abonnement
        const abonnement = await this.abonnementRepository.create({
            planAbonnement: data.planAbonnement as PlanAbonnementEnum,
            nombreMaxProprietes: data.nombreMaxPropriete as number,
            nombreMaxUnitLocation: data.nombreMaxUnitLocation as number,
            label: data.label || null,
            prix: data.prix,
            detail: data.detail,
             other: data.other as any,
        });

        return {
            id: abonnement.id,
            planAbonnement: abonnement.planAbonnement,
            nombreMaxPropriete: abonnement.nombreMaxProprietes,
            nombreMaxUnitLocation: abonnement.nombreMaxUnitLocation,
            label: abonnement.label,
            prix: abonnement.prix,
            detail: abonnement.detail,
            other: abonnement.other,
            createdAt: abonnement.createdAt,
            updatedAt: abonnement.updatedAt,
        };
    }

   
    async findById(id: string) {
        const abonnement = await this.abonnementRepository.findById(id);
        if (!abonnement) {
            return null;
        }
        return abonnement;
    }

    
    async findAllPaginated(page: number, limit: number) {
        return this.abonnementRepository.findAll();
    }

   async update(id: string, data: updateAbonnementInput) {
        // Vérifier si l'abonnement existe
        const existingAbonnement = await this.abonnementRepository.findById(id);
        if (!existingAbonnement) {
            throw new Error('Abonnement non trouvé');
        }

        // MAJ
         const updatedAbonnement = await this.abonnementRepository.update(id, data as any);
        return updatedAbonnement;
    }


  
    async delete(id: string) {
        const deleted = await this.abonnementRepository.delete(id);
        if (!deleted) {
            throw new Error('Abonnement non trouvé');
        }
        return { 
            success: true, 
            message: 'Abonnement supprimé avec succès' 
        };
    }
}
   