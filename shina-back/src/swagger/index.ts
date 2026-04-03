import env from "@config/env";
import { OpenAPIV3 } from "openapi-types";
import { abonnementPath, abonnementsSchema, abonnementsTags } from "@/swagger/abonnementSwagger";
import { articlePath, articlesSchema, articlesTags } from "./articleSwagger";
import { toDoSchema,toDoTags,toDoPath  } from "./toDoSwagger";


export const tags: OpenAPIV3.TagObject[] = [
  { name: "Health", description: "API health check" },
  abonnementsTags,
  articlesTags,
  toDoTags,
];

export const paths: OpenAPIV3.PathsObject = {
  // Health endpoint
  "/health": {
    get: {
      tags: ["Health"],
      summary: "Health check",
      description: "Check if the API is running and healthy",
      security: [],
      responses: {
        "200": {
          description: "API is healthy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "API is healthy" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      },
    },
  },
  // Module paths
  ...abonnementPath,
  ...articlePath,
  ...toDoPath,
};

export const schemas: OpenAPIV3.ComponentsObject["schemas"] = {
 ...abonnementsSchema,
 ...articlesSchema,
 ...toDoSchema,
};

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Rental Management API",
    version: "1.0.0",
    contact: {
      name: "TAD IT Consulting",
      email: "support@tad-it.consulting",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}${env.API_PREFIX}`,
      description: "Development server",
    },
  ],
  tags,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas,
    // responses,
  },
  security: [],
  paths,
};

export default swaggerSpec;
