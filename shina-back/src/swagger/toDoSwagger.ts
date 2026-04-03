import { OpenAPIV3 } from "openapi-types";

const toDoTags: OpenAPIV3.TagObject = {
  name: "ToDo",
  description: "Operations related to ToDo tasks management"
};

const toDoSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  ToDoRequest: {
    type: "object",
    properties: {
      titre: {
        type: "string",
        description: "Titre de la tâche",
        example: "Réparer la fuite d'eau"
      },
      description: {
        type: "string",
        description: "Description détaillée de la tâche",
        example: "Fuite dans l'appartement 4B"
      },
      completed: { 
        type: "boolean",
        description: "Statut de la tâche",
        default: false
      },
      completedAt: {
        type: "string",
        format: "date-time",
        description: "Date de complétion",
        example: "2026-04-01T10:00:00Z"
      }
    },
    required: ["titre"]
  }
};

const toDoPath: OpenAPIV3.PathsObject = {
  "/todos": {
    get: {
      tags: ["ToDo"],
      summary: "Get all ToDos",
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
          description: "List of todos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ToDoRequest"
                }
              }
            }
          }
        }
      }
    },

    post: {
      tags: ["ToDo"],
      summary: "Create a ToDo",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ToDoRequest"
            }
          }
        }
      },
      responses: {
        "201": {
          description: "ToDo created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ToDoRequest"
              }
            }
          }
        }
      }
    }
  },

  "/todos/{id}": {
    get: {
      tags: ["ToDo"],
      summary: "Get ToDo by ID",
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
          description: "ToDo found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ToDoRequest"
              }
            }
          }
        }
      }
    },

    patch: {
      tags: ["ToDo"],
      summary: "Update ToDo",
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
              $ref: "#/components/schemas/ToDoRequest"
            }
          }
        }
      },
      responses: {
        "200": {
          description: "ToDo updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ToDoRequest"
              }
            }
          }
        }
      }
    },

    delete: {
      tags: ["ToDo"],
      summary: "Delete ToDo",
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
          description: "ToDo deleted"
        }
      }
    }
  },

  "/todos/{id}/complete": {
    patch: {
      tags: ["ToDo"],
      summary: "Mark ToDo as completed",
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
          description: "ToDo marked as completed",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ToDoRequest"
              }
            }
          }
        }
      }
    }
  }
};

export {
  toDoTags,
  toDoSchema,
  toDoPath
};