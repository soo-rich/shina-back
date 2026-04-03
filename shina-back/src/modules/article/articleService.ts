
import { createInput, updateArticleInput } from "./articleSchema";
import { ArticleRepository } from "./articleRepository";
import { ArticleResponse } from "./articleType";
import { Article, ArticleCreationAttributes } from "@/database/models/article";


export class ArticleService {

    private articleRepository: ArticleRepository;

    constructor() {
        this.articleRepository = new ArticleRepository();
    }
    
  // Créer l'article
     async create (data: createInput): Promise<ArticleResponse>{
        const article = await this.articleRepository.create({
            titre: data.titre,
            prix: data.prix,
            quantite: data.quantite,
        });

        return article as ArticleResponse
    }


    async findById(id: string) {
        const article = await this.articleRepository.findById(id);
        if (!article) {
            return null;
        }
        return article;
    }


    async findAllPaginated(page: number, limit: number) {
        return this.articleRepository.findAll();
    }

    async update(id: string, data: updateArticleInput) {
        // Vérifier si l'article existe
        const existingArticle = await this.articleRepository.findById(id);
        if (!existingArticle) {
            throw new Error('Article non trouvé');
        }

        // MAJ
        const updateArticle = await this.articleRepository.update(id, data as any);
        return updateArticle;
    }


    async delete(id: string) {
        const deleted = await this.articleRepository.delete(id);
        if (!deleted) {
            throw new Error('Article non trouvé');
        }
        return {
            success: true,
            message: 'Article supprimé avec succès'
        };
    }
}
