import { BaseTypes } from  "@/common/models/base.model";
import { PlanAbonnementEnum} from "@/database/enums/planAbonnementEnum";

export type AbonnementReponse = BaseTypes & {
    planAbonnemnet: PlanAbonnementEnum;
    nombreMaxPropriete: number;
    nombreMaxUnitionUnitLocation: number;
    label: string;
    prix: number;
    duree: number;
    details: string;
    other: string;

};

