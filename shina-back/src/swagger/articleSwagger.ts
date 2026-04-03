//import { PlanAbonnementEnum } from "@/database/enums/planAbonnementEnum";
import {OpenAPIV3} from "openapi-types";

const articlesTags: OpenAPIV3.TagObject = {
    name: "Article",
    description: "Operations related to article management"
}

const articlesSchema: OpenAPIV3.ComponentsObject['schemas'] = {
    ArticleRequest: {  
        type: "object",
        properties: {
            
            titre: {
                type: "string",
                description: "Titre de l'article",

            },
            prix: {
                type: "number",
                format: "float",
                description: "Prix de l'article",
                example: 29.99
            },
            quantite: {
                type: "number",
                description: "Nombre d'articles",
                default: 1,
            },
        },
        required: ["titre", "prix", "quantite"] 
    }
};

const articlePath: OpenAPIV3.PathsObject = {
  "/articles": {
    get: {
      tags: ["Article"],
      summary: "Get all articles",
      description: "Retrieve a list of all articless in the system",
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "number" }
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "number" }
        }
      ],
      responses: {
        "200": {
          description: "List of articles",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ArticleRequest"
                }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ["Article"],
      summary: "Create an article",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ArticleRequest"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Article created"
        }
      }
    }
  },

  "/articles/{id}": {
    get: {
      tags: ["Article"],
      summary: "Get article by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        "200": {
          description: "Article found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Article"
              }
            }
          }
        }
      }
    }
  }
};

export {
    articlesTags,
    articlesSchema,
    articlePath
}