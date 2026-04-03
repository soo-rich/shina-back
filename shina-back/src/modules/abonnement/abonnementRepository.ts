import { BaseRepositoryImpl } from "@/common/base.repository"
import { PlanAbonnementEnum } from "@/database/enums/planAbonnementEnum";
import { Abonnement, AbonnementAttributes, AbonnementCreationAttributes } from "@/database/models/Abonnement"


export class AbonnementRepository extends  BaseRepositoryImpl<Abonnement>
{
    constructor(){
    super(Abonnement)
    }

    async create(data: AbonnementCreationAttributes) {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<Abonnement> {
        return await this.model.findByPk(id);
    }

    async getAbonnementByPlan(planAbonnement : PlanAbonnementEnum, ) {
        console.log(planAbonnement)
        return this.model.findOne({
            where : {
                planAbonnement: planAbonnement
            }
        })
    }

    async findAllPaginated(page: number, limit: number): Promise<{
        data: Abonnement[];
        total: number
        page: number;
        limit: number;
        totalPages: number;

    }>  {
        const offset = (page - 1)* limit;

        const { count, rows } = await this.model.findAndCountAll({
            offset,
            limit,
            order: [[ 'createdAt', 'DESC']]
        });

        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        };
    }

    async update( id: string, data: Partial<AbonnementCreationAttributes>): Promise<Abonnement | null> {
        const abonnement = await this.findById(id);
        if (!abonnement) return null;

        return await abonnement.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const abonnement = await this.findById(id);
        if (!abonnement) return false;

        await abonnement.destroy();
        return true;
     }
}  