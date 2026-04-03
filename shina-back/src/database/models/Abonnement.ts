import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { PlanAbonnementEnum } from  "@/database/enums/planAbonnementEnum" ;
import { BaseModel } from "@/common/models/base.model";
//import { sequelize } from "../sequelize";


export interface AbonnementAttributes extends BaseModel {
    planAbonnement: PlanAbonnementEnum;
    nombreMaxProprietes: number;
    nombreMaxUnitLocation: number;
    duree:number,
    label: string;
    prix: number;
    detail: string;
    other: JSON;
}

export interface AbonnementCreationAttributes 
    extends Optional<AbonnementAttributes, "id" | "createdAt" | "updatedAt"> {}  


class Abonnement
extends Model<AbonnementAttributes, AbonnementCreationAttributes>
    implements AbonnementAttributes {
    
    declare id: string;
    declare planAbonnement: PlanAbonnementEnum;
    declare nombreMaxProprietes: number;
    declare nombreMaxUnitLocation: number;
    declare label: string;      
    declare prix: number;
    declare detail: string;
    declare duree: number;
    declare other: JSON;
    declare createdAt: Date;
    declare updatedAt: Date;
}


const initModelAbonnement = (sequelize: Sequelize) => {
    Abonnement.init(  
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            planAbonnement: {
                type: DataTypes.ENUM(...Object.values(PlanAbonnementEnum)),
                allowNull: false,
                defaultValue: PlanAbonnementEnum.BASIC,
            },

            nombreMaxProprietes:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },

            nombreMaxUnitLocation:{
                type:DataTypes.INTEGER,
                allowNull:false,
            },

            label: {
                type: DataTypes.STRING,
                allowNull: false,  
            },

            prix: {
                type: DataTypes.FLOAT,
                allowNull: false,   
            },

            detail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            duree: {
                type:DataTypes.INTEGER,
                allowNull: false,
            },

            other: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            
        },
        {
        sequelize,modelName: "Abonnement",
        tableName: 'abonnements',
        timestamps: true,
        underscored: true, 
        paranoid: true,
        }
    );
};


export { Abonnement, initModelAbonnement };
