import { createInput, updateAbonnementInput } from "./abonnementSchema";
import { PlanAbonnementEnum } from "@/database/enums/planAbonnementEnum";
import { AbonnementRepository } from "./abonnementRepository";
import { AbonnementReponse } from "./abonnementType";
import { DuplicateEntryError } from "@/common/errors";
import { Abonnement } from "@/database/models/Abonnement";


export class AbonnementService {

    private abonnementRepository: AbonnementRepository;

    constructor() {
        this.abonnementRepository = new AbonnementRepository();
    }


    async create(data: createInput): Promise<AbonnementReponse> {
        console.log("sjaflkjfkl", data)
        // Vérifier si un abonnement avec ce planAbonnement  existe déjà
        // Créer l'abonnement
        let abonnement: Abonnement

        if ([PlanAbonnementEnum.BASIC, PlanAbonnementEnum.ENTREPRISE, PlanAbonnementEnum.PRO].includes(data.planAbonnement)) {

            const existingAbonnement = await this.abonnementRepository.getAbonnementByPlan(data.planAbonnement)

            if (existingAbonnement) {
                throw new DuplicateEntryError("This plan already exists")
            } else {
                abonnement = await this.abonnementRepository.create({
                    planAbonnement: data.planAbonnement as PlanAbonnementEnum,
                    nombreMaxProprietes: data.nombreMaxProprietes as number,
                    nombreMaxUnitLocation: data.nombreMaxUnitLocation as number,
                    label: data.label,
                    prix: data.prix,
                    detail: data.detail,
                    duree: data.duree,
                    other: data.other as any,
                });
            }

        } else {
            abonnement = await this.abonnementRepository.create({
                planAbonnement: data.planAbonnement as PlanAbonnementEnum,
                nombreMaxProprietes: data.nombreMaxProprietes as number,
                nombreMaxUnitLocation: data.nombreMaxUnitLocation as number,
                label: data.label,
                prix: data.prix,
                detail: data.detail,
                duree: data.duree,
                other: data.other as any,
            });
        }

        return {
            id: abonnement.id,
            planAbonnement: abonnement.planAbonnement,
            nombreMaxProprietes: abonnement.nombreMaxProprietes,
            nombreMaxUnitLocation: abonnement.nombreMaxUnitLocation,
            label: abonnement.label,
            prix: abonnement.prix,
            detail: abonnement.detail,
            other: abonnement.other,
            duree: abonnement.duree,
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
