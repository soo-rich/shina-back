import { PlanAbonnementEnum } from "@/database/enums/planAbonnementEnum";
import { OpenAPIV3 } from "openapi-types";

const abonnementsTags: OpenAPIV3.TagObject = {
  name: "Abonnement",
  description: "Operations related to subscription management"
};

const abonnementsSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  AbonnementRequest: {
    type: "object",
    properties: {
      planAbonnement: {
        type: "string",
        enum: [...Object.values(PlanAbonnementEnum)],
        description: "Type de plan d'abonnement",
        example: "PREMIUM"
      },
      prix: {
        type: "number",
        format: "float",
        description: "Prix de l'abonnement",
        example: 29.99
      },
      detail: {
        type: "string",
        description: "Description détaillée de l'abonnement",
        example: "Accès à toutes les fonctionnalités premium"
      },
      nombreMaxProprietes: {
        type: "number",
        description: "Nombre max de propriétés",
        default: 1
      },
      nombreMaxUnitLocation: {
        type: "number",
        description: "Nombre max d'unités de location",
        default: 1
      },
      label: {
        type: "string",
        description: "Désignation de l'abonnement"
      },
      other: {
        type: "object",
        description: "Informations complémentaires",
        additionalProperties: true
      },
      duree: {
        type: "number",
        description: "Durée de l'abonnement (en jours)"
      }
    },
    required: [
      "planAbonnement",
      "prix",
      "detail",
      "nombreMaxProprietes",
      "nombreMaxUnitLocation",
      "label"
    ]
  }
};

const abonnementPath: OpenAPIV3.PathsObject = {
  "/abonnements": {
    get: {
      tags: ["Abonnement"],
      summary: "Get all subscriptions",
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
          description: "List of subscriptions",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/AbonnementRequest"
                }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ["Abonnement"],
      summary: "Create a new subscription",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AbonnementRequest"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Subscription created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AbonnementRequest"
              }
            }
          }
        }
      }
    }
  },

  "/abonnements/{id}": {
    get: {
      tags: ["Abonnement"],
      summary: "Get subscription by ID",
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
          description: "Subscription found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AbonnementRequest"
              }
            }
          }
        },
        "404": {
          description: "Subscription not found"
        }
      }
    },

    patch: {
      tags: ["Abonnement"],
      summary: "Update subscription",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AbonnementRequest"
            }
          }
        }
      },
      responses: {
        "200": {
          description: "Subscription updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AbonnementRequest"
              }
            }
          }
        }
      }
    },

    delete: {
      tags: ["Abonnement"],
      summary: "Delete subscription",
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
          description: "Subscription deleted"
        }
      }
    }
  }
};

export {
  abonnementsTags,
  abonnementsSchema,
  abonnementPath
};