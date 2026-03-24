import { BaseRepositoryImpl } from "@/common/base.repository"
import { abonnements, AbonnementAttributes, AbonnementCreationAttributes } from "@/database/models/Abonnement"

export class AbonnementRepository extends  BaseRepositoryImpl<abonnements>
{
    constructor(){
    super(abonnements)
    }

    async create(data: AbonnementCreationAttributes): Promise<abonnements> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<abonnements> {
        return await this.model.findByPk(id);
    }

    async findAllPaginated(page: number, limit: number): Promise<{
        data: abonnements[];
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

    async update( id: string, data: Partial<AbonnementCreationAttributes>): Promise<abonnements | null> {
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