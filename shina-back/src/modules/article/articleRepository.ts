import { BaseRepositoryImpl } from "@/common/base.repository"
import { Article, ArticleAttributes, ArticleCreationAttributes } from "@/database/models/article"


export class ArticleRepository extends  BaseRepositoryImpl<Article>
{
    constructor(){
    super(Article)
    }

    async create(data: ArticleCreationAttributes) {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<Article> {
        return await this.model.findByPk(id);
    }

    async findAllPaginated(page: number, limit: number): Promise<{
        data: Article[];
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

    async update( id: string, data: Partial<ArticleCreationAttributes>): Promise<Article | null> {
        const article = await this.findById(id);
        if (!article) return null;

        return await article.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const article = await this.findById(id);
        if (!article) return false;

        await article.destroy();
        return true;
     }
}  