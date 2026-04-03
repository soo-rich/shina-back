import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { BaseModel } from "@/common/models/base.model";

export interface  ArticleAttributes extends BaseModel {
    titre: string;
    quantite: number;
    prix: number;
}

export  interface ArticleCreationAttributes
    extends Optional<ArticleAttributes, "id" | "createdAt" | "updatedAt"> {}

class Article
extends Model<ArticleAttributes, ArticleCreationAttributes>
    implements ArticleAttributes {
        declare id: string;
        declare titre: string;
        declare quantite: number;
        declare prix: number;
        declare readonly  createdAt?: Date;
        declare readonly updatedAt?: Date;
    }

    const InitModelArticle = (sequelize: Sequelize) => {
        Article.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                titre: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                quantite: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                prix: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize, modelName: "Article",
                tableName: 'articles',
                timestamps: true,
                underscored: true,
                paranoid: true,
            }
        );
    };

    export { Article, InitModelArticle};