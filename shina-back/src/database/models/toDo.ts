import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { BaseModel } from "@/common/models/base.model";

export interface ToDoAttributes extends BaseModel {
  titre: string;
  description?: string;
  completed: boolean; // true = completed, false = incompleted
  completedAt?: Date;
}

export  interface ToDoCreationAttributes
    extends Optional<ToDoAttributes, "id" | "createdAt" | "updatedAt"> {}

class ToDo 
extends Model<ToDoAttributes, ToDoCreationAttributes>
    implements ToDoAttributes {
        declare id: string;
        declare titre: string;
        declare description: string;
        declare completed: boolean;
        declare completedAt: Date;
        declare readonly createdAt?: Date;
        declare readonly updatedAt?: Date;
    }

    const InitModelToDo = (sequelize: Sequelize) => {
        ToDo.init(
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
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                completed: {
                    type: DataTypes.BOOLEAN,
                    //field: 'is_complete', 
                    defaultValue: false
                },
                completedAt: {
                    type: DataTypes.DATE,
                    allowNull: false

                }

            },
            {
                sequelize, modelName: "ToDo",
                tableName: 'toDo_List',
                timestamps: true,
                //underscored: true,
                paranoid: true,
            }

        );
    };

    export {ToDo, InitModelToDo};